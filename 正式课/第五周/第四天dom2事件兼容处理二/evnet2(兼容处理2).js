function bind(ele,eventType,fn){
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn,false);
        return;
    }
    var tempFn = function (){
        fn.call(ele);
    }
    tempFn.origin = fn;
    if(!ele['mybind'+ eventType]){ //模拟事件池
        ele['mybind'+eventType] = [];
    }
    var a = ele['mybind'+eventType]; //[tempFn(fn1),tempFn(fn2)...] fn2
    for(var i=0; i< a.length; i++){ //这个循环是为了处理重复绑定，对于已经在事件池中出现过的我们就不要在绑定了。但是我们只能去遍历我们自己模拟的这个自定义属性数组(模拟的事件池)
        if(a[i].origin === fn){ //说明曾经绑定过
            return; //如果曾经绑定过，1不需要更新数组 2更不需要添加到事件池中
        }
    }
    a.push(tempFn);
    ele.attachEvent('on'+eventType,tempFn); //
}
function unBind(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn,false);
        return;
    }
    // for ie6-8
    var a = ele['mybind'+eventType];
    for(var i=0; i< a.length; i++){ // [tempFn(fn1),tempFn(fn2)...] fn2
        var tempFn = a[i];
        if(tempFn.origin === fn){
            ele.detachEvent('on'+eventType,tempFn);
            a.splice(i,1);
            break;
            //[tempFn(fn1),tempFn(fn2)....tempFn(fn1)]
        }
    }
}
// 顺序问题
/*
oDiv  fn1
oDiv  fn2
oDiv  fn3
oDiv  run //
oDiv.myeventclick = [fn1,fn2,fn3];
oDiv.mybindmouseover = [fn1,fn2,fn3]
*/
function on(ele,eventType,fn){ //解决顺序问题的
    //这个on方法只负责把绑定的函数添加到ele的自定义属性数组中
    //把不同的事件类型绑定的函数放到不同的数组中
    if(!ele['myevent'+eventType]){
        ele['myevent'+eventType] = [];
    }
    var a = ele['myevent'+eventType];
    for(var i=0; i< a.length; i++){ //不能重复绑定
        if(a[i] === fn){
            return;
        }
    }
    a.push(fn);
    bind(ele,eventType,run); //要把run方法绑定（真正事件发生的时候要执行的）。
}

function off(ele,eventType,fn){

    var a = ele['myevent'+eventType];
    //遍历数组，只要数组中存在一个fn函数那么我就把这个函数从数组中移除
    for(var i=0; i< a.length; i++){
        if(a[i] === fn){ //只要有一个重复直接删除掉然后直接跳出循环就可以了，因为在on的时候已经处理重复绑定。
            //a.splice(i,1);
            //[fn1,fn2,fn3,fn1]
            //break;
            a[i] = null; //保证如果在函数被触发(run执行)的过程中，调用了off方法就会有保存着所有函数的数组的塌陷问题。但是现在数组中出现了null，只在在下次循环执行这里的方法的时候判断下是不是函数，如果是函数才执行。
        }
    }
}

function run(e){ //负责按照顺序执行自定义属性数组中的方法,真正绑定给事件的函数是run。 所以只有run才存在事件对象e
    //比如说click事件发生的时候，这个run方法总要找到click对应的那个自定义属性click的数组才行吧。
    //ele['myevent'+eventType] // ele  eventType

    e = e || window.event;
    //e.target = e.target || e.srcElement;
    //e.type; // 'click'
    //这里的this就是绑定的那个元素ele
    var isLowIE = !e.target; //也可以判断当前浏览器是否是ie678
    if(isLowIE){
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft||document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop||document.body.scrollTop) + e.clientY;
        e.preventDefault = function (){
            e.returnValue = false;
        }
        e.stopPropagation = function (){
            e.cancelBubble = true;
        }
    }
    var a = /*e.target*/this['myevent'+ e.type];
    for(var i=0; i< a.length; i++){
        var fn = a[i];
        //由于a数组中可能因为off方法填进去了null，所以要判断当前的每一项是不是函数。如果是函数才执行呢
        if(typeof fn == 'function'){
            fn.call(this/*e.target*/,e); //这个e是从run方法中获取到的，并且应该还给数组中的每一个fn
        }else{ //说明你当前不是一个函数是一个null
            a.splice(i,1);  //就可以把这个null删除掉了。这个else不写没有问题。就是数组中多了些null。但是我们做过判断所以没有问题
            i--; //由于形成了数组塌陷所以i--
        }
        //[fn1,fn2,null,fn4,fn5,null]
    }
}
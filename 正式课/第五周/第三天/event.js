
/**
 *
 * @param ele 给哪个元素绑定事件
 * @param eventType 事件类型  => click  mouseover   ....
 * @param fn 绑定的函数
 */
function bind(ele,eventType,fn){ //处理dom2事件绑定的兼容

    if(ele.addEventListener){ //可能是一个函数/undefined
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //从这里向下的代码是给ie6-8  forIE6-8
    var tempFn = function (){
        fn.call(ele);
    };
    tempFn.origin = fn; //在这个临时的函数身上添加一个自定义属性用来记录它原来是用哪个函数
    //这个if只有在第一次执行一遍，下一次在ele身上就已经有这个自定属性了。如果有这个属性那么就跳过，如果没有就创建一个
    if(!ele['mybind'+eventType]){// 'mybindclick'  ele["mybindmouseover"] ele.mybindmouseover
        //mybind这个就是用来区分原生的属性的。自定义属性是用来存放经过伪装之后的这些tempFn的。为了区分不同事件之间使用不同的数组，所以在mybind的后面加一个eventType用来区分事件类型的
        //如果ele.mybindclick如果不存在那么就创建一个数组
        ele['mybind'+eventType] = [];
    }
    var  a = ele['mybind'+eventType]; //操作简便
    a.push(tempFn); //把已经添加过origin这个自定义属性的函数，添加对对应事件类型的ele的自定义属性那个数组中去 ==> 这个数组就为了移除事件的时候能找到自己原来是谁。
    ele.attachEvent('on'+eventType,tempFn); //fn中的this不是ele是window
}
       //unBind(oDiv,'click',fn2);
function unBind(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn,false);
        return;
    }
    // for ie6-8
    var a = ele['mybind'+eventType]; //通过事件类型去拿对应自定义属性的数组
    for(var i=0; i< a.length; i++){
        //在一堆tempFn中挑哪一个的origin属性是传进来这个参数fn那么我就使用detachEvent方法对移除对应的tempFn
        var tempFn = a[i];
        if(tempFn.origin == fn){
            ele.detachEvent('on'+eventType,tempFn);//绑定的时候叫做tempFn
        }
    }
}


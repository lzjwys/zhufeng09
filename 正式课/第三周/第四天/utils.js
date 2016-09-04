var utils = {
    listToArray : function (likeAry){
        try{
           return Array.prototype.slice.call(likeAry,0);
        }catch(e){
            var ary = [];
            for(var i=0; i<likeAry.length; i++){
                ary[ary.length] = likeAry[i];
            }
            return ary;
        }
    },
    jsonParse : function (jsonStr){
        return "JSON" in window ? JSON.parse(jsonStr)  : eval("("+jsonStr+")");
    },
    getRandom : function (n,m){
        n = Number(n);
        m = Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n > m){
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random()*(m-n)+n);
    },
    offset : function (ele){
        var l = null,
            t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        par = ele.offsetParent;
        while(par){
            if(!/MSIE 8/.test(window.navigator.userAgent)){
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left : l , top : t};
    },
    win : function (attr,val){
        if(typeof val !=='undefined'){
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr]||document.body[attr];
    },
    getCss : function (ele,attr){
        var val = null;
        if(window.getComputedStyle){
            val = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr == 'opacity'){
                val = ele.currentStyle.filter; //alpha(opacity=50.55)
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
                val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
            }else{
                val = ele.currentStyle[attr];
            }

        }
        // 18px -18px -5.5px "0.5"
        var reg = /-?\d+(\.\d+)?(px|em|rem|pt|deg)?/;
        if(reg.test(val)){
            val = parseFloat(val);
        }
        return val;
    },
    setCss : function (ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = 'alpha(opacity='+val*100+')';
            return;
        }
        if(attr == 'float'){
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /(width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?)/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    },
    //{}
    setGroupCss : function (ele,options){ //options保证是一个对象才可以
        options = options || [];
        if(options.toString() == '[object Object]'){
            //我就能保证options是一个对象{}
            for(var key in options){ // background : 'green'
                if(options.hasOwnProperty(key)){
                    this.setCss(ele,key,options[key]);
                }
            }
        }
    },
    ///////////////////////////////////
    prev : function (ele){ //获取元素上一个元素哥哥节点
        var pre = ele.previousSibling;
        while(pre && pre.nodeType != 1){
            pre = pre.previousSibling;
        }
        return pre;
    },
    prevAll : function (ele){ //获取所有的元素哥哥节点
        var ary = [];
        var prev = this.prev(ele); //先获取上一个元素哥哥节点
        while(prev){
            ary.unshift(prev);
            prev = this.prev(prev);
        }
        return ary;
    },
    next : function (ele){ //获取下一个元素弟弟节点
        var next = ele.nextSibling;
        while(next && next.nodeType != 1){
            next = next.nextSibling;
        }
        return next;
    },
    nextAll : function (ele){ //获取所有的元素弟弟节点
        var ary = [];
        var next = this.next(ele);
        while(next){
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    },
    children : function (ele,tagName){

        var ary = [];
        var nodes = ele.childNodes; //获取所有的子节点
        for(var i=0; i<nodes.length; i++){ //在所有的子节点内挑出节点类型是1的
            var curNode = nodes[i];
            if(curNode.nodeType == 1){
                ary.push(curNode);
            }
        }
        if(typeof tagName == "string"){ //tagName传值了，并且是一个字符串
            for(var i=0; i<ary.length; i++){
                var curEle = ary[i];  //都是一个元素
                if(curEle.nodeName.toLowerCase() !== tagName.toLowerCase() ){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
        return ary;
    },
    sibling : function (ele){ //获取相邻的两个兄弟元素节点
        var ary = [];
        var pre = this.prev(ele); // null
        var nex = this.next(ele); // null
        pre ? ary.push(pre) : void 0;
        nex ? ary.push(nex) : void 0;
        return ary;
    },
    siblings : function (ele){ //获取所有的哥哥和弟弟元素节点
        return this.prevAll(ele).concat(this.nextAll(ele));
    },
    index : function (ele){ //索引值和所有元素哥哥集合的length相等
        return this.prevAll(ele).length;
    },
    firstEleChild : function (ele){ //获取第一个元素子节点
        // 如果获取children的集合.length大于0说明至少有一个孩子
        var chs = this.children(ele);
        return  chs.length > 0 ? chs[0] : null;
    },
    lastEleChild : function (){
        var chs = this.children(ele);
        return  chs.length > 0 ? chs[chs.length-1] : null;
    },
    /////////////////appendChild insertBefore
    append : function (newEle,container){ //向容器的末尾添加
        container.appendChild(newEle);
    },
    prepend : function (newEle,container){ //向容器的开头添加
        var firstChild = this.firstEleChild(container); //
        //如果第一个元素孩子存在那么就直接插入到它前面，如果不存在说明一个孩子都么有。那么直接appendChild到最后就可以了
        firstChild ? container.insertBefore(newEle,firstChild) : container.appendChild(newEle);
    },
    insertBefore : function(newEle,oldEle){ //我要把这个newEle插入到这个oldEle前面
        oldEle.parentNode.insertBefore(newEle,oldEle); //父级调用
    },
    insertAfter : function (newEle,oldEle){
        var nex = this.next(oldEle);
        // 如果弟弟存在就直接插入到弟弟前面，不存在说明我就是最后一个，那么直接父级.appendChild就可以
        nex ? oldEle.parentNode.insertBefore(newEle,nex) : oldEle.parentNode.appendChild(newEle);
    },
    ///////////////////////////////////////////////////////////////
    hasClass : function (ele,strClass){ //判断ele是否含有strClass
        // 先去掉strClass的首尾空格
        strClass = strClass.replace(/(^ +| +$)/g,""); //
        //class="c1 c2 c1 c1"  "c1"
        //利用传值进来的这个字符串组合成一个新的正则来验证ele.className是否符合刚刚这个正则。
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(ele.className);
    },
    addClass : function (ele,strClass){
        //debugger;
        strClass = strClass.replace(/(^ +| +$)/g,"");
        var strClassAry = strClass.split(/ +/); //['c2','c3']
        //添加c2和c3这两个类
        for(var i=0; i<strClassAry.length; i++){
            var curClass = strClassAry[i];
            if(!this.hasClass(ele,curClass)){ //如果不包含这个类才添加
                ele.className += " " + curClass;
            }
        }
    },
    removeClass:function (ele,strClass){ //在ele的className中移除这个strClass
        // utils.removeClass(ul,"c2 c3")
        var strClassAry = strClass.replace(/(^ +| +$)/g,"").split(/ +/);
        // ['c2','c3']
        for(var i=0; i<strClassAry.length; i++){ //循环移除
            var curClass = strClassAry[i]; // 'c2' 'c3'
            if(this.hasClass(ele,curClass)){
                var reg = new RegExp('(^| +)'+ curClass +'( +|$)',"g"); //把所有能用c2和c3拼接成的正则能在className中能匹配到的全部用' '空格字符串替换
                ele.className = ele.className.replace(reg," ");
            }
        }
    },
    getElesByClass : function (strClass,context){ //通过类名获取元素
        context = context || document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(strClass);
        }
        var strClassAry = strClass.replace(/(^  +| +$)/g,"").split(/ +/);
        var tags = context.getElementsByTagName('*');
        var ary = [];
        for(var i=0; i<tag.length; i++){
            var flag = true;
            var curTag = tags[i];
            for(var j=0; j<strClassAry.length; j++){
                var curClass = strClassAry[j];
                var reg = new RegExp("(^| +)"+curClass+"( +|$)");
                if(!reg.test(curTag.className)){
                    flag = false;
                    break;
                }
            }
            if(flag){
                ary.push(curTag);
            }
        }
        return ary;
    }
};

//utils.prevAll()
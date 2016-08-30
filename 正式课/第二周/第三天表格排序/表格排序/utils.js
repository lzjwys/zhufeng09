var utils = {
    listToArray : function (likeArray){ //把类数组转化成数组
        try{
            return Array.prototype.slice.call(likeArray,0);
            //return [].slice.call(likeArray,0);
        }catch (e){
            var ary = [];
            for(var i=0; i<likeArray.length; i++){
                ary[ary.length] = likeArray[i];
            }
            return ary;
        }
    },
    getRandom : function(n,m){ // 获取n-m之间的随机整数
        n = Number(n);
        m = Number(m);
        if(isNaN(n) || isNaN(m)){
            return Math.random();
        }
        if(n > m){
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random()*(m-n)+n);
    },
    hasPubProperty : function (obj,prop){ //是否是公有属性
        return prop in obj && !(obj.hasOwnProperty(prop));
    },
    prev : function (ele){ //获取上一个元素哥哥节点
        var pre = ele.previousSibling;
        while(pre && pre.nodeType != 1){
            pre = pre.previousSibling;
        }
        return pre;
    },
    jsonParse : function (jsonStr){
        return "JSON" in window ? JSON.parse(jsonStr) : eval("("+ jsonStr +")");
    }
};


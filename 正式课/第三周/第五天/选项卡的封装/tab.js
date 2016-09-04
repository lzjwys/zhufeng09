(function (){
    function tab(container,defaultIndex){
        //var box1 = document.getElementById('tabBox3');
        // defalutIndex : 0  1  2
        var ul = utils.children(container,'ul')[0];
        var lis = utils.children(ul);
        var divs = utils.children(container,'div');
        defaultIndex = defaultIndex || 0; //如果传了就默认使用传的值，如果没有默认选中第一个
        utils.addClass(lis[defaultIndex],'selected'); //默认选中的样式
        utils.addClass(divs[defaultIndex],'selected');
        for(var i=0; i<lis.length; i++){
            lis[i].onmouseover = function (){
                //头部
                var siblings = utils.siblings(this);
                for(var i=0; i<siblings.length; i++){
                    utils.removeClass(siblings[i],'selected');
                }
                utils.addClass(this,'selected');
                //对应内容
                var index = utils.index(this); //当前滑过那个li的索引
                //var divs = utils.nextAll(this.parentNode);
                for(var i=0; i<divs.length; i++ ){
                    i === index ? utils.addClass(divs[i],'selected') : utils.removeClass(divs[i],'selected');
                }
            }
        }
    }
    window.zftab = tab; //给window添加一个叫做tab的属性，也相当于个一个全局变量
})();




//获取要操作的元素
var ul = document.getElementsByClassName('newList')[0];
var imgs = ul.getElementsByTagName('img');
//var imgs = document.querySelectorAll('.newList img');
//获取数据
;
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);
//绑定数据
;
(function bindData() {
    if (window.data) {
        var str = "";
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            //根据数据类型的不同可以渲染不同的模板
            str += '<li>';
            str += '<div><img src="" realSrc="' + curData.src + '"/></div>';
            str += '<div><h2>' + curData.title + '</h2><p>' + curData.desc + '</p></div>';
            str += '</li>';
        }
        ul.innerHTML = str;
    }
})();

window.onscroll = allImgsDelayLoad;
window.setTimeout(allImgsDelayLoad,500); //
//多张延迟加载
function allImgsDelayLoad() {
    for (var i = 0; i < imgs.length; i++) {
        var curImg = imgs[i];
        var a = utils.win('scrollTop') + utils.win('clientHeight');
        var b = curImg.parentNode.offsetHeight + utils.offset(curImg.parentNode).top;
        if (curImg.loaded) { continue; }
        if(a>b){ //只要符合这个条件的就是已经进入到浏览器内的
            var tempImg = new Image();
            tempImg.index = i; //由于事件是绑定给这个tempImg的，那么自定义属性index是配合事件发生的时候中的this使用的。自定义属性一般都是加给绑定事件的那个主体
            tempImg.src = imgs[i].getAttribute('realSrc');
            tempImg.onload = function () {
                imgs[this.index].src = this.src;
                imgs[this.index].style.display = 'block';
                fadeIn(imgs[this.index]);
            }
            imgs[i].loaded = true;
        }
        //判断每一张图片是否已经完全进入到可视窗口内，如果符合条件才进行图片延迟加载
    }
}
function fadeIn(img){ //淡入  img是哪一张图片需要淡入
     img.timer = window.setInterval(function (){
        var opacityVal = utils.getCss(img,'opacity');
        if(opacityVal>=1){
            window.clearInterval(img.timer);
        }
        opacityVal += 0.01;
        utils.setCss(img,'opacity',opacityVal);
    },10);
}

//
/*
var str1 = '<div><img src="" realSrc="{0}"/></div>';
var str2 = '<div><img src="" realSrc="{0}"/><img src="" realSrc="{1}"/></div>';
var reg = /{(\d)}/g;
str2.replace(reg,function (){
    //[{0},0,index,input]
    //[{1},1,index,input]
    return ary[arguments[1]];
});
var ary = ['images/1.jpg','images/2.jpg'];
*/

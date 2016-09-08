var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner',banner)[0];
var focusList = utils.getElesByClass('focusList',banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left',banner)[0];
var rightBtn = utils.getElesByClass('right',banner)[0];
//
;(function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
//
;(function bindData(){
    if(window.data){
        var str = "";
        var strLi = '';
        for(var i=0; i<data.length; i++){
            var curData = data[i];
            str += '<div><img src="" realSrc="'+curData.src +'"/></div>';
            strLi += i === 0 ? '<li class="selected"></li>' : '<li></li>';
        }
        bannerInner.innerHTML = str;
        focusList.innerHTML = strLi;
    }
})();
// 图片延迟加载
window.setTimeout(imgsDelayLoad,400);
function imgsDelayLoad(){
    for(var i=0; i<imgs.length; i++){
        if(i == 0 ){ //默认让第一张图片去显示,让包含着第一张图片的div的样式的默认的zIndex的值从0设置成1；还要把透明度从0动画到1
            utils.css(imgs[i].parentNode,'zIndex',1);
            // marginLeft  zIndex
            animate(imgs[i].parentNode,{opacity: 1}, 300);
        }
        (function (i){
            var curImg = imgs[i];
            var tempImg = new Image();
            tempImg.src = curImg.getAttribute('realSrc');
            tempImg.onload = function (){
                curImg.src = this.src;
                utils.css(curImg,'display','block');

            }
            tempImg = null;
        })(i);
    }
}
//自动轮播
var step = 0;
var timer = window.setInterval(autoMove,2000);
function autoMove(){
    if(step == data.length-1){
        step = -1;
    }
    step++;
    setBannerImg();
}
function setBannerImg(){ //真正做图片更换的核心函数
    for(var i=0; i<imgs.length; i++){
        //让所有图片中索引值和step相等那一张上升到最高层级1，其他的都层级都设置为0
        if(i == step){
            utils.css(imgs[i].parentNode,'zIndex',1); //立刻设置zIndex为1
            //立刻把刚刚层级上升的这张图片的透明度从0动画到1
            animate(imgs[i].parentNode,{opacity : 1},300,function (){
                var siblings =  utils.siblings(this); //把除了刚刚显示这张图片的父级div的所有兄弟节点全部把透明度设置成0,为了保证下一次的渐显效果
                for(var i=0; i<siblings.length; i++ ){
                    utils.css(siblings[i],'opacity',0);
                }
            });
        }else{
            utils.css(imgs[i].parentNode,'zIndex',0);
        }
    }
    for(var i=0; i<lis.length; i++){ //焦点对齐
        lis[i].className = step == i ? 'selected' : '';
    }
}
//
banner.onmouseover = function (){
    window.clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display = 'block';
}
banner.onmouseout = function (){
    timer = window.setInterval(autoMove,2000);
    leftBtn.style.display = rightBtn.style.display = 'none';
}
leftBtn.onclick = function (){
    step--;
    if(step == -1 ){
        step = data.length-1;
    }
    setBannerImg();
}
rightBtn.onclick = autoMove;
;(function bindEvent(){
    for(var i=0; i<lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            step = this.index;
            setBannerImg();
        }
    }
})();




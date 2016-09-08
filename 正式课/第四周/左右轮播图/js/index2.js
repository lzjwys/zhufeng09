var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner', banner)[0];
var focusList = utils.getElesByClass('focusList', banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left', banner)[0];
var rightBtn = utils.getElesByClass('right', banner)[0];
//获取数据
;
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send();
})();
console.log(data);

//绑定数据
;
(function () {
    if (window.data) {
        var str = "";
        var strLis = "";
        for (var i = 0; i < data.length; i++) {
            var curData = data[i]; //当前的这一条数据
            str += '<div><img src="" realSrc="' + curData.src + '"/></div>';
            strLis += i === 0 ? '<li class="selected"></li>' : '<li></li>';
        }
        str += '<div><img src="" realSrc="' + data[0].src + '"/></div>';
        utils.css(bannerInner, 'width', 1000 * (data.length + 1));
        bannerInner.innerHTML = str;
        focusList.innerHTML = strLis;
    }
})();
//图片延迟加载
function imgsDelayLoad() {
    for (var i = 0; i < imgs.length; i++) {
        (function (i) {
            var tempImg = new Image();
            tempImg.src = imgs[i].getAttribute('realSrc');
            tempImg.onload = function () {
                imgs[i].src = this.src;
                utils.css(imgs[i], 'display', 'block');
                animate(imgs[i], {opacity: 1}, 200);
            }
        })(i);
    }
}
window.setTimeout(imgsDelayLoad, 300);
//自动轮播
var step = 0;
var timer = window.setInterval(autoMove, 2500);
function autoMove() {
    if (step == data.length) {
        step = 0;
        utils.css(bannerInner, 'left', -1000 * step);
    }
    step++;
    animate(bannerInner, {left: -1000 * step}, 500);
    focusAlign();
}
//
function focusAlign() {
    var tempStep = step === data.length ? 0 : step;
    for(var i=0; i<lis.length; i++){
        lis[i].className = i === tempStep ? 'selected' : "";
    }
}
//
banner.onmouseover = function (){
    window.clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display = 'block';
}
bannerInner.onmouseout = function (){
    timer =  window.setInterval(autoMove, 2500);
    leftBtn.style.display = rightBtn.style.display = 'none';
}
//点击左右按钮
rightBtn.onclick = autoMove;
leftBtn.onclick = function (){
    if(step == 0){
        step = data.length;
        utils.css(bannerInner,'left',-1000*step);
    }
    step--;
    animate(bannerInner, {left: -1000 * step}, 500);
    focusAlign();
}

//给焦点绑定事件
;(function (){
    for(var i=0; i<lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            step = this.index;
            animate(bannerInner, {left: -1000 * step}, 500);
            focusAlign();
        }
    }
})();




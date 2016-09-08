function Banner(id, url, interval) {
    //根据id不同来获取的不同的dom内的各种元素
    //url不同获取到的数据就是不同的，轮播不同的图片
    //interval时间间隔，可以自己选择多长时间轮播一张图片
    this.banner = document.getElementById(id);
    this.bannerInner = utils.getElesByClass('bannerInner', this.banner)[0];
    this.focusList = utils.getElesByClass('focusList', this.banner)[0];
    this.imgs = this.bannerInner.getElementsByTagName('img');
    this.lis = this.focusList.getElementsByTagName('li');
    this.leftBtn = utils.getElesByClass('left', this.banner)[0];
    this.rightBtn = utils.getElesByClass('right', this.banner)[0];
    this.url = url;
    this.interval = interval || 2000; //如果第三个参数不传，那么就默认为2000
    this.timer = null;
    this.step = 0;
    this.data = null;
    return this.init(); //在创建实例的最后就执行这个init函数从而把所有的公有方法从头到尾执行一遍
}
Banner.prototype = {
    constructor: Banner,
    getData: function () {
        //this??
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url + '?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                that.data = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
    },
    bindData: function () {
        if (this.data) {
            var str = "";
            var strLi = '';
            for (var i = 0; i < this.data.length; i++) {
                var curData = this.data[i];
                str += '<div><img src="" realSrc="' + curData.src + '"/></div>';
                strLi += i === 0 ? '<li class="selected"></li>' : '<li></li>';
            }
            this.bannerInner.innerHTML = str;
            this.focusList.innerHTML = strLi;
        }
    },
    imgsDelayLoad: function () {
        var that = this;
        for (var i = 0; i < this.imgs.length; i++) {
            if (i == 0) { //默认让第一张图片去显示,让包含着第一张图片的div的样式的默认的zIndex的值从0设置成1；还要把透明度从0动画到1
                utils.css(this.imgs[i].parentNode, 'zIndex', 1);
                // marginLeft  zIndex
                animate(this.imgs[i].parentNode, {opacity: 1}, 300);
            }
            (function (i) {
                var curImg = that.imgs[i];
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('realSrc');
                tempImg.onload = function () {
                    curImg.src = this.src;
                    utils.css(curImg, 'display', 'block');
                }
                tempImg = null;
            })(i);
        }
    },
    autoMove: function () {
        if (this.step == this.data.length - 1) {
            this.step = -1;
        }
        this.step++;
        this.setBannerImg();
    },
    setBannerImg : function () {
        for (var i = 0; i < this.imgs.length; i++) {
            if (i == this.step) {
                utils.css(this.imgs[i].parentNode, 'zIndex', 1);
                animate(this.imgs[i].parentNode, {opacity: 1}, 300, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                });
            } else {
                utils.css(this.imgs[i].parentNode, 'zIndex', 0);
            }
        }
        for (var i = 0; i < this.lis.length; i++) { //焦点对齐
            this.lis[i].className = this.step == i ? 'selected' : '';
        }
    },
    mouseEvent : function (){
        var that = this;
        this.banner.onmouseover = function () {
            window.clearInterval(that.timer);
            that.leftBtn.style.display = that.rightBtn.style.display = 'block';
        }
        this.banner.onmouseout = function () {
            that.timer = window.setInterval(function (){
                //this ==> window  this
                that.autoMove();
            }, 2000);
            that.leftBtn.style.display = that.rightBtn.style.display = 'none';
        }
    },
    btnEvent : function (){
        var that = this;
        this.leftBtn.onclick = function () {

            that.step--;
            if (that.step == -1) {
                that.step = that.data.length - 1;
            }
            that.setBannerImg();
        }
        this.rightBtn.onclick = function (){
            //this ==> 右侧按钮
            that.autoMove();
        } //
    },
    bindEventForFocus : function (){
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = function () {
                that.step = this.index;
                that.setBannerImg();
            }
        }
    },
    init : function (){ //负责执行上上面所有的函数
        var that = this;
        this.getData(); //先获取数据
        this.bindData(); //绑定数据
        window.setTimeout(function (){
            that.imgsDelayLoad();
        },400);
        this.timer = window.setInterval(function (){ //涉及到定时器操作必须要留意定时器中的this是window，我们要保证每个函数中的this是实例
            that.autoMove();
        },this.interval);
        this.mouseEvent();
        this.btnEvent();
        this.bindEventForFocus();
        return this;
    }
};














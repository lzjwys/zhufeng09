var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner',banner)[0]; //包含着所有的图片的最大的盒子
var imgs = bannerInner.getElementsByTagName('img'); //所有的图片
var focusList = utils.getElesByClass('focusList',banner)[0]; //所有的焦点按钮ul
var lis = focusList.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left',banner)[0]; //左按钮
var rightBtn = utils.getElesByClass('right',banner)[0];  //右按钮
//获取数据
;(function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);
//绑定数据
//<div><img src="images/banner2.jpg" /></div>
//<li class="selected"></li>
;(function bindData(){
    if(window.data){
        var str = ""; //拼接所有图片
        var liStr = "";
        for(var i=0; i<data.length; i++){
            var curData = data[i];
            str += '<div><img src="" realSrc="' + curData.src + '" /></div>';
            liStr +=  i == 0 ? '<li class="selected"></li>'  :  '<li></li>';
        }
        str += '<div><img src="" realSrc="' + data[0].src + '" /></div>'; //为了在页面内从视觉上看起来是无缝连接播放。那么需要在添加一张和第一张完全相同的图片到末尾
        //需要修改bannerInner的宽度，保证多加一张图片能横向排列
        utils.css(bannerInner,'width',(data.length+1)*1000); //比数据的长度大1再乘以宽度
        bannerInner.innerHTML = str;
        focusList.innerHTML = liStr;
    }
})();

//图片延迟加载
function imgsDelayLoad(){
    for(var i=0; i<imgs.length; i++){
        ;(function (i){ //添加一个闭包，由于当onload成功的时候，i的值已经变成了最大值.
            var curImg = imgs[i]; //每一张图片
            var tempImg = document.createElement('img');
            tempImg.src = curImg.getAttribute('realSrc');
            //tempImg.index = i; 自定义属性方式
            tempImg.onload = function (){
                //var img = imgs[this.index]; 自定义属性方式
                //img.src = this.src; 自定义属性
                curImg.src = this.src;
                utils.css(curImg,'display','block');
                animate(curImg,{opacity:1},200);
            }
        })(i);
    }
}
window.setTimeout(imgsDelayLoad,300);

// 轮播图
var timer = window.setInterval(autoMove,3000); // 2s执行一次autoMove函数
var step = 0; //当前显示的图片的索引值，默认是第一张显示
function autoMove(){
    if(step == data.length){ //data.length  4
        step = 0;
        utils.css(bannerInner,"left", -1000*step);
    }

    step++; // step++之后的值就是我下一次要运动到的终点(是根据step*-1000算出来的)
    animate(bannerInner,{left: -1000*step },500);
    //当step的值为3的时候，第四张图片显示
    focusAlign(); //跟着autoMove执行
}
//焦点对齐  焦点的选中背景跟着step做变化。 step值和焦点的索引值相同的才添加选中样式否则移除选中样式
function focusAlign(){
    var tempStep = step == data.length ? 0 : step;  //由于有五张图片，但是焦点只有4个。所以当第五张图片显示(视觉上是第一张图片)所以我们应该让lis[0]的那一焦点选中。
    // 如果step的值为4的时候我们就主动修改成0了
    for(var i=0; i<lis.length; i++){
        lis[i].className =  i === tempStep ? 'selected' : "";
    }
}

//左右点击按钮切换


//点击焦点切换

//鼠标悬停在轮播图上的时候还需要停止播放

//..............





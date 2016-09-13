
;(function ($){
    function banner(/*id,*/url,interval){
        //var $banner = $('#'+id);
        var $banner = $(this);
        var $bannerInner = $banner.find('.bannerInner');
        var $focusList = $banner.find('.focusList');
        var $left = $banner.children('.left');
        var $right = $banner.children('.right');
        var $imgs = null; //jquery获取回来的是一个jq实例。如果是页面内已经存在元素那么可以获取。如果不存在的元素即使通过数据绑定的方式重新添加进来，那么也不会像原生方法一样通过dom映射关系不用重新获取。
// ps: jq中不存在的元素不要提前获取。等绑定数据之后再重新获取
        var $lis = null;
        var data = null;
        var step = 0;
        var timer = null;
        var interval = interval || 2000;
//
        ;(function getData(){
            $.ajax({
                type : 'get',
                url : url + '?_='+ new Date().getTime(),
                async : false,
                dataType : 'json',
                success : function (res){
                    //res就是获取回来的数据
                    data = res;
                }
            });
        })();

        console.log(data);
//
        ;(function bindData(){
            var str = "";
            var str1 = "";
            $.each(data,function (index,item){ //[{"src": 1.jpg },{},{},{}]
                str += '<div><img src="" realSrc="'+ item.src +'"/></div>';
                str1 += index == 0 ? '<li class="selected"></li>' : '<li></li>';
            });
            $bannerInner.html(str);
            $focusList.html(str1);
        })();

        $imgs = $bannerInner.find('img');
        $lis = $focusList.find('li');

// 图片延迟加载
        ;(function imgDelayLoad(){
            $imgs.each(function (index,item){ //循环每一张图片做图片延迟加载
                var tempImg = new Image();
                //tempImg.src = imgs[i].getAttribute('realSrc');
                $(tempImg).prop('src',$(item).attr('realSrc')).on('load',function (){
                    $(item).prop('src',this.src).css('display','block');
                });
                if(index == 0){ //默认第一张显示
                    $(item).parent().css('zIndex',1).stop().animate({opacity:1},200);
                }
            });
        })();
        timer = window.setInterval(autoMove,interval);
        function autoMove(){
            if(step == data.length -1){
                step = -1;
            }
            step++;
            setBanner();
        }
        function setBanner(){ //设置哪一张图片应该显示
            $.each($imgs,function (index,item){
                if(index == step){
                    $(this).parent()/*item*/.css('zIndex',1).stop().animate({opacity:1},500,function (){
                        $(item).parent().siblings().css('opacity',0);
                    })
                }else{
                    $(item).parent().css('zIndex',0);
                }
            });
            $.each($lis,function (index,item){
                index == step ? $(item).addClass('selected') : $(item).removeClass('selected');
            });
        }


        $banner.on('mouseover',function (){
            window.clearInterval(timer);
            $left.css('display','block');
            $right.css('display','block');
        }).on('mouseout',function (){
            timer = window.setInterval(autoMove,interval);
            $left.css('display','none');
            $right.css('display','none');
        });

        ;(function bindEventForLis(){
            $.each($lis,function (){
                $(this).on('click',function (){
                    step = $(this).index();
                    setBanner();
                });
            });
        })();

        $left.on('click',function (){
            if(step == 0){
                step = data.length;
            }
            step--; //
            setBanner();
        });

        $right.on('click',autoMove);
    }

   /* $.extend({
        banner :  banner
    });*/

    $.fn.extend({
        banner : banner
    });


})(jQuery); // jQuery本身是一个类，也是函数








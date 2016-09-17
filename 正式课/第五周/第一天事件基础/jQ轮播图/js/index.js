
;(function ($){
    function banner(/*id,*/url,interval){
        //var $banner = $('#'+id);
        var $banner = $(this);
        var $bannerInner = $banner.find('.bannerInner');
        var $focusList = $banner.find('.focusList');
        var $left = $banner.children('.left');
        var $right = $banner.children('.right');
        var $imgs = null; //jquery��ȡ��������һ��jqʵ���������ҳ�����Ѿ�����Ԫ����ô���Ի�ȡ����������ڵ�Ԫ�ؼ�ʹͨ�����ݰ󶨵ķ�ʽ������ӽ�������ôҲ������ԭ������һ��ͨ��domӳ���ϵ�������»�ȡ��
// ps: jq�в����ڵ�Ԫ�ز�Ҫ��ǰ��ȡ���Ȱ�����֮�������»�ȡ
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
                    //res���ǻ�ȡ����������
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

// ͼƬ�ӳټ���
        ;(function imgDelayLoad(){
            $imgs.each(function (index,item){ //ѭ��ÿһ��ͼƬ��ͼƬ�ӳټ���
                var tempImg = new Image();
                //tempImg.src = imgs[i].getAttribute('realSrc');
                $(tempImg).prop('src',$(item).attr('realSrc')).on('load',function (){
                    $(item).prop('src',this.src).css('display','block');
                });
                if(index == 0){ //Ĭ�ϵ�һ����ʾ
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
        function setBanner(){ //������һ��ͼƬӦ����ʾ
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


})(jQuery); // jQuery������һ���࣬Ҳ�Ǻ���








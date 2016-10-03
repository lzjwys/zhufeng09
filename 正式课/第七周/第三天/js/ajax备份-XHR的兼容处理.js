//->createXHR:创建AJAX对象,兼容所有的浏览器,并且使用惰性思想进行优化=>第一次执行方法,我们从头到尾的运行代码,判断当前浏览器下哪一种创建情况是兼容的,找到兼容的方法后,不仅仅创建一个AJAX对象,而且还把之前的方法重写(重写成只有当前兼容情况创建的方式即可)
//function createXHR() {
//    var xhr = null;
//    if (window.XMLHttpRequest) {
//        xhr = new XMLHttpRequest();
//        createXHR = function () {
//            return new XMLHttpRequest();
//        }
//    }
//    return xhr;
//}
//createXHR();
//console.log(createXHR);
////function () {
////    return new XMLHttpRequest();
////}
//createXHR();

/*
 * createXHR:create ajax example
 * @parameter:null
 * @return:
 *   [object] ajax example
 * by team on 2016/09/29
 */
function createXHR() {
    //->ARY中存储我们创建AJAX对象的四种方式,每一个都是一个小的函数
    var xhr = null,
        ary = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function () {
                return new ActiveXObject('Msxml2.XMLHTTP');
            },
            function () {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }
        ];
    //->循环ARY中的每一项,每一项都是一创建方式的函数,我们让这些小函数依次执行
    for (var i = 0, len = ary.length; i < len; i++) {
        var tempFn = ary[i];
        //->使用TRY CATCH捕获异常信息,如果执行某一个小函数报错了,说明当前的浏览器不兼容这种创建的方式,我们继续执行下一个小函数即可;如果执行当前的这个小函数没有报错,说明浏览器兼容,我们除了获取到对应的AJAX实例以外,还需要把CREATEXHR方法重写为当前的小函数,这样以后在执行CREATEXHR,就相当于只执行重写后的小函数了(惰性思想)
        try {
            xhr = tempFn();
            createXHR = tempFn;
            break;
        } catch (e) {
        }
    }
    return xhr;
}



















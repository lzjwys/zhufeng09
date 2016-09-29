/*
 * createXHR:create ajax example
 * @parameter:null
 * @return:
 *   [object] ajax example
 * by team on 2016/09/29
 */
function createXHR() {
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
    for (var i = 0, len = ary.length; i < len; i++) {
        var tempFn = ary[i];
        try {
            xhr = tempFn();
            createXHR = tempFn;
            break;
        } catch (e) {
        }
    }
    return xhr;
}


/*
 * ajax：send ajax get data，this is a public method
 * @parameter
 *   options:[object] storage all parameters
 */
//->我们当前要封装的方法,需要传递的参数值太多了,如果还是一个个形参变量来定义的话,以后执行这个方法的时候必须按照既定的顺序传递;再如果想让其中的某些参数有默认值,控制起来非常的麻烦;再并且我们目前指定的形参可能还不全呢...  =>解决方案:只设定一个形参,这个形参是一个对象,把需要传递的内容都当做其属性名和属性值传递进来,这样就不会受到顺序的限制了
function ajax(options) {
    //->我们一般都会给所有需要传递的内容设定一个默认值
    var _default = {
        url: null, //->请求的URL地址
        type: 'GET', //->请求的方式,默认是GET请求,如果以后执行方法需要使用的也是GET请求,则不需要在传递这个参数值了
        dataType: 'TXT', //->预先设定请求回来的内容的类型:TXT、XML、JSON,默认请求回来的结果是文本
        async: true, //->同步还是异步,默认值是TRUE异步
        cache: true, //->在GET系列请求方式下,我们走不走缓存数据,默认是TRUE走缓存的
        timeout: null, //->设置请求的超时时间,默认是不设定任何超时的
        data: null, //->在POST请求中,需要传递给服务器的内容都放在DATA中,然后通过请求主体传递给服务器,在GET请求中,我们把内容放到URL的末尾传递给服务器
        headReceive: null, //->当响应头信息接收成功后执行的事情[回调函数]
        success: null, //->当响应主体内容接收成功后执行的事情[回调函数]
        error: null //->当请求失败后执行的事情[回调函数]
    };

    //->把options传递进来的值替换_default
    for (var key in options) {
        if (options.hasOwnProperty(key)) {//->回去看第一周继承视频
            _default[key] = options[key];
        }
    }

    //->开始AJAX处理
    var xhr = createXHR();

    if (/^(GET|HEAD|DELETE)$/i.test(_default.type)) {

        //->1)验证是否走缓存：如果CACHE设置的是FALSE,我们需要清除GET系列的缓存,也就是需要在URL的末尾追加随机数
        if (_default.cache === false) {
            //首先验证之前的URL中是否存在?,存在的话我们追加的是&_=,不存在的话,我们追加的是?_=
            _default.url += _default.url.indexOf('?') === -1 ? '?_=' : '&_=';
            _default.url += Math.random();
        }

        //->2)处理DATA
        if (_default.data != null && Object.prototype.toString.call(_default.data) === '[object Object]') {
            var isOne = 0;
            for (var attr in _default.data) {
                if (_default.data.hasOwnProperty(attr)) {
                    isOne++;
                    _default.url += (isOne === 1 && _default.url.indexOf('?') === -1) ? '?' : '&';
                    _default.url += attr + '=' + _default.data[attr];
                }
            }
            _default.data = null;
        }
    }


    xhr.open(_default.type, _default.url, _default.async);

    //->3)处理超时时间
    _default.timeout != null ? xhr.timeout = _default.timeout : null;

    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {//->获取成功
            if (xhr.readyState === 2) {//->响应头信息接收成功
                _default.headReceive && _default.headReceive.call(xhr);
            }

            if (xhr.readyState === 4) {//->响应主体信息接收成功
                var val = /^XML$/i.test(_default.dataType) ? xhr.responseXML : xhr.responseText;
                /^JSON$/i.test(_default.dataType) ? val = ('JSON' in window ? JSON.parse(val) : eval('(' + val + ')')) : null;
                _default.success && _default.success.call(xhr, val);
            }
        }
        if (/^(4|5)\d{2}$/.test(xhr.status)) {//->获取失败
            //if (typeof _default.error === 'function') {
            //    _default.error.call(xhr, xhr.responseText);
            //}
            _default.error && _default.error.call(xhr, xhr.responseText);
        }
    };

    //->4)处理请求主体的信息DATA:如果是POST系列的话,我们需要把传递的对象转换为JSON格式的字符串然后在传递给服务器
    if (/^(POST|PUT)$/i.test(_default.type) && _default.data != null && Object.prototype.toString.call(_default.data) === '[object Object]') {
        _default.data = JSON.stringify(_default.data);//->回去后写一个方法处理IE6~7下JSON.stringify的兼容
    }
    xhr.send(_default.data);
}

















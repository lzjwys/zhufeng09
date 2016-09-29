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
function ajax(options) {
    var _default = {
        url: null,
        type: 'GET',
        dataType: 'TXT',
        async: true,
        cache: true,
        timeout: null,
        data: null,
        headReceive: null,
        success: null,
        error: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }
    var xhr = createXHR();
    if (/^(GET|HEAD|DELETE)$/i.test(_default.type)) {
        if (_default.cache === false) {
            //首先验证之前的URL中是否存在?,存在的话我们追加的是&_=,不存在的话,我们追加的是?_=
            _default.url += _default.url.indexOf('?') === -1 ? '?_=' : '&_=';
            _default.url += Math.random();
        }
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
    _default.timeout != null ? xhr.timeout = _default.timeout : null;
    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 2) {
                _default.headReceive && _default.headReceive.call(xhr);
            }
            if (xhr.readyState === 4) {
                var val = /^XML$/i.test(_default.dataType) ? xhr.responseXML : xhr.responseText;
                /^JSON$/i.test(_default.dataType) ? val = ('JSON' in window ? JSON.parse(val) : eval('(' + val + ')')) : null;
                _default.success && _default.success.call(xhr, val);
            }
        }
        if (/^(4|5)\d{2}$/.test(xhr.status)) {
            _default.error && _default.error.call(xhr, xhr.responseText);
        }
    };
    if (/^(POST|PUT)$/i.test(_default.type) && _default.data != null && Object.prototype.toString.call(_default.data) === '[object Object]') {
        _default.data = JSON.stringify(_default.data);
    }
    xhr.send(_default.data);
}
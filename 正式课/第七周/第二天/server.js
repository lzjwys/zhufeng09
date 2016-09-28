var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var obj = url.parse(request.url, true),
        pathname = obj.pathname,
        query = obj.query;

    //->资源文件的请求处理
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        //->获取当前请求资源文件的后缀名,通过后缀名获取到对应的MIME类型
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }

        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            response.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8;'});
            response.end(conFile);
        } catch (e) {
            //->第一个参数是告诉客户端返回的状态码:200是成功 404是资源文件不存在
            //->第二个参数是配置响应头,其中content-type是告诉客户端返回内容的格式类型:'MIME;ENCODING;'
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            response.end('request file is not found!');
        }
    }
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});
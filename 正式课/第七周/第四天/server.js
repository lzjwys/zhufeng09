var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var obj = url.parse(request.url, true),
        pathname = obj.pathname,
        query = obj.query;

    //->统一处理资源文件(HTML/CSS/JS/IMG...)的请求
    var reg = /\.([a-zA-Z]+)/i;
    if (reg.test(pathname)) {
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
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            response.end('Not Found!');
        }
    }

});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});
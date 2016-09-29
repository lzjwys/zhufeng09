var http = require('http'),
    url = require('url'),
    fs = require('fs');

var server1 = http.createServer(function (request, response) {
    /*
     * request：存储了客户端请气的全部信息
     *    request.url:存储客户端请求的URL地址,在这个地址中,包含了请求文件的目录以及问号后面传递过来的参数值(协议、域名、端口号、哈希值都没有)
     *
     * response：提供了相关的方法可以给客户端返回内容
     *   writeHead:重写响应头信息
     *   write:向客户端返回内容,返回的内容一般都是字符串格式的内容
     *   end:结束向客户端的返回
     **/
    //->获取客户端请求的URL地址,把地址中的每一项都进行解析,得到pathname&query
    var urlObj = url.parse(request.url, true),
        pathname = urlObj['pathname'],//->请求文件的目录和名称
        query = urlObj['query'];//->客户端问号后面传递给服务器的值

    //->如果请求的是index.html的话,我们首先需要把index.html中的内容获取到,然后把获取的内容返回给客户端
    if (pathname === '/index.html') {
        var conFile = fs.readFileSync('./index.html', 'utf-8');

        response.write(conFile);
        response.end();
    }
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});

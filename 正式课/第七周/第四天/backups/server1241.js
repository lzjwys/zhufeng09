var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    //->当客户端向当前80这个服务发送请求,就会触发本回调函数执行
    //request:存储了客户端的全部请求信息
    //response:提供了一系列的方法供服务器端向客户端返回内容

    //->获取客户端请求的URL地址,并且把地址进行解析
    //pathname:请求资源文件的路径和名称(会在最前面加一个/)
    //query:存储的是客户端问号传递过来的所有参数值,如果url.parse第二个参数为true的话,存储的值都是以对象键值对的方式存储的
    var obj = url.parse(request.url, true),
        pathname = obj.pathname,
        query = obj.query;

    //->判断请求的是否为index.html，如果是的话，我们把index.html中的源代码得到，通过response.end返回给客户端，但是不要忘记，我们还需要重写响应头信息，从而告诉客户端返回的源代码是什么格式的(MIME类型)
    if (pathname === '/index.html') {
        var conFile = fs.readFileSync('./index.html', 'utf-8');
        response.writeHead(200, {'content-type': 'text/html;charset=utf-8;'});
        response.end(conFile);
    }

    if (pathname === '/css/test.css') {
        conFile = fs.readFileSync('./css/test.css', 'utf-8');
        response.writeHead(200, {'content-type': 'text/css;charset=utf-8;'});
        response.end(conFile);
    }
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});
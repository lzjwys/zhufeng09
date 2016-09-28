var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var obj = url.parse(request.url, true),
        pathname = obj.pathname,
        query = obj.query;

    //->前端路由:根据客户端请求资源的不同,返回对应的不同内容
    //->'.' + pathname的前提条件是:server.js必须在当前项目的根目录下,这样./才是当前的项目目录,我们才会找到对应的资源文件

    //->如果我们请求的是项目资源文件(HTML/CSS/JS/PNG/GIF...我们可以使用正则验证客户端请求的是否为资源文件),我们统一使用下面的操作进行处理即可
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        //->加TRY CATCH的目的：如果当前请求的资源文件不存在的话,我们不让服务报错,而是返回一个不存在的提示即可,这样保证服务不会因为错误而终止
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            response.end(conFile);
        } catch (e) {
            response.end('request file is not found!');
        }
    }

    //->这样做完后在谷歌下没有问题,但是在IE下还是有问题的:虽然请求的内容都返回了,但是我们返回的都是从文件中获取的字符串,IE下不能识别这些字符串是CSS还是JS文件,所以IE在渲染的样式和效果出不来
    //->我们需要做的事情:
    //不仅需要把内容返回,还需要告诉浏览器是什么类型的(指定内容的MIME类型)
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});
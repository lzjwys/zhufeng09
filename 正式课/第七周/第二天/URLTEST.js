var url = require('url');
//var res = url.parse('http://www.zhufengpeixun.cn:80/index.html?name=zf&age=8#aa');
//console.log(res);
/*
 * 获取的结果是一个对象
 * {
    protocol: 'http:', 传输协议
    slashes: true, 斜线:是否有斜线 TRUE是有
    auth: null, 作者
    host: 'www.zhufengpeixun.cn:80', 域名+端口号
    port: '80', 端口号
    hostname: 'www.zhufengpeixun.cn', 域名
    hash: '#aa',  哈希值
    search: '?name=zf&age=8', 问号及传递的值
    query: 'name=zf&age=8', 传递的值
    pathname: '/index.html', 请求资源的目录名称(在字符串的最前面会加一个左斜杠)
    path: '/index.html?name=zf&age=8', pathname+search
    href: 'http://www.zhufengpeixun.cn:80/index.html?name=zf&age=8#aa' 我解析的原始的URL地址
   }
 */

var res = url.parse('http://www.zhufengpeixun.cn:80/index.html?name=zf&age=8#aa',true);
console.log(res);
/*
 {
 query: { name: 'zf', age: '8' }, 在第二个参数写true的话和不写的区别：不写true,query属性获取的值就是一个字符串，加上true之后会把这个字符串自动的解析为一个对象，对象的属性名和属性值分别是我们传递的内容
 }
*/
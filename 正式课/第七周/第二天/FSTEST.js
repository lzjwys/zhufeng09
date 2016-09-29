var fs = require('fs');
//->读取文件中的内容
//readFile:异步读取内容,不管内容是否读取完成,继续执行下面的事情(无阻塞I/O操作)
//readFileSync([pathname],[encoding]):同步读取内容,只有当内容都读取完成后,我们才能进行下面的操作 读取出来的结果是字符串格式的
var res = fs.readFileSync('./index.html', 'utf-8');
//console.log(res);

//->往指定的文件中写入内容
//fs.writeFile:异步写入
//fs.writeFileSync([pathname],[content],[encoding]):同步写入
// ->写入是覆盖式写入,写入的新的内容会把之前的内容全部覆盖掉,不想覆盖以前的:把之前的获取到,和最新的内容拼接在一起,然后在写入
// ->写入的内容是字符串格式的
// ->如果之前的文件不存在,它会默认新创建一个,然后在写入内容
var flag = fs.writeFileSync('./index2.html', res + 'HELLO珠峰', 'utf-8');
console.log(flag);//->undefined 说明执行上述的方法没有返回值
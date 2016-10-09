ajax({
    url: 'json/custom.json',
    type: 'GET',
    dataType: 'JSON',
    success: function (result) {
        //->RESULT就是我们需要获取的数据,API文档中编写了数据格式的样子,接下来按照获取的数据实现HTML的绑定即可(字符串拼接)
        console.log(result)
    }
});
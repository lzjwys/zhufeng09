function fn() {

}

function sum() {
    var total = null;
    [].forEach.call(arguments, function (item, index) {
        item = Number(item);
        !isNaN(item) ? total += item : null;
    });
    return total;
}
//->module是NODE天生自带的一个对象,用来管理模块的 [Object]
//->module.exports:在当前的模块中暴露一些供外面使用的属性或者方法
//module.exports.sum = sum;
module.exports = {
    sum: sum,
    fn: fn
};












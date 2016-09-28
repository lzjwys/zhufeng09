var test1 = require('./TEST1');
function avgFn() {
    //arguments -> [12, 23, 34, 45, 56]
    var total = test1.sum.apply(null, arguments);
    return total / arguments.length;
}
module.exports = {
    avgFn: avgFn
};
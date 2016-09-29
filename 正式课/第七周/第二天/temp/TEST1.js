function sum() {
    var total = null;
    [].forEach.call(arguments, function (item, index) {
        item = Number(item);
        !isNaN(item) ? total += item : null;
    });
    return total;
}
module.exports = {
    sum: sum
};


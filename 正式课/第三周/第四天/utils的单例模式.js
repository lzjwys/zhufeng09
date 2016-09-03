/**
 * Created by lucky on 2016/9/3.
 */

var utils = {

    win: function (attr, val) {

        if (typeof val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }

};


var utils = (function () {
    var isStanderBrowser = "getComputedStyle" in window;

    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function win(attr, val) {
        if (typeof val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    function prev(ele){
        if(isStanderBrowser){
            return ele.previousElementSibling;
        }
        win(); //通过作用域来查找的
        this.win(); //通过this来查找的 this => utils
        //......
    }

    return { //如果不return那么外面就没有办法访问
        getRandom: getRandom,
        win : win
    };
    window.getRandom = getRandom; //这个就是直接赋值给window当作全局的一个属性
})();
utils.prev();



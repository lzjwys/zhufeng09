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
        win(); //ͨ�������������ҵ�
        this.win(); //ͨ��this�����ҵ� this => utils
        //......
    }

    return { //�����return��ô�����û�а취����
        getRandom: getRandom,
        win : win
    };
    window.getRandom = getRandom; //�������ֱ�Ӹ�ֵ��window����ȫ�ֵ�һ������
})();
utils.prev();



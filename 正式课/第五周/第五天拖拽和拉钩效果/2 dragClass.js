/*
*   1 思想转变： 一直都是在面向过程编程(单纯的实现效果就可以oDiv的拖拽) ==> 面向对象的思想，把要操作的对象(要拖拽的元素)当作一类来处理
*   2 类和实例：实例上存储都是私有的可能要操作到的元素或者值
*
* */
// new Drag(oDiv)  我要拖拽oDiv
function Drag(ele){ //定义一个叫做Drag的类   ele: 我要拖拽的元素
    this.element = ele; //我要把要拖拽的元素保存在实例私有属性身上。在公有方法中只能能保证公有方法中的this是实例。那么就能通过this.element来拿到这个要拖拽的元素
    this.x = null; //这个私有的x是用来记录鼠标点击的那一刻距离我要拖拽的元素的偏移量.但是这一会没有发生点击事件所以还没有.
    this.y = null;
    //给鼠标绑定onmousedown事件是必须要操作的事。所以可以放到构造函数中，因为直接在new Drag创建实例的过程中就会默认执行代码
    var that = this; //这个this一定是实例
    this.DOWN = function (e){ //由于这个方法才是真正绑定给mousedown事件的,所以事件对象只在这个DOWN函数中，但是我们down方法需要用到事件对象e，所以需要传给down方法,这个e不用处理在on方法中处理过了
        that.down.call(that,e);
    }
    this.MOVE = function (e){ //和down相同道理也处理一下move和up
        that.move.call(that,e);
    }
    this.UP = function (e){
        that.up.call(that,e);
    }
    on(this.element,'mousedown',this.DOWN/*this.down*/); //如果绑定this.down。那么当事件被触发的时候this.down(原型上的down方法)中的this就变成了this.element了。也就是那个要拖拽的元素了。但是我们要保证原型上方法中的this是实例。所以需要我们包装一个函数来处理this问题. 这些函数在up的时候还要被移除所以必须保证时刻能获取到，那么就保存在实例的私有属性身上，在up方法中就能通过this(实例)来获取了
    //on(oDiv,'click',fn);

}
//三个公有函数
Drag.prototype.down = function (e){
    // 必须保证公有方法中的this是实例
    this.x = e.clientX/*e.pageX*/ - this.element.offsetLeft;  //重新赋值鼠标相对于传进来的ele也就是this.element的相对偏移量
    this.y = e.clientY - this.element.offsetTop;
    //判断下setCapture是否可以使用，如果可以就绑定给元素this.element，如果不可以才绑定给document
    if(this.element.setCapture){ //ie+firefox
        this.element.setCapture();
        on(this.element,'mousemove',this.MOVE); //保证this是实例
        on(this.element,'mouseup',this.UP); //由于绑定事件会更改this，所以我们都绑定的是大写的MOVE和UP已经处理过this的
    }else{ //chrome 需要把事件绑定给document
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault(); //阻止默认行为,盒子里面有图片就会有默认拖拽图片或者默认行为
}
Drag.prototype.move = function (e){
    //this.element才是我要拖拽也就是我要操作的那个元素，this.x就是保存着那个相对偏移量的值,我们把这个值存储在实例的私有属性上了。这个值是在mousedown的时候才算出来的。
    this.element.style.left = e.clientX - this.x + 'px';
    this.element.style.top = e.clientY - this.y + 'px';
}
Drag.prototype.up = function (e){
    // 由于绑定的时候是分开绑定的，所以移除的时候也要分开
    if(this.element.releaseCapture){ //ie+ff
        this.element.releaseCapture();
        off(this.element,'mousemove',this.MOVE); //由于这个方法是存储在实例的私有属性上的所以能通过this获取并且移除
        off(this.element,'mouseup',this.UP);
    }else{ //chrome
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
}
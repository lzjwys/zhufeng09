/*
*   1 ˼��ת�䣺 һֱ������������̱��(������ʵ��Ч���Ϳ���oDiv����ק) ==> ��������˼�룬��Ҫ�����Ķ���(Ҫ��ק��Ԫ��)����һ��������
*   2 ���ʵ����ʵ���ϴ洢����˽�еĿ���Ҫ��������Ԫ�ػ���ֵ
*
* */
// new Drag(oDiv)  ��Ҫ��קoDiv
function Drag(ele){ //����һ������Drag����   ele: ��Ҫ��ק��Ԫ��
    this.element = ele; //��Ҫ��Ҫ��ק��Ԫ�ر�����ʵ��˽���������ϡ��ڹ��з�����ֻ���ܱ�֤���з����е�this��ʵ������ô����ͨ��this.element���õ����Ҫ��ק��Ԫ��
    this.x = null; //���˽�е�x��������¼���������һ�̾�����Ҫ��ק��Ԫ�ص�ƫ����.������һ��û�з�������¼����Ի�û��.
    this.y = null;
    //������onmousedown�¼��Ǳ���Ҫ�������¡����Կ��Էŵ����캯���У���Ϊֱ����new Drag����ʵ���Ĺ����оͻ�Ĭ��ִ�д���
    var that = this; //���thisһ����ʵ��
    this.DOWN = function (e){ //��������������������󶨸�mousedown�¼���,�����¼�����ֻ�����DOWN�����У���������down������Ҫ�õ��¼�����e��������Ҫ����down����,���e���ô�����on�����д������
        that.down.call(that,e);
    }
    this.MOVE = function (e){ //��down��ͬ����Ҳ����һ��move��up
        that.move.call(that,e);
    }
    this.UP = function (e){
        that.up.call(that,e);
    }
    on(this.element,'mousedown',this.DOWN/*this.down*/); //�����this.down����ô���¼���������ʱ��this.down(ԭ���ϵ�down����)�е�this�ͱ����this.element�ˡ�Ҳ�����Ǹ�Ҫ��ק��Ԫ���ˡ���������Ҫ��֤ԭ���Ϸ����е�this��ʵ����������Ҫ���ǰ�װһ������������this����. ��Щ������up��ʱ��Ҫ���Ƴ����Ա��뱣֤ʱ���ܻ�ȡ������ô�ͱ�����ʵ����˽���������ϣ���up�����о���ͨ��this(ʵ��)����ȡ��
    //on(oDiv,'click',fn);

}
//�������к���
Drag.prototype.down = function (e){
    // ���뱣֤���з����е�this��ʵ��
    this.x = e.clientX/*e.pageX*/ - this.element.offsetLeft;  //���¸�ֵ�������ڴ�������eleҲ����this.element�����ƫ����
    this.y = e.clientY - this.element.offsetTop;
    //�ж���setCapture�Ƿ����ʹ�ã�������ԾͰ󶨸�Ԫ��this.element����������ԲŰ󶨸�document
    if(this.element.setCapture){ //ie+firefox
        this.element.setCapture();
        on(this.element,'mousemove',this.MOVE); //��֤this��ʵ��
        on(this.element,'mouseup',this.UP); //���ڰ��¼������this���������Ƕ��󶨵��Ǵ�д��MOVE��UP�Ѿ������this��
    }else{ //chrome ��Ҫ���¼��󶨸�document
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
    }
    e.preventDefault(); //��ֹĬ����Ϊ,����������ͼƬ�ͻ���Ĭ����קͼƬ����Ĭ����Ϊ
}
Drag.prototype.move = function (e){
    //this.element������Ҫ��קҲ������Ҫ�������Ǹ�Ԫ�أ�this.x���Ǳ������Ǹ����ƫ������ֵ,���ǰ����ֵ�洢��ʵ����˽���������ˡ����ֵ����mousedown��ʱ���������ġ�
    this.element.style.left = e.clientX - this.x + 'px';
    this.element.style.top = e.clientY - this.y + 'px';
}
Drag.prototype.up = function (e){
    // ���ڰ󶨵�ʱ���Ƿֿ��󶨵ģ������Ƴ���ʱ��ҲҪ�ֿ�
    if(this.element.releaseCapture){ //ie+ff
        this.element.releaseCapture();
        off(this.element,'mousemove',this.MOVE); //������������Ǵ洢��ʵ����˽�������ϵ�������ͨ��this��ȡ�����Ƴ�
        off(this.element,'mouseup',this.UP);
    }else{ //chrome
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
}
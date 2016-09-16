
/**
 *
 * @param ele ���ĸ�Ԫ�ذ��¼�
 * @param eventType �¼�����  => click  mouseover   ....
 * @param fn �󶨵ĺ���
 */
function bind(ele,eventType,fn){ //����dom2�¼��󶨵ļ���

    if(ele.addEventListener){ //������һ������/undefined
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //���������µĴ����Ǹ�ie6-8  forIE6-8
    var tempFn = function (){
        fn.call(ele);
    };
    tempFn.origin = fn; //�������ʱ�ĺ����������һ���Զ�������������¼��ԭ�������ĸ�����
    //���ifֻ���ڵ�һ��ִ��һ�飬��һ����ele���Ͼ��Ѿ�������Զ������ˡ���������������ô�����������û�оʹ���һ��
    if(!ele['mybind'+eventType]){// 'mybindclick'  ele["mybindmouseover"] ele.mybindmouseover
        //mybind���������������ԭ�������Եġ��Զ���������������ž���αװ֮�����ЩtempFn�ġ�Ϊ�����ֲ�ͬ�¼�֮��ʹ�ò�ͬ�����飬������mybind�ĺ����һ��eventType���������¼����͵�
        //���ele.mybindclick�����������ô�ʹ���һ������
        ele['mybind'+eventType] = [];
    }
    var  a = ele['mybind'+eventType]; //�������
    a.push(tempFn); //���Ѿ���ӹ�origin����Զ������Եĺ�������ӶԶ�Ӧ�¼����͵�ele���Զ��������Ǹ�������ȥ ==> ��������Ϊ���Ƴ��¼���ʱ�����ҵ��Լ�ԭ����˭��
    ele.attachEvent('on'+eventType,tempFn); //fn�е�this����ele��window
}
       //unBind(oDiv,'click',fn2);
function unBind(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn,false);
        return;
    }
    // for ie6-8
    var a = ele['mybind'+eventType]; //ͨ���¼�����ȥ�ö�Ӧ�Զ������Ե�����
    for(var i=0; i< a.length; i++){
        //��һ��tempFn������һ����origin�����Ǵ������������fn��ô�Ҿ�ʹ��detachEvent�������Ƴ���Ӧ��tempFn
        var tempFn = a[i];
        if(tempFn.origin == fn){
            ele.detachEvent('on'+eventType,tempFn);//�󶨵�ʱ�����tempFn
        }
    }
}


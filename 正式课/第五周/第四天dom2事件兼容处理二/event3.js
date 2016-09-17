
/**
 * bind��������������ie6-8�ͱ�׼������а󶨵ļ�������
 * @param ele  ��ele��
 * @param eventType  ��ele�����eventType�¼�����
 * @param fn  ��ele��eventType�¼���fn�������
 */
//bind(box,'click',fn1); //��ie�ͱ�׼�������
//bind(box,'click',fn2); //��ie�ͱ�׼�������
function bind(ele,eventType,fn){
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //ֻҪ�������е�����ô�Ͳ��Ǳ�׼��������������е��������Ҫ����this���⣬ʹ��attachEvent�����е�this��window����fn�е�this�����ele,���ֱ��fn.call(ele)��ô���Ѿ�ִ���ˡ�
    var tempFn = function (){ //�����������ִ�е�ʱ�����ִ��fn�ˡ�
        //��������������е�this�޸ĳ��κ��Ҷ�����ν��window
        fn.call(ele); //��ִ��������������Ĺ����а�fnִ�У�����ͨ��call��fn�е�this�޸ĳ���ele
    }

    //��������Ҫһ��������������¼��Щ������װ֮���fn��ǰ����˭�����������Զ�����ܶ���ֻ�д���ele���Զ�������������á�  box.mybind = [];  ���ele��������Դ�����ô�Ͳ��ø�ֵ�����ˣ���������ڻ���Ҫ��ֵһ������
    if(!ele['mybind'+eventType]){ //ֻ�е�һ��ִ�в��ܽ���
        ele['mybind'+eventType] = [];
    }
    var ary = ele['mybind'+eventType]; // �Ժ�ÿ��ִ��ary�����Ǹ��Զ������Ե�����
    //������Զ������ԣ�������¼���tempFn��ǰ��˭,��ǰ���Ǵ�������fn
    tempFn.originFn = fn;
    ary.push(tempFn);
    //�ɰ�װ�����tmepFnҲ�ŵ����ele���Զ�����������һ�ݡ�
    // [     tempFn.originFn == fn1(fn1��װ),    tempFn.originFn == fn2 (fn2��װ)]
    ele.attachEvent('on'+eventType,tempFn); //��tempFn�ŵ��¼����У�ϵͳĬ��
    //
}

function unbind(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn,false);
        return;
    }
    //ֻҪ�������е�����ô�Ͳ��Ǳ�׼�����
    //�Ƴ���ʱ����Ҫ���ڶ��tempFn��������˭��ԭ����fn
    var ary = ele['mybind'+eventType]; //ele['mybind']�д�ž��� [tempFn.originFn == fn1(fn1��װ),    tempFn.originFn == fn2 (fn2��װ)]
    for(var i=0; i<ary.length; i++){
        if(ary[i].originFn == fn){ //��Ҫ�ҵ���װ֮ǰ���Ǹ�tempFn
            ele.detachEvent('on'+eventType,ary[i]); //���on��Ҫ������
            break; //�ҵ��˾Ͳ���ѭ����������
        }
    }
}


function bind(ele,eventType,fn){ //bind(box,click,fn1)  //bind(box,click,fn2)  //bind(box,'mouseover',fn1); //bind(box,click,fn1)  box.mybindclick = [tempFn(fn1),tempFn(fn2)]
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn,false);
        return;
    }
    if(!ele['mybind'+eventType]){
        ele['mybind'+eventType] = [];
    }     //box.mybindclick = [tempFn]; //box.mybindmouseover = [tempFn];
    var a =   ele['mybind'+eventType];
    for(var i=0; i< a.length; i++){
        if(a[i].originFn == fn){
            return;
        }
    }
    var tempFn = function (){
        fn.call(ele);
    }
    tempFn.originFn = fn;

    a.push(tempFn);
    ele.attachEvent('on'+eventType,tempFn);
}


function on(ele,eventType,fn){
    if(!ele['mysort'+eventType]){
        ele['mysort'+eventType] = [];
    }
    var a = ele['mysort'+eventType];
    for(var i =0; i< a.length; i++){
        if(a[i] == fn){
            return;
        }
    }
    a.push(fn);
    bind(ele,eventType,run); //bind��run�����󶨸�ele��eventType���ԣ����¼�������ʱ������ִ�еķ�����run(run�в����¼�����e)��run����ѭ��ִ���Զ������������еķ���,��������bind�����Ѿ��Ǵ����this���ˡ�run�е�thisҲ�Ѿ��������Ҳ��ele
}

function run(e){ //run���������󶨵ĺ���������run�����¼�����e
    e = e || window.event;
    var isLowIE = !e.target; //��ie6-8��e.target������
    if(isLowIE){
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft)+ e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function (){
            e.returnValue = false;
        }
        e.stopPropagation = function (){
            e.cancelBubble = true;
        }
    }
    //this == e.target ==> ele
    //�Ȱ�run��Ӧ���¼����Ե������ҵ�
    var ary = e.target['mysort'+ e.type]; //e.type����eventType
    for(var i=0; i<ary.length; i++){ //ary[i]����ľ���ÿһ������
        var curFn = ary[i];
        if(typeof  curFn == 'function'){
            curFn.call(this,e); //��run�е�e�¼�������Ҫ����ÿһ������,�����e���еļ����Զ���������
            //curFn.call(e.target);

        }else{ //����fn��ô������off��ʱ���null
            //Ϊ�˷�ֹ�Զ������������е���off��ʱ���ۼ�Խ��Խ���null���Ϳ���ɾ����
            ary.splice(i,1);
            i--; //ѭ��ִ�������еĺ�����ʱ����뱣֤ÿ��������ִ�е�
        }
    }
}

//on(box,'click',fn1); ==> run


function off(ele,eventType,fn){
    var a = ele['mysort'+eventType];
    for(var i=0; i< a.length; i++){
        if(a[i] === fn){
            //a.splice(i,1);
            a[i] = null; //��֤���鲻����������
            break;
        }
    }
}


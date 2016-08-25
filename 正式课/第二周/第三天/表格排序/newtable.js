var box = document.getElementById('box');
var table = box.getElementsByTagName('table')[0];
var tHeadThs = table.tHead.rows[0].cells;
var tbody = table.tBodies[0];
var tbodyRows = tbody.rows;
//getData
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get',"data.txt",false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
//console.log(data);
//bindData
(function bindData(){
    if(window.data){
        var frg = document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var tr = document.createElement('tr');
            for(var key in data[i]){
                var td = document.createElement('td');
                td.innerHTML = key === 'sex' ? data[i][key] == 1 ? "男" : "女"  : data[i][key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tbody.appendChild(frg);
        frg = null;
    }
})();
//bindEvent
(function bindEvent(){
    for(var i=0; i<tHeadThs.length; i++){
        tHeadThs[i].index = i;
        tHeadThs[i].sortFlag = -1;
        if(tHeadThs[i].className == 'cursor'){
            tHeadThs[i].onclick = function (){
                sort.call(this,this.index);
                changeBg();
            }
        }
    }
})();

function sort(n){
    var that = this;
    for(var i=0; i<tHeadThs.length; i++){
        if(tHeadThs[i] != this){
            tHeadThs[i].sortFlag = -1;
        }
    }
    var tbodyRowsAry = utils.listToArray(tbodyRows);
    that.sortFlag *= -1;
    tbodyRowsAry.sort(function (a,b){
        var _a = a.cells[n].innerHTML;
        var _b = b.cells[n].innerHTML;
        if(isNaN(_a) || isNaN(_b)){
            return (_a.localeCompare(_b))*that.sortFlag;
        }
        return (_a - _b)*that.sortFlag;
    });
    var frg = document.createDocumentFragment();
    for(var i=0; i<tbodyRowsAry.length; i++){
        frg.appendChild(tbodyRowsAry[i]);
    }
    tbody.appendChild(frg);
    frg = null;
}

//changeBg
function changeBg(){
    for(var i=0; i<tbodyRows.length; i++){
        tbodyRows[i].className = 'c' + (i%2+1);
    }
}
changeBg();


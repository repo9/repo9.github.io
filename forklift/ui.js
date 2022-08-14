var img_L = 0;
var img_T = 0;
var targetObj;

function getLeft(o){
     return parseInt(o.style.left.replace('px', ''));
}
function getTop(o){
     return parseInt(o.style.top.replace('px', ''));
}

// 이미지 움직이기

function moveDrag(e){
     var e_obj = window.event? window.event : e;
     var dmvx = parseInt(e_obj.clientX + img_L);
     var dmvy = parseInt(e_obj.clientY + img_T);
     //targetObj.style.left = dmvx +"px";
     //targetObj.style.top = dmvy +"px";

     //console.log("dd");

     document.getElementById('mainPanel').style.left = dmvx +"px";
     document.getElementById('mainPanel').style.top = dmvy +"px";
     return false;
}

// 드래그 시작
function startDrag(e, obj){
    targetObj = obj;
    var e_obj = window.event? window.event : e;
    //var x = document.getElementById('mainPanel').style.left.replace('px', '');
    //var y = document.getElementById('mainPanel').style.top.replace('px', '');

    //console.log(e_obj.clientX);
    //console.log(e_obj.clientY);

    //if(x!="" && y!="" ){
    //	img_L = document.getElementById('mainPanel').style.left.replace('px', '') - e_obj.clientX;
    //	img_T = document.getElementById('mainPanel').style.top.replace('px', '') - e_obj.clientY;
 	//}else{
 	//	img_L = targetObj.style.left.replace('px', '');
    //	img_T = targetObj.style.top.replace('px', '');
 	//}

    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    if(e_obj.preventDefault)e_obj.preventDefault();
}

// 드래그 멈추기
function stopDrag(){
     document.onmousemove = null;
     document.onmouseup = null;
}

//////////////////////

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('scale').onchange = function () {
      //alert((1.0+this.value/100));

      document.getElementById('shroud').style="transform: scale("+(1.0+this.value/100)+");";
      this.blur();
  }
});
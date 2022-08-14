function setCookie(key, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}


function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');

        //console.log("item-"+item);
 
        var dic = item.split('=');
 
        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return result;
}

function stageRecent(){
	var v = null;
	v = getCookie("st");
	//console.log("get-"+v);
	return v;
}

function puzzleRecent(){
	var v = null;
	v = getCookie("pu");
	//console.log("get-"+v);
	return v;
}

function stageSave(v){
	//console.log("save-"+v);
	setCookie("st", v, 365);
}

function puzzleSave(v){
	//console.log("save-"+v);
	setCookie("pu", v, 365);
}


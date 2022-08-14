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

function themeRecent(){
	var v = null;
	v = getCookie("minet");
	//console.log("get-"+v);
	return v;
}

function diffRecent(){
	var v = null;
	v = getCookie("minel");
	//console.log("get-"+v);
	return v;
}

function themeSave(v){
	//console.log("save-"+v);
	setCookie("minet", v, 365);
}

function diffSave(v){
	//console.log("save-"+v);
	setCookie("minel", v, 365);
}


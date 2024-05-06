var isPause = true;  //true: start false: stop
var time = 0;
var starFlag = true;
var hour = 0;
var min = 0;
var sec = 0;
var timer;



	//if(time==0){
	//	reset();
	//}
function timeStart(){
	
	isPause = true;

	timer = setInterval(function(){

		if(isPause){
		    time++;

		    min = Math.floor(time/60);
		    hour = Math.floor(min/60);
		    sec = time%60;
		    min = min%60;

		    var th = hour;
		    var tm = min;
		    var ts = sec;
		    if(th<10){
		    th = "0" + hour;
		    }
		    if(tm < 10){
		    tm = "0" + min;
		    }
		    if(ts < 10){
		    ts = "0" + sec;
		    }

		    document.getElementById("time").innerHTML = th + ":" + tm + ":" + ts;
		}
	}, 1000);
	
}


function pause(){
	if(time != 0){
		clearInterval(timer);
	}
}

function resume(){
	if(time != 0){
		timeStart();
	}
}
function timeReset(){

	//if(time != 0){
		time = 0;
		clearInterval(timer);
		timer=null;
		document.getElementById("time").innerHTML = "00:00:00";
	//}
}

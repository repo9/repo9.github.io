var op =1;

function cusAlert(m)
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    var aDivAlrt = document.createElement("div");
    aDivAlrt.id = "customAlert"; 
    aDivAlrt.innerHTML = '<p><center><h3>'+m+'</h3></center></p>';
    aDivAlrt.style.color = "#888888";
    aDivAlrt.style.position = "fixed";
    aDivAlrt.style.width = 250+"px";
    aDivAlrt.style.background = "#e1e1e1";
    aDivAlrt.style.padding = 10+"px";
    aDivAlrt.style.borderStyle = "outset";
    aDivAlrt.style.top = 200+"px";
    aDivAlrt.style.boxShadow = "0px 0px 10px 5px #777777";
    aDivAlrt.style.left = (w/2)-125+"px";

    //var aDivAlrtBg = document.createElement("div");
    //aDivAlrtBg.innerHTML = '<div id="bg" style="position: fixed; top:0; left:0; background: rgba(0, 0, 0, 0.37); width: 100%; height: 100%;"></div>';

    //document.getElementsByTagName("body")[0].appendChild(aDivAlrtBg);
    document.getElementsByTagName("body")[0].appendChild(aDivAlrt);

    //window.onload = function(){
        window.setTimeout(dismissCusBox,3000);
    //}

}

function dismissCusBox()
{
    op= 1;
    window.setTimeout(fade_out,100);
}

function fade_out(){
    if(op<= 0){
        document.getElementById("customAlert").remove();
        //document.getElementById("bg").remove();
    }else{
        op = op-0.5;
        document.getElementById("customAlert").style.opacity = op;
        window.setTimeout(fade_out,100);
    }
}
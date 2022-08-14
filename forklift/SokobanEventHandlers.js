function body_onload() {
    // Get important elements
    gPlayfieldTable = document.getElementById('playfield');
    gPlayfieldContainerDiv = document.getElementById('playfieldContainer');
    gPlaceholderTbody = document.getElementById('placeholder');
    numTextSpan = document.getElementById('numText');
    moveTextSpan = document.getElementById('moveText');

    gStatusbarTd = document.getElementById('statusbar');
    gCenterTd = document.getElementById('center');
    gButtonbarTd = document.getElementById('buttonbar');
    gFrontDiv = document.getElementById('front');
    gBackDiv = document.getElementById('back');
    gPrevPuzzleDiv = document.getElementById('prevPuzzle');
    gNextPuzzleDiv = document.getElementById('nextPuzzle');
    //gPuzzleSetControl = document.getElementById('puzzleSetControl');
    gPuzzleNumberControl = document.getElementById('puzzleNumberControl');
    gShroudDiv = document.getElementById('shroud');
    gPuzzleSetAuthorSpan = document.getElementById('puzzleSetAuthor');
    gPuzzleSetCountSpan = document.getElementById('puzzleSetCount');
    gInfoButtonImg = document.getElementById('infoButton');


    //set_stage_list();


    // Populate the list of puzzle sets
    sokobanSets = new Array(
	   '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'
    );
    var i, workingOptgroup, workingOption;
    //workingOptgroup = gPuzzleSetControl;
    for(i = 0; i < sokobanSets.length; ++i) {
	if(sokobanSets[i].charAt(0) == '-') {
	    workingOptgroup = document.createElement('optgroup');
	    workingOptgroup.label = sokobanSets[i].substring(1, sokobanSets[i].length);
	    //gPuzzleSetControl.appendChild(workingOptgroup);
	} else {
	    workingOption = document.createElement('option');
	    workingOption.label = sokobanSets[i] + " (" + gSokobanPuzzles[sokobanSets[i]][0].difficulty + ")";
	    workingOption.value = sokobanSets[i];
	    workingOption.appendChild(document.createTextNode(sokobanSets[i]));
	    //workingOptgroup.appendChild(workingOption);
	}
    }

    // Set up event handlers for button divs
    var divs = document.getElementsByTagName('div'), i;
    for(i = 0; i < divs.length; ++i) {
	if(divs[i].className == "button" || divs[i].className == "button_sep") {
	    divs[i].onmousedown = button_onmousedown;
	    divs[i].onmouseup = button_onmouseup;
	    divs[i].onmouseout = button_onmouseout;
	}
    }

    // Construct the arrow buttons
    gArrowButtons = new Array(4);
    gArrowButtons[0] = document.createElement("div");
    gArrowButtons[0].style.position = "absolute";
    gArrowButtons[0].style.display = "none";
    gArrowButtons[0].style.cursor = "pointer";
    gArrowButtons[0].style.AppleDashboardRegion = "dashboard-region(control rectangle)";
    gArrowButtons[0].style.opacity = ".6";
    gArrowButtons[0].style.backgroundRepeat = "no-repeat";
    gArrowButtons[0].style.backgroundPosition = "center center";
    gArrowButtons[0].style.width  = "30px";
    gArrowButtons[0].style.height = "30px";
    for(i = 1; i < 4; ++i)
	gArrowButtons[i] = gArrowButtons[0].cloneNode(false);
    // Up
    gArrowButtons[0].style.top = "-30px";
    gArrowButtons[0].style.left = "-5px";
    gArrowButtons[0].style.backgroundImage = "url(images/up-arrow.gif)";
    gArrowButtons[0].onclick = arrow_up_click;
    // Right
    gArrowButtons[1].style.top = "-5px";
    gArrowButtons[1].style.left = "20px";
    gArrowButtons[1].style.backgroundImage = "url(images/right-arrow.gif)";
    gArrowButtons[1].onclick = arrow_right_click;
    // Down
    gArrowButtons[2].style.top = "20px";
    gArrowButtons[2].style.left = "-5px";
    gArrowButtons[2].style.backgroundImage = "url(images/down-arrow.gif)";
    gArrowButtons[2].onclick = arrow_down_click;
    // Left
    gArrowButtons[3].style.top = "-5px";
    gArrowButtons[3].style.left = "-30px";
    gArrowButtons[3].style.backgroundImage = "url(images/left-arrow.gif)";
    gArrowButtons[3].onclick = arrow_left_click;

    // Create the Sokoban object
    gSokobanObject = new Sokoban();
}

function body_onkeydown(ev) {

    //console.log("key");
    var keyCode, commandKey, move = true;
    
    if(gIgnoreKeyDown || gKeyDownWait) return;
    
    // Hide the arrows when a key is pressed
    if(gShowArrowButtons) {
	gShowArrowButtons = false;
	var i;
	for(i = 0; i < 4; ++i)
	    gArrowButtons[i].style.display = "none";
    }
    
    if(window.event) {
	keyCode = event.keyCode;
	commandKey = event.metaKey || event.ctrlKey;
    } else {
	// For FireFox
	keyCode = ev.which;
	commandKey = ev.metaKey || ev.ctrlKey;
    }
    
    var dx, dy;
    switch(keyCode) {
    case 37: // Left arrow
	dx = -1; dy =  0;
	break;
    case 38: // Up arrow
	dx =  0; dy = -1;
	break;
    case 39: // Right arrow
	dx =  1; dy =  0;
    break;
    case 40: // Down arrow
	dx =  0; dy =  1;
	break;

    case 8:  // Backspace
    case 85: // U
    case 90: // Z
	//gSokobanObject.undo();
	//move = false;
	break;
    case 27: // Escape
    case 82: // R
	//gSokobanObject.reset();
	//move = false;
	break;
    // XXX debug cheat!
    case 87: // W
	//gSokobanObject.win();
	//move = false;
	break;
    default:
	move = false;
	break;
    }
    if(move)
	gSokobanObject.move(dx, dy);

    // Work around a Safari bug where the onkeydown event fires twice
    gKeyDownWait = true;
    setTimeout("gKeyDownWait = false;", 10);
}

function reset_onclick() {
    gSokobanObject.reset();
}

function undo_onclick() {
    gSokobanObject.undo();
}

function prevPuzzle_onclick() {
    if(gSokobanObject.puzzleNumber > 1)
	   gSokobanObject.loadPuzzle(gSokobanObject.puzzleSet, parseInt(gSokobanObject.puzzleNumber) - 1);

    //data save
    //stageSave(gSokobanObject.puzzleSet);
    //puzzleSave(parseInt(gSokobanObject.puzzleNumber));
    //data save
}

function nextPuzzle_onclick() {
    if(gSokobanObject.puzzleNumber < gSokobanObject.puzzlesInCurrentSet())
	   gSokobanObject.loadPuzzle(gSokobanObject.puzzleSet, parseInt(gSokobanObject.puzzleNumber) + 1);

    //data save
    //stageSave(gSokobanObject.puzzleSet);
    //puzzleSave(parseInt(gSokobanObject.puzzleNumber));
    //data save
}

function infoButton_onclick() {
    if(window.widget) {
	var resizeW = (gWindowFrontW > 218)? gWindowFrontW : 218;
	var resizeH = (gWindowFrontH > 212)? gWindowFrontH : 212;
	window.resizeTo(resizeW, resizeH);
	widget.prepareForTransition("ToBack");
   }
    gFrontDiv.style.display = 'none';
    gBackDiv.style.display = 'block';
    
    //gPuzzleSetControl.value = gSokobanObject.puzzleSet;
    //gPuzzleNumberControl.value = gSokobanObject.puzzleNumber;
    updatePuzzleSetMetadataDisplay();
    
    if(window.widget) {
	   setTimeout('widget.performTransition(); window.resizeTo(218, 212);', 0);
    }

    set_stage_list();

    //set_stage_list();
}

function button_onmousedown() {
    set_button('inset');
}

function button_onmouseup() {
    set_button('outset');
}

function button_onmouseout() {
    set_button('outset');
}

function set_button(state) {
    if(window.event) {
	var element = event.srcElement;
	while(element.nodeType != 1) // 1 == ELEMENT_NODE
	    element = element.parentNode;
	element.style.borderStyle = state;
    }
}

function puzzleSetControl_onchange() {
    updatePuzzleSetMetadataDisplay();
    verifyPuzzleNumber();
}

function puzzleSetAuthor_onclick() {
    if(window.widget)
	widget.openURL(gPuzzleSetAuthorSpan.linkURL);
    else
	window.open(gPuzzleSetAuthorSpan.linkURL);
}

function puzzleNumberControl_onchange() {
    verifyPuzzleNumber();
}

function doneControl_onclick() {

    //alert( gPuzzleSetControl.value +"--"+parseInt(gPuzzleNumberControl.value, 10));

    //remove_stage_list();

    
    gFrontDiv.style.display = 'block';
    gBackDiv.style.display = 'none';

}

function set_stage_list(){

    var stage_list = document.getElementById('stage_list');
    
    var j;
    var i;
    var puzzle = "";

    stage_list.innerHTML="";


    //alert(gSokobanObject.puzzleSet + "-" + gSokobanObject.puzzleNumber);


    for(j=1; j<= 16; j++){

        var stage = document.createElement('div');
        stage.id = "stage";
        stage_list.appendChild(stage);
        puzzle = "";
        puzzle= "<div class='slabel'><p class='stext'>"+j+"</p></div>"; 


        for(i=1; i < gSokobanPuzzles[""+j+""].length-1; i++){ 

            if( j == gSokobanObject.puzzleSet && i == gSokobanObject.puzzleNumber){
                puzzle= puzzle + "<div class='pbox_active' id='pbox_active' ><p class='plabel' id='"+j+"-"+i+"'>"+ i +"</p></div>" ; 
            }else{
                puzzle= puzzle + "<div class='pbox'><p class='plabel' id='"+j+"-"+i+"'>"+ i +"</p></div>" ; 
            }
        }
        stage.innerHTML = puzzle;

    }

    stage_list.addEventListener("click", function(e) {

        var id = e.target.id.split('-');
        if(id[0]!=""){
            //alert(id[0]+"--"+id[1]);

            if(window.widget) {
                var resizeW = (gWindowFrontW > 218)? gWindowFrontW : 218;
                var resizeH = (gWindowFrontH > 218)? gWindowFrontH : 218;
                window.resizeTo(resizeW, resizeH);
                widget.prepareForTransition("ToFront");
            }

            gSokobanObject.loadPuzzle(id[0], id[1]);

            //data save
            //stageSave(id[0]);
            //puzzleSave(parseInt(id[1]));
            //data save

            gFrontDiv.style.display = 'block';
            gBackDiv.style.display = 'none';

            if(window.widget) {
                setTimeout('widget.performTransition(); window.resizeTo(gWindowFrontW, gWindowFrontH);', 0);
            }
        }
    });


    document.getElementById('pbox_active').tabIndex = -1;
    document.getElementById('pbox_active').focus();
    document.getElementById('pbox_active').blur();
}

function remove_stage_list(){
    var stage_list = document.getElementById('stage_list');
    //var childs = document.getElementById("stage");

    stage_list.innerHTML="";
}

function select_stage(){

    if(window.widget) {
        var resizeW = (gWindowFrontW > 218)? gWindowFrontW : 218;
        var resizeH = (gWindowFrontH > 218)? gWindowFrontH : 218;
        window.resizeTo(resizeW, resizeH);
        widget.prepareForTransition("ToFront");
    }

    //var newPuzzleSet = gPuzzleSetControl.value;
    //var newPuzzleNumber = parseInt(gPuzzleNumberControl.value, 10);
    //if((newPuzzleSet != gSokobanObject.puzzleSet) || (newPuzzleNumber != gSokobanObject.puzzleNumber))

    gSokobanObject.loadPuzzle("1", 2);

    gFrontDiv.style.display = 'block';
    gBackDiv.style.display = 'none';

    if(window.widget) {
        setTimeout('widget.performTransition(); window.resizeTo(gWindowFrontW, gWindowFrontH);', 0);
    }

}


function window_onfocus() {
    gShroudDiv.style.opacity = "1";
    //gStatusbarTextSpan.style.opacity = "1";
    // Work around a bug where absolute-positioned divs get incorrectly positioned when opacity changes
    if(window.widget || navigator.userAgent.match(/Safari/)) {
	   window.resizeBy(1,0);
	   window.resizeBy(-1,0);
    }
}

function window_onblur() {
    gShroudDiv.style.opacity = ".5";
    //gStatusbarTextSpan.style.opacity = ".5";
}

function front_onmousemove() {
    if(!gInfoButtonShown) {
	   gInfoButtonShown = true;
	if(gInfoButtonInterval) clearInterval(gInfoButtonInterval);
	   gInfoButtonInterval = setInterval("fadeInfoButton(+1);", 25);
    }
}

function front_onmouseout() {
    if(gInfoButtonShown) {
	   gInfoButtonShown = false;
	if(gInfoButtonInterval) clearInterval(gInfoButtonInterval);
	   gInfoButtonInterval = setInterval("fadeInfoButton(-1);", 25);
    }
}

function center_onmousemove() {
    var i;

    if(!gShowArrowButtons) {
	   gShowArrowButtons = true;
	   gSokobanObject.updateStatus();
    }
}

function center_onmouseout() {
    if(gShowArrowButtons) {
	gShowArrowButtons = false;
	var i;
	for(i = 0; i < 4; ++i)
	    gArrowButtons[i].style.display = "none";
    }
}

function arrow_up_click() {
    gSokobanObject.move(0, -1);
}

function arrow_down_click() {
    gSokobanObject.move(0, 1);
}

function arrow_left_click() {
    gSokobanObject.move(-1, 0);
}

function arrow_right_click() {
    gSokobanObject.move(1, 0);
}

function versionTag_onclick() {
    // Take the viewer home
    //if(window.widget) {
	//widget.openURL("http://pknet.com/~joe/sokoban.html");
    //} else {
	//window.open("http://pknet.com/~joe/sokoban.html");
    //}
}

function fadeInfoButton(direction) {
    if((direction < 0 && gInfoButtonImg.style.opacity <= 0)
	|| (direction > 0 && gInfoButtonImg.style.opacity >= .9)) {
	   clearInterval(gInfoButtonInterval);
	   gInfoButtonInterval = null;
	   return;
    }
    gInfoButtonImg.style.opacity = (parseFloat(gInfoButtonImg.style.opacity) || 0) + .0625*direction;
}

function updatePuzzleSetMetadataDisplay() {

    /*
    while(gPuzzleSetAuthorSpan.firstChild)
	gPuzzleSetAuthorSpan.removeChild(gPuzzleSetAuthorSpan.firstChild);
    //gPuzzleSetAuthorSpan.appendChild(document.createTextNode('"' + gPuzzleSetControl.value + '"'));
    gPuzzleSetAuthorSpan.appendChild(document.createElement("br"));
    //gPuzzleSetAuthorSpan.appendChild(document.createTextNode("puzzles © " + gSokobanPuzzles[gPuzzleSetControl.value][0].author));
    //gPuzzleSetAuthorSpan.linkURL = gSokobanPuzzles[gPuzzleSetControl.value][0].homepage;
    
    while(gPuzzleSetCountSpan.firstChild)
	gPuzzleSetCountSpan.removeChild(gPuzzleSetCountSpan.firstChild);
    //gPuzzleSetCountSpan.appendChild(document.createTextNode((gSokobanPuzzles[gPuzzleSetControl.value].length-2) + " puzzles"));
    */
}

function verifyPuzzleNumber() {
    //if(parseInt(gPuzzleNumberControl.value) > (gSokobanPuzzles[gPuzzleSetControl.value].length-2))
	//gPuzzleNumberControl.value = (gSokobanPuzzles[gPuzzleSetControl.value].length-2);
    //else if(parseInt(gPuzzleNumberControl.value) <= 0)
	//gPuzzleNumberControl.value = 1;
}

window.onfocus = window_onfocus;
window.onblur = window_onblur;

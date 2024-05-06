require("./Timer.js");
require("./Vector.js");
require("./Tile.js");
require("./Map.js");

var EASY = 0, MEDIUM = 1, HARD = 2, EXPERT = 3;

/* Tile */
var TILE = 16,
	DIM = 26,
	BAR = 1,
	RATIO = 0.05,
	MS_PER_S = 1000;
	
var BORDER_THICKNESS = 12;

var NUMBER_WIDTH = 13,
	NUMBER_HEIGHT = 23;

/* Scoreboard values */
var TILES_PER_SCORE_BOARD = 2;
var SCORE_BOARD_HEIGHT = TILES_PER_SCORE_BOARD*TILE;
var NUM_OFFSET = 4;

/* Face Values */
var FACE_DIM = 26,
	FACE_OFFSET = Math.floor((SCORE_BOARD_HEIGHT - FACE_DIM)/2);

/**
 * Starts the game
 */
function loadCanvas(id, level) {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	div = document.getElementById(id);
	
	ctx = canvas.getContext("2d");
	// add the canvas element to the body of the document
	document.body.appendChild(canvas);
	// sets an base font for bigger score display
	ctx.font = "15px Helvetica";
	
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};
	
	// intatiate game objects and starts the game loop
	init(level);
	draw();
	if (div.childNodes[0]) {
		div.removeChild(div.childNodes[0]);
	}
	div.appendChild(canvas);
	
	loop();
}

/**
 * Resets and inits game objects
 */
function init(level) {
	var ratio = 0.15, width = 9, height = 9;
	var flag_count = 10;
	switch (level) {
		case EASY:
			width = 9;
			height = 9;
			flag_count = 10;
			break;
		case MEDIUM:
			width = 16;
			height = 16;
			flag_count = 40;
			break;
		case HARD:
			width = 25;
			height = 25;
			flag_count = 99;
			//width = 16;
			//height = 30;
			break;
		case EXPERT:
			width = 40;
			height = 25;
			break;
	}
	grid.init(flag_count, width, height, flag_count);
	canvas.width = width*TILE + 2*BORDER_THICKNESS;
	canvas.height = height*TILE + 3*BORDER_THICKNESS + SCORE_BOARD_HEIGHT;
	
	timer.init();
	load_images();
	face_pressed = false;
	
	document.body.addEventListener("mousedown", canvasTouch);
	document.body.addEventListener("mousemove", canvasDrag);
	document.body.addEventListener("mouseup", canvasRelease);
}

/**
 * The game loop function, used for game updates and rendering
 */
function loop() {
	draw();
	// When ready to redraw the canvas call the loop function
	// first. Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}
	
/**
 * Loads all the images
 */
function load_images() {
	IMAGES = [];
	
	// Tile Images
	for (var i=0; i<TILE_IMAGES.length; i++) {
		IMAGES.push(document.getElementById(TILE_IMAGES[i]));
	}
	
	/* Border Images */
	for (var i=0; i<BORDER_IMAGES.length; i++) {
		IMAGES.push(document.getElementById(BORDER_IMAGES[i]));
	}
	
	/* Number Images */
	for (var i=0; i<10; i++) {
		IMAGES.push(document.getElementById(i));
	}
	
	/* Face Images */
	for (var i=0; i<FACE_IMAGES.length; i++) {
		IMAGES.push(document.getElementById(FACE_IMAGES[i]));
	}
}

/**
 * Handles Click events on the minesweeper canvas
 */
function canvasTouch(event) {
  var rect = canvas.getBoundingClientRect();		
	var x_offset = BORDER_THICKNESS;
	var y_offset = 2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT;
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
    
	if (event.button == 0 || event.button == 1) {
		if (isOnFace(x,y)) {				
			face_pressed = true;
		} else if (isOnBoard(x,y)) {
			board_pressed = true;
			grid.click(Math.floor((x-x_offset)/TILE), Math.floor((y-y_offset)/TILE));
		}
	}
	
	draw();
}

function canvasDrag(event) {
	var rect = canvas.getBoundingClientRect();		
	var x_offset = BORDER_THICKNESS;
	var y_offset = 2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT;
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
	
	if (isOnBoard(x,y) && board_pressed) {
		board_pressed = true;
		grid.click(Math.floor((x-x_offset)/TILE), Math.floor((y-y_offset)/TILE));
	}
	
	draw();
}

/**
 * Checks if (x,y) coordinates are on the face/reset button.
 */
function isOnFace(x, y) {
	var x_offset = (2*BORDER_THICKNESS+grid.width*TILE-FACE_DIM)/2;
	var y_offset = (BORDER_THICKNESS+FACE_OFFSET);
	return (x>=x_offset && x<x_offset+FACE_DIM && y>=y_offset && y<y_offset+FACE_DIM);
}

/**
 * Handles Click events on the minesweeper canvas
 */
function canvasRelease(event) {
  var rect = canvas.getBoundingClientRect();
	var x_offset = BORDER_THICKNESS;
	var y_offset = 2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT;
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

	if (event.button == 0 || event.button == 1) {
		if (isOnBoard(x,y) && !grid.is_loss() && !grid.is_win()) {				
			grid.sweep(Math.floor((x-x_offset)/TILE), Math.floor((y-y_offset)/TILE));
		} else if (face_pressed && isOnFace(x,y)) {
			grid.reset();
			timer.reset();
		}
	} else if (event.button == 2) {
		if (isOnBoard(x,y) && !grid.is_loss() && !grid.is_win()) {
			grid.flag(Math.floor((x-x_offset)/TILE), Math.floor((y-y_offset)/TILE));
		}
	}
	board_pressed = false;
	face_pressed = false;
	
	draw();
}

/**
 * Checks if (x,y) coordinates are on the board.
 */
function isOnBoard(x, y) {
	var x_offset = BORDER_THICKNESS;
	var y_offset = 2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT;
	return (x>=x_offset && x<x_offset+grid.width*TILE && y>=y_offset && y<y_offset+grid.height*TILE);
}

/**
 * Render entire game.
 */
function draw() {
	drawBorder();
	drawScoreBoard();
	drawBoard();
}

/**
 * Render the border to the game.
 */
function drawBorder() {
	// Horizontal Borders
	for (var x = 0; x < grid.width; x++) {
		var img = IMAGES[TILE_IMAGES.length];
		ctx.drawImage(img, BORDER_THICKNESS + x*TILE, 0, TILE, 
			BORDER_THICKNESS);
		ctx.drawImage(img, BORDER_THICKNESS + x*TILE, 
			BORDER_THICKNESS + SCORE_BOARD_HEIGHT, TILE, 
			BORDER_THICKNESS);
		ctx.drawImage(img, BORDER_THICKNESS + x*TILE, 
			2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT + grid.height*TILE, 
			TILE, BORDER_THICKNESS);
	}
	
	// Upper Vertical Borders
	for (var y = 0; y < TILES_PER_SCORE_BOARD; y++) {
		var img = IMAGES[TILE_IMAGES.length+1];
		ctx.drawImage(img, 0, BORDER_THICKNESS + y*TILE,
			BORDER_THICKNESS, TILE);
		ctx.drawImage(img, BORDER_THICKNESS + grid.width*TILE, 
			BORDER_THICKNESS + y*TILE,
			BORDER_THICKNESS, TILE);
	}
	
	// Lower Vertical Borders
	for (var y = 0; y < grid.height; y++) {
		var img = IMAGES[TILE_IMAGES.length+1];
		ctx.drawImage(img, 0, 2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT + y*TILE,
			BORDER_THICKNESS, TILE);
		ctx.drawImage(img, BORDER_THICKNESS + grid.width*TILE, 
			2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT + y*TILE,
			BORDER_THICKNESS, TILE);
	}
	
	// Corner Borders
	var img_id = TILE_IMAGES.length+2;
	ctx.drawImage(IMAGES[img_id++], 0, 0, BORDER_THICKNESS, BORDER_THICKNESS);
	ctx.drawImage(IMAGES[img_id++], BORDER_THICKNESS + grid.width*TILE, 
		0, BORDER_THICKNESS, BORDER_THICKNESS);
	ctx.drawImage(IMAGES[img_id++], BORDER_THICKNESS + grid.width*TILE, 
		2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT + grid.height*TILE, 
		BORDER_THICKNESS, BORDER_THICKNESS);
	ctx.drawImage(IMAGES[img_id++], 0, 
		2*BORDER_THICKNESS + SCORE_BOARD_HEIGHT + grid.height*TILE, 
		BORDER_THICKNESS, BORDER_THICKNESS);
	ctx.drawImage(IMAGES[img_id++], 0, BORDER_THICKNESS + SCORE_BOARD_HEIGHT, 
		BORDER_THICKNESS, BORDER_THICKNESS);
	ctx.drawImage(IMAGES[img_id++], BORDER_THICKNESS + grid.width*TILE, 
		BORDER_THICKNESS + SCORE_BOARD_HEIGHT, BORDER_THICKNESS, BORDER_THICKNESS);
}

/**
 * Render the Scoreboard.
 */
function drawScoreBoard() {
	// Count
	var img_id = TILE_IMAGES.length + BORDER_IMAGES.length;
	
	var hundreds = Math.floor((grid.flag_count%1000)/100);
	var tens = Math.floor((grid.flag_count%100)/10);
	var units = Math.floor((grid.flag_count%10)/1);
	
	ctx.drawImage(IMAGES[img_id+hundreds], BORDER_THICKNESS + NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
	ctx.drawImage(IMAGES[img_id+tens], BORDER_THICKNESS + NUMBER_WIDTH + NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
	ctx.drawImage(IMAGES[img_id+units], BORDER_THICKNESS + 2*NUMBER_WIDTH + NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
	
	// Time
	time = timer.get_time();
	var hundreds = Math.floor((time%1000)/100);
	var tens = Math.floor((time%100)/10);
	var units = Math.floor((time%10)/1);
	
	ctx.drawImage(IMAGES[img_id+hundreds], grid.width*TILE + BORDER_THICKNESS - 3*NUMBER_WIDTH - NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
	ctx.drawImage(IMAGES[img_id+tens], grid.width*TILE + BORDER_THICKNESS - 2*NUMBER_WIDTH - NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
	ctx.drawImage(IMAGES[img_id+units], grid.width*TILE + BORDER_THICKNESS - NUMBER_WIDTH - NUM_OFFSET, 
		BORDER_THICKNESS + NUM_OFFSET, NUMBER_WIDTH, NUMBER_HEIGHT);
		
	// Face / Reset Button
	img_id += 10;
	var x_offset = (2*BORDER_THICKNESS+grid.width*TILE-FACE_DIM)/2;
	var y_offset = (BORDER_THICKNESS+FACE_OFFSET);
	ctx.drawImage(getFaceImage(), x_offset, y_offset, FACE_DIM, FACE_DIM);
}

/**
 * Gets the image of the face.
 */
function getFaceImage() {
	var img_id = TILE_IMAGES.length + BORDER_IMAGES.length + 10;
	if (grid.is_win()) {
		if (!face_pressed) {
			return IMAGES[img_id];
		} else {
			return IMAGES[img_id+1];
		}
	} else if (grid.is_loss()) {
		if (!face_pressed) {
			return IMAGES[img_id+2];
		} else {
			return IMAGES[img_id+3];
		}
	} else if (board_pressed) {
		return IMAGES[img_id+4];
	} else {
		if (!face_pressed) {
			return IMAGES[img_id+5];
		} else {
			return IMAGES[img_id+6];
		}
	}
}

/**
 * Render the grid to the canvas.
 */
function drawBoard() {
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			var img = grid.get_image(x,y);
			ctx.drawImage(img, BORDER_THICKNESS + x*TILE, 
				SCORE_BOARD_HEIGHT + 2*BORDER_THICKNESS + y*TILE, 
				TILE, TILE);
		}
	}
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
	console.log("It worked");
}

console.log("It worked");
document.addEventListener('DOMContentLoaded', function () {
	
	document.getElementById("thisIsMyButton").onclick = myFunction;
	document.getElementById("level0").onclick = function() {loadCanvas("divGameStage", 0)};
	document.getElementById("level1").onclick = function() {loadCanvas("divGameStage", 1)};
	document.getElementById("level2").onclick = function() {loadCanvas("divGameStage", 2)};
	document.getElementById("level3").onclick = function() {loadCanvas("divGameStage", 3)};
	
	loadCanvas("divGameStage", 0)
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {

	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
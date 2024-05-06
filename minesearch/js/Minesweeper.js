
var EASY = 0, MEDIUM = 1, HARD = 2, EXPERT = 3, CUSTOM = 4;

/* Tile */
var TILE = () => { return 16 * parseFloat(localStorage["size"]) },
	DIM = 26,
	BAR = 1,
	RATIO = 0.05,
	MS_PER_S = 1000;

var BORDER_THICKNESS = () => { return 12 * parseFloat(localStorage["size"]) };

var NUMBER_WIDTH = () => 13 * parseFloat(localStorage["size"]),
	NUMBER_HEIGHT = () => 23 * parseFloat(localStorage["size"]);

/* Scoreboard values */
var TILES_PER_SCORE_BOARD = 2;
var SCORE_BOARD_HEIGHT = () => TILES_PER_SCORE_BOARD * TILE();
var NUM_OFFSET = 4;

/* Face Values */
var FACE_DIM = () => 26 * parseFloat(localStorage["size"]),
	FACE_OFFSET = () => Math.floor((SCORE_BOARD_HEIGHT() - FACE_DIM())/2);

/* Tile Values */
var EMPTY = 0,
	BOMB = -1;

/* Tile Visibilities */
var COVERED = 0,
	FLAGGED = 1,
	UNKNOWN = 2,
	VISIBLE = 3;

/* Win States */
var WIN = 1,
	LOSS = -1;

/* Surrounding Tile values to add */
var SUR_TILES = [[-1,-1],[0,-1],[1,-1],
				 [-1,0],		[1,0],
				 [-1,1], [0,1],	[1,1]];

/* Tile Images */
var TILE_IMAGES = ["empty_tile", "1_tile", "2_tile", "3_tile",
				   "4_tile", "5_tile", "6_tile", "7_tile",
				   "8_tile",  "mine_tile", "flag_tile",
				   "cover_tile", "tripped_mine_tile",
				   "incorrect_flag_tile", "unknown_tile"];

/* Border Images */
var BORDER_IMAGES = ["hor_border", "ver_border", "upper_left_corner",
					 "upper_right_corner", "bottom_right_corner",
					 "bottom_left_corner", "left_T_corner",
					 "right_T_corner"];

/* Face Images */
var FACE_IMAGES = ["cool_face", "pressed_cool_face",
				   "dead_face", "pressed_dead_face", "scared_face",
				   "happy_face", "pressed_happy_face"];

/* Stores all the image data */
var IMAGES = {};

/**
 * Game objects
 */
var canvas,	  /* HTMLCanvas */
	ctx,	  /* CanvasRenderingContext2d */
	frames,   /* number, used for animation */
	LEVEL = EASY,
	time,
	face_pressed = false,
	board_pressed,
	prev_grid,

/**
 * Timer datastructor, used for keeping track of the game's
 * time for highscores.
 *
 * @type {Object}
 */
timer = {
	_previous_time: null, /* previous time on timer */
	_start_time: null, /* Starting time */
	_is_paused: false, /* Is the timer paused */
	_is_stopped: false, /* Is the timer stopped */

	/**
	 * Initiate the timer.
	 */
	init: function() {
		this._start_time = 0;
		this._previous_time = 0;
		this._is_paused = true;
		this._is_stopped = true;
	},

	/**
	 * Resets the timer.
	 */
	reset: function() {
		this._start_time = 0;
		this._previous_time = 0;
		this._is_paused = true;
		this._is_stopped = false;
	},

	/**
	 * Starts the timer.
	 */
	start: function() {
		if (this._is_paused) {
			if (this._is_stopped) {
				this.reset();
			}
			this._is_paused = false;
			this._start_time = Date.now();
		}
	},

	/**
	 * Pauses the timer
	 */
	pause: function() {
		if (!this._is_paused) {
			this._is_paused = true;
			this._previous_time += Date.now() - this._start_time;
		}
	},

	/**
	 * Stops the timer.
	 */
	stop: function() {
		if (!this._is_stopped) {
			this.pause();
			this._is_stopped = true;
		}
	},

	/**
	 * Gets the time read on the timer.
	 */
	get_time: function() {
		if (this._start_time > 0) {
			if (!this._is_paused) {
				return (Date.now() - this._start_time) / MS_PER_S;
			} else {
				return this._previous_time / MS_PER_S;
			}
		} else {
			return 0;
		}
	}
}

/**
 * Grid datastructor, useful in games where the game world is
 * confined in absolute sized chunks of data or information.
 *
 * @type {Object}
 */
grid = {
	ratio: null,
	height: null, /* number, the number of columns */
	width: null, /* number, the number of rows */
	flag_count: null, /* number, the number of flags */
	_mines_set: null,
	_visible_count: null, /* number, the number of visible tiles */
	_MAX_VISIBLE_COUNT: null, /* number, the maximum number of visible tiles */
	_value_grid: null,  /* Array<Array<number>>, data representation */
	_visible_grid: null, /* Array<Array<number>>, data representation */
	_win_state: null,
	_tripped_mine_tiles: null,
	_history: null,

	/**
	 * Initiate and fill a grid with the
	 * @param  {float}    ratio     The percentage of mine tiles
	 * @param  {number}   width     number of columns
	 * @param  {number}   height    number of rows
	 */
	init: function(ratio, width, height, flag_count) {
		this.width = width;
		this.height = height;
		this.ratio = ratio;
		//this.flag_count = Math.floor((width*height)*ratio);
		this.flag_count = ratio;
		this._visible_count = 0;
		this._MAX_VISIBLE_COUNT = width*height - this.flag_count;
		this._value_grid = [];
		this._visible_grid = [];
		this._win_state = 0;
		this._tripped_mine_tiles = [];
		this._mines_set = false;
		this._hovered_tile = [-1,-1];
		this._history = [];

		prev_grid = [];

		// Builds empty boards
		for (var x=0; x < width; x++) {
			this._value_grid.push([]);
			this._visible_grid.push([]);
			prev_grid.push([]);
			for (var y=0; y < height; y++) {
				this._value_grid[x].push(EMPTY);
				this._visible_grid[x].push(COVERED);
				prev_grid[x].push("null");
			}
		}
	},

	rebuild: function(old_grid) {
		this.width = old_grid.width;
		this.height = old_grid.height;
		this.ratio = old_grid.ratio;
		this.flag_count = old_grid.flag_count;
		this._visible_count = old_grid._visible_count;
		this._MAX_VISIBLE_COUNT = old_grid._MAX_VISIBLE_COUNT;
		this._value_grid = old_grid._value_grid;
		this._visible_grid = old_grid._visible_grid;
		this._win_state = old_grid._win_state;
		this._tripped_mine_tiles = old_grid._tripped_mine_tiles;
		this._mines_set = old_grid._mines_set;
		this._hovered_tile = old_grid._hovered_tile;
		this._history = old_grid._history;
	},

	/**
	 * Builds the board around the initial point (init_x, init_y).
	 */
	build_board: function(init_x, init_y) {
		timer.start();

		// Sets all the bombs
		for (var i=0; i < this.flag_count; i++) {
			var x = Math.floor(Math.random()*this.width),
				y = Math.floor(Math.random()*this.height);
			while (this.get(x,y) == BOMB || (localStorage["opening-move"] == "true" ? this.is_n_away(1, init_x, init_y, x, y) : (x == init_x && y == init_y))) {
				x = Math.floor(Math.random()*this.width);
				y = Math.floor(Math.random()*this.height);
			}
			this.set(BOMB, x, y);
		}

		// Sets all the bomb counts
		for (var x=0; x < this.width; x++) {
			for (var y=0; y < this.height; y++) {
				this.set_bomb_count(x,y);
			}
		}

		this._mines_set = true;
		// console.log("The board has been built");
	},

	/**
	 * Checks if the two points are within n distance of eachother.
	 */
	is_n_away: function(n, x1, y1, x2, y2) {
		return (Math.abs(x2 - x1) <= n && Math.abs(y2 - y1) <= n);
	},

	/**
	 * Resets the board
	 */
	reset: function() {
		this.init(this.ratio, this.width, this.height);
		this._mines_set = false;
	},

	/**
	 * Sets the number of bombs surrounding a single tile
	 *
	 * @param {number} x    the x-coordinate
	 * @param {number} y    the y-coordinate
	 */
	set_bomb_count: function(x, y) {
		if (this.get(x,y) != BOMB) {
			var val = this.get_bomb_count(x,y);
			this.set(val,x,y);
		}
	},

	/**
	 * Gets the number of bombs surrounding a single tile
	 *
	 * @param {number} x    the x-coordinate
	 * @param {number} y    the y-coordinate
	 */
	get_bomb_count: function(x, y) {
		var count = 0;
		for (var i = 0; i<SUR_TILES.length; i++) {
			count += (this.get(x+SUR_TILES[i][0],y+SUR_TILES[i][1]) == BOMB);
		}
		return count;
	},

	/**
	 * Gets the number of flags surrounding a single tile
	 *
	 * @param {number} x    the x-coordinate
	 * @param {number} y    the y-coordinate
	 */
	get_flag_count: function(x, y) {
		var count = 0;
		for (var i = 0; i<SUR_TILES.length; i++) {
			count += (this.get_visibility(x+SUR_TILES[i][0],y+SUR_TILES[i][1]) == FLAGGED);
		}
		return count;
	},

	/**
	 * Set the value of the grid cell at (x, y)
	 *
	 * @param {any}    val what to set
	 * @param {number} x   the x-coordinate
	 * @param {number} y   the y-coordinate
	 */
	set: function(val, x, y) {
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
	    this._value_grid[x][y] = val;
    }
	},

	/**
	 * Get the value of the cell at (x, y)
	 *
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 * @return {any}   the value at the cell
	 */
	get: function(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    	return this._value_grid[x][y];
    } else {
      return EMPTY;
    }
	},

	/**
	 * Set the visibility of the grid cell at (x, y)
	 *
	 * @param {any}    val what to set
	 * @param {number} x   the x-coordinate
	 * @param {number} y   the y-coordinate
	 */
	set_visibility: function(val, x, y) {
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    	this._visible_grid[x][y] = val;
    }
	},

	/**
	 * Get the visibility of the cell at (x, y)
	 *
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 * @return {any}   the visibility at the cell
	 */
	get_visibility: function(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    return this._visible_grid[x][y];
    } else {
        return null;
    }
	},

	/**
	 * Flags the tile at the given coordinate (x,y)
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 */
	flag: function(x,y) {
		if (this._mines_set) {
			if (this.get_visibility(x,y) == COVERED) {
				this.set_visibility(FLAGGED,x,y);
				this.flag_count--;
			} else if (this.get_visibility(x,y) == FLAGGED) {
				this.set_visibility(localStorage["marks-?"] == "true" ? UNKNOWN : COVERED, x, y);
				this.flag_count++;
			} else if (this.get_visibility(x,y) == UNKNOWN) {
				this.set_visibility(COVERED,x,y);
			}
		}
	},

	click: function(x, y) {
		if (!this.is_win() && !this.is_loss())
			this._hovered_tile = [x, y];
	},

	release: function() {
		this._hovered_tile = [-1, -1];
	},

	/**
	 * Reveals the value hidden in a covered tile
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 */
	sweep: function(x, y) {
		this._hovered_tile = [-1, -1];
		if (!this._mines_set) {
			this.build_board(x, y);
		}
		if (this.get_visibility(x,y) == COVERED ||
			this.get_visibility(x,y) == UNKNOWN) {
			this.set_visibility(VISIBLE,x,y);
			this._visible_count++;
			if (this.get(x, y) == BOMB) {
				this.lose(x, y);
			} else if (this.get(x, y) == EMPTY) {
				for (var i = 0; i<SUR_TILES.length; i++) {
					this.sweep(x+SUR_TILES[i][0],y+SUR_TILES[i][1]);
				}
			}
		} else if (localStorage["area-open"] == "true" &&
					 this.get_visibility(x, y) == VISIBLE &&
				   this.get(x, y) != EMPTY &&
				   this.get(x, y) <= this.get_flag_count(x, y)) {
			for (var i = 0; i<SUR_TILES.length; i++) {
				var xx = x+SUR_TILES[i][0], yy = y+SUR_TILES[i][1];
				if (this.get_visibility(xx,yy) == COVERED ||
					this.get_visibility(xx,yy) == UNKNOWN) {
					this.sweep(xx, yy);
				}
			}
		}
		if (this._visible_count == this._MAX_VISIBLE_COUNT && this._win_state != LOSS) {
			this.win();
		}
	},

	sweepRemaining() {
		timer.stop();

		for (var x=0; x < this.width; x++) {
			for (var y=0; y < this.height; y++) {
				if (this.get_visibility(x,y) == COVERED ||
					this.get_visibility(x,y) == UNKNOWN) {
					this.set_visibility(VISIBLE,x,y);
					this._visible_count++;
					if (this.get(x, y) == BOMB) {
						this._tripped_mine_tiles.push([x,y]);
					}
				}
			}
		}
		if (this._tripped_mine_tiles.length == 0) {
			this.win();
		} else {
			this._win_state = LOSS;
		}
	},

	/**
	 * Reveals the whole board because a loss has occured
	 */
	lose: function(x, y) {
		timer.stop();
		this._tripped_mine_tiles.push([x,y]);

		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				if (this.get(i,j) == BOMB && (this.get_visibility(i,j) == COVERED ||
					this.get_visibility(i,j) == UNKNOWN)) {
					this.set_visibility(VISIBLE,i,j);
				}
			}
		}
		this._win_state = LOSS;
	},

	/**
	 * Checks is the game is a loss
	 * @return {boolean} Is the board a loss
	 */
	is_loss: function() {
		return this._win_state == LOSS;
	},

	/**
	 * Flags all mines because a win has occured
	 */
	win: function() {
		if (this._win_state != WIN) {
			timer.stop();
			for (var i = 0; i < this.width; i++) {
				for (var j = 0; j < this.height; j++) {
					if (this.get(i,j) == BOMB && this.get_visibility(i,j) != FLAGGED) {
						this.set_visibility(FLAGGED,i,j);
						this.flag_count--;
					}
				}
			}
			this._win_state = WIN;

			if (localStorage["level"] !== CUSTOM && localStorage[localStorage["level"]] >= timer.get_time()) {
				localStorage[localStorage["level"]] = timer.get_time();
			}
		}
	},

	/**
	 * Checks is the game is a win
	 * @return {boolean} Is the board a win
	 */
	is_win: function() {
		return this._win_state == WIN;
	},

	/**
	 * Get the image file of the cell at (x, y)
	 *
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 * @return {image}   the image file at the cell
	 */
	get_image: function(x, y) {
		var img = "cover_tile" + dark();
		if (!this._mines_set) {
			if (x == this._hovered_tile[0] && y == this._hovered_tile[1])
				img = "empty_tile" + dark();
			else
				img = "cover_tile" + dark();
		} else {
			switch (this.get_visibility(x,y)) {
				case COVERED:
					if (x == this._hovered_tile[0] && y == this._hovered_tile[1])
						img = "empty_tile" + dark();
					else
						img = "cover_tile" + dark();
					break;
				case FLAGGED:
					if (this.is_loss() && this.get(x,y) != BOMB) {
						img = "incorrect_flag_tile" + dark();
					} else {
						img = "flag_tile" + dark();
					}
					break;
				case UNKNOWN:
					img = "unknown_tile" + dark();
					break;
				default:
					switch (this.get(x,y)) {
						case BOMB:
							if (this.is_tripped(x,y)) {
								img = "tripped_mine_tile" + dark();
							} else {
								img = "mine_tile" + dark();
							}
							break;
						default:
							if (this.get(x,y) == 0) {
								img = "empty_tile" + dark();
							} else {
								img = "" + this.get(x,y) + "_tile" + dark();
							}
							break;
					}
					break;
			}
		}
		var image = IMAGES[img];
		if (image == undefined || image == null) {
			throw img + " is undefined";
		}
		return image;
	},

	is_tripped(x, y) {
		for (var i = 0; i < this._tripped_mine_tiles.length; i++) {
			if (this._tripped_mine_tiles[i][0] == x && this._tripped_mine_tiles[i][1] == y) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Gets the string representation of the grid
	 */
	print: function() {
		var str = "";
		for (var y=0; y<this.width; y++) {
			for (var x=0; x<this.height; x++) {
				str += this.get(x,y);
				if (x != this.width-1) {
					str += ",";
				} else {
					console.log(str);
					str = "";
				}
			}
		}
	}
}

/**
 * Starts the game
 */
function loadCanvas(id, level) {
	// create and initiate the canvas element
	canvas = document.createElement("canvas");
	div = document.getElementById(id);
	
	document.oncontextmenu = (e) => {
		e.preventDefault();
	}

	if (level == "undefined" || level == "null") {
		level = EASY;
	}
	localStorage["level"] = level;

	ctx = canvas.getContext("2d");
	// add the canvas element to the body of the document
	document.body.appendChild(canvas);
	// sets an base font for bigger score display
	ctx.font = "15px Helvetica";

	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};

	// intatiate game objects and starts the game loop
	initLevel(level);
	if (div.childNodes[0]) {
		div.removeChild(div.childNodes[0]);
	}
	div.appendChild(canvas);

	init_draw();
}

/**
 * Resets and inits game objects
 */
function initLevel(level) {
	init_canvas(level);

	document.body.addEventListener("mousedown", canvasTouch);
	document.body.addEventListener("mousemove", canvasDrag);
	document.body.addEventListener("mouseup", canvasRelease);

	timer.init();

	load_images();
}

function init_canvas(level) {
	var ratio = 0.15, width = 9, height = 9;
	var flag_count = 10;
	switch (level) {
		case EASY:
			width = 9;
			height = 9;
			localStorage["size"] = 1.25;
			flag_count = 10;
			break;
		case MEDIUM:
			width = 16;
			height = 16;
			localStorage["size"] = 1.0;
			flag_count = 40;
			break;
		case HARD:
			width = 25;
			height = 25;
			localStorage["size"] = 0.85;
			flag_count = 99;
			break;
		case EXPERT:
			width = 40;
			height = 25;
			break;
		case CUSTOM:
			var dim = JSON.parse(localStorage["custom"]);
			width = dim.width;
			height = dim.height;
			ratio = dim.ratio
			break;
	}
	grid.init(flag_count, width, height, flag_count);
	canvas.width = width*TILE() + 2*BORDER_THICKNESS();
	canvas.height = height*TILE() + 3*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT();
}

function set_canvas(level) {
	var ratio = 0.15, width = 9, height = 9;
	switch (level) {
		case EASY:
			width = 9;
			height = 9;
			localStorage["size"] = 1.25;
			break;
		case MEDIUM:
			width = 16;
			height = 16;
			localStorage["size"] = 1.0;
			break;
		case HARD:
			width = 25;
			height = 25;
			localStorage["size"] = 0.85;
			break;
		case EXPERT:
			width = 40;
			height = 25;
			break;
		case CUSTOM:
			var dim = JSON.parse(localStorage["custom"]);
			width = dim.width;
			height = dim.height;
			ratio = dim.ratio
			break;
	}
	canvas.setAttribute("width", width*TILE() + 2*BORDER_THICKNESS());
	canvas.setAttribute("height", height*TILE() + 3*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT());
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
		// IMAGES.push(document.getElementById(TILE_IMAGES[i]));
		IMAGES[TILE_IMAGES[i]] = document.getElementById(TILE_IMAGES[i]);
		IMAGES[TILE_IMAGES[i] + "_dark"] = document.getElementById(TILE_IMAGES[i] + "_dark");
	}

	/* Border Images */
	for (var i=0; i<BORDER_IMAGES.length; i++) {
		// IMAGES.push(document.getElementById(BORDER_IMAGES[i]));
		IMAGES[BORDER_IMAGES[i]] = document.getElementById(BORDER_IMAGES[i]);
		IMAGES[BORDER_IMAGES[i] + "_dark"] = document.getElementById(BORDER_IMAGES[i] + "_dark");
	}

	/* Number Images */
	for (var i=0; i<10; i++) {
		// IMAGES.push(document.getElementById(i));
		IMAGES[i] = document.getElementById(i);
	}
	// IMAGES.push(document.getElementById("-"));
	// IMAGES.push(document.getElementById("empty"));
	// IMAGES.push(document.getElementById("blue_0"));
	// IMAGES.push(document.getElementById("blue_empty"));
	IMAGES["-"] = document.getElementById("-");
	IMAGES["empty"] = document.getElementById("empty");
	IMAGES["blue_0"] = document.getElementById("blue_0");
	IMAGES["blue_empty"] = document.getElementById("blue_empty");

	/* Face Images */
	for (var i=0; i<FACE_IMAGES.length; i++) {
		// IMAGES.push(document.getElementById(FACE_IMAGES[i]));
		IMAGES[FACE_IMAGES[i]] = document.getElementById(FACE_IMAGES[i]);
		IMAGES[FACE_IMAGES[i] + "_dark"] = document.getElementById(FACE_IMAGES[i] + "_dark");
	}

	init_draw();
}

function init_draw() {
	var complete = true;
	
	for (var img in IMAGES) {
		if (!IMAGES[img].complete) {
			complete = false;
		}
	}

	if (!complete) {
		setTimeout(init_draw, 50);
	} else {
		ctx.fillStyle = localStorage["dark"] == "true" ? "#787878" : '#C0C0C0';
		ctx.fillRect(0, 0, 2*BORDER_THICKNESS() + grid.width*TILE(), 3*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + grid.height*TILE());
		drawBorder();
		drawBoard(true);
		loop();
	}
}

/**
 * Save Board and Timer
 */
function saveState() {
	localStorage["grid"] = JSON.stringify({
		width: grid.width,
		height: grid.height,
		ratio: grid.ratio,
		flag_count: grid.flag_count,
		_visible_count: grid._visible_count,
		_MAX_VISIBLE_COUNT: grid._MAX_VISIBLE_COUNT,
		_value_grid: grid._value_grid,
		_visible_grid: grid._visible_grid,
		_win_state: grid._win_state,
		_tripped_mine_tiles: grid._tripped_mine_tiles,
		_mines_set: grid._mines_set,
		_hovered_tile: grid._hovered_tile,
		_history: grid._history
	});
	localStorage["timer"] = JSON.stringify({
		_previous_time: timer._previous_time, 
		_start_time: timer._start_time, 
		_is_paused: timer._is_paused, 
		_is_stopped: timer._is_stopped
	});
	localStorage["prev_grid"] = JSON.stringify(prev_grid);
}

/**
 * Handles Click events on the minesweeper canvas
 */
function canvasTouch(event) {
	if (!is_dropdown_open() && !is_modal_open()) {
	  	var rect = canvas.getBoundingClientRect();
		var x_offset = BORDER_THICKNESS();
		var y_offset = 2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		if (event.button == 0 || event.button == 1) {
			if (isOnFace(x,y)) {
				face_pressed = true;
			} else if (isOnBoard(x,y)) {
				board_pressed = true;
				grid.click(Math.floor((x-x_offset)/TILE()), Math.floor((y-y_offset)/TILE()));
			}
		}

		saveState();
		draw();
	}
}

function canvasDrag(event) {
	if (!is_dropdown_open() && !is_modal_open()) {
		var rect = canvas.getBoundingClientRect();
		var x_offset = BORDER_THICKNESS();
		var y_offset = 2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		if (isOnBoard(x,y) && board_pressed) {
			board_pressed = true;
			grid.click(Math.floor((x-x_offset)/TILE()), Math.floor((y-y_offset)/TILE()));
		}

		saveState();
		draw();
	}
}

/**
 * Checks if (x,y) coordinates are on the face/reset button.
 */
function isOnFace(x, y) {
	var x_offset = (2*BORDER_THICKNESS()+grid.width*TILE()-FACE_DIM())/2;
	var y_offset = (BORDER_THICKNESS()+FACE_OFFSET());
	return (x>=x_offset && x<x_offset+FACE_DIM() && y>=y_offset && y<y_offset+FACE_DIM());
}

function isOnFlagCount(x, y) {
	var x_offset = BORDER_THICKNESS() + NUM_OFFSET;
	var y_offset = BORDER_THICKNESS() + NUM_OFFSET;
	return (x>=x_offset && x<x_offset+3*NUMBER_WIDTH() && y>=y_offset && y<y_offset+NUMBER_HEIGHT());
}

/**
 * Handles Click events on the minesweeper canvas
 */
function canvasRelease(event) {
	if (!is_dropdown_open() && !is_modal_open()) {
		var rect = canvas.getBoundingClientRect();
		var x_offset = BORDER_THICKNESS();
		var y_offset = 2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		if (event.button == 0 || event.button == 1) {
			if (isOnBoard(x,y) && !grid.is_loss() && !grid.is_win()) {
				//_gaq.push(['_trackEvent', 'grid-clicked', 'clicked']);
				grid.sweep(Math.floor((x-x_offset)/TILE()), Math.floor((y-y_offset)/TILE()));
			} else if (face_pressed && isOnFace(x,y)) {
				//_gaq.push(['_trackEvent', 'face-clicked', 'clicked']);
				grid.reset();
				timer.reset();
			} else if (isOnFlagCount(x, y) && grid.flag_count == 0 && localStorage["open-remaining"] === "true") {
				//_gaq.push(['_trackEvent', 'flag-count-clicked', 'clicked']);
				grid.sweepRemaining();
			}
		} else if (event.button == 2) {
			if (isOnBoard(x,y) && !grid.is_loss() && !grid.is_win()) {
				//gaq.push(['_trackEvent', 'grid-flagged', 'clicked']);
				grid.flag(Math.floor((x-x_offset)/TILE()), Math.floor((y-y_offset)/TILE()));
			}
		}
		grid.release();
		board_pressed = false;
		face_pressed = false;

		saveState();
		draw();
	}
}

/**
 * Checks if (x,y) coordinates are on the board.
 */
function isOnBoard(x, y) {
	var x_offset = BORDER_THICKNESS();
	var y_offset = 2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT();
	return (x>=x_offset && x<x_offset+grid.width*TILE() && y>=y_offset && y<y_offset+grid.height*TILE());
}

/**
 * Render entire game.
 */
function draw() {
	drawScoreBoard();
	drawBoard();
}

function dark() {
	return localStorage["dark"] == "true" ? "_dark" : "";
}

/**
 * Render the border to the game.
 */
function drawBorder() {
	// Horizontal Borders
	for (var img in BORDER_IMAGES) {
		if (!IMAGES[img].complete) {
			console.log("Incomplete - " + img);
		}
	}
	var img = IMAGES["hor_border" + dark()];
	for (var x = 0; x < grid.width; x++) {
		ctx.drawImage(img, BORDER_THICKNESS() + x*TILE(), 0, TILE(),
			BORDER_THICKNESS());
		ctx.drawImage(img, BORDER_THICKNESS() + x*TILE(),
			BORDER_THICKNESS() + SCORE_BOARD_HEIGHT(), TILE(),
			BORDER_THICKNESS());
		ctx.drawImage(img, BORDER_THICKNESS() + x*TILE(),
			2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + grid.height*TILE(),
			TILE(), BORDER_THICKNESS());
	}

	// Upper Vertical Borders
	img = IMAGES["ver_border" + dark()];
	for (var y = 0; y < TILES_PER_SCORE_BOARD; y++) {
		ctx.drawImage(img, 0, BORDER_THICKNESS() + y*TILE(),
			BORDER_THICKNESS(), TILE());
		ctx.drawImage(img, BORDER_THICKNESS() + grid.width*TILE(),
			BORDER_THICKNESS() + y*TILE(),
			BORDER_THICKNESS(), TILE());
	}

	// Lower Vertical Borders
	for (var y = 0; y < grid.height; y++) {
		ctx.drawImage(img, 0, 2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + y*TILE(),
			BORDER_THICKNESS(), TILE());
		ctx.drawImage(img, BORDER_THICKNESS() + grid.width*TILE(),
			2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + y*TILE(),
			BORDER_THICKNESS(), TILE());
	}

	// Corner Borders
	ctx.drawImage(IMAGES["upper_left_corner" + dark()], 0, 0, BORDER_THICKNESS(), BORDER_THICKNESS());
	ctx.drawImage(IMAGES["upper_right_corner" + dark()], BORDER_THICKNESS() + grid.width*TILE(),
		0, BORDER_THICKNESS(), BORDER_THICKNESS());
	ctx.drawImage(IMAGES["bottom_right_corner" + dark()], BORDER_THICKNESS() + grid.width*TILE(),
		2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + grid.height*TILE(),
		BORDER_THICKNESS(), BORDER_THICKNESS());
	ctx.drawImage(IMAGES["bottom_left_corner" + dark()], 0,
		2*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + grid.height*TILE(),
		BORDER_THICKNESS(), BORDER_THICKNESS());
	ctx.drawImage(IMAGES["left_T_corner" + dark()], 0, BORDER_THICKNESS() + SCORE_BOARD_HEIGHT(),
		BORDER_THICKNESS(), BORDER_THICKNESS());
	ctx.drawImage(IMAGES["right_T_corner" + dark()], BORDER_THICKNESS() + grid.width*TILE(),
		BORDER_THICKNESS() + SCORE_BOARD_HEIGHT(), BORDER_THICKNESS(), BORDER_THICKNESS());
}

/**
 * Render the Scoreboard.
 */
function drawScoreBoard() {
	var hundreds, tens, units;

	if (grid.flag_count >= 100) {
		hundreds = Math.floor((grid.flag_count%1000)/100);
		tens = Math.floor((grid.flag_count%100)/10);
		units = Math.floor((grid.flag_count%10)/1);

		ctx.drawImage(IMAGES[hundreds], BORDER_THICKNESS() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[tens], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[units], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	} else if (grid.flag_count >= 10) {
		tens = Math.floor((grid.flag_count%100)/10);
		units = Math.floor((grid.flag_count%10)/1);

		ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[tens], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[units], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	} else if (grid.flag_count > 0) {
		units = Math.floor((grid.flag_count%10)/1);

		ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[units], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	} else if (grid.flag_count == 0) {
		if (!grid.is_loss() && !grid.is_win() && localStorage["open-remaining"] === "true") {
			ctx.drawImage(IMAGES["blue_empty"], BORDER_THICKNESS() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES["blue_empty"], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES["blue_0"], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		} else {
			ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[0], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		}
	} else if (grid.flag_count > -10) {
		units = Math.abs(Math.floor((grid.flag_count%10)/1));

		ctx.drawImage(IMAGES["empty"], BORDER_THICKNESS() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES["-"], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[units], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	} else {
		tens = Math.abs(Math.floor((grid.flag_count%100)/10));
		units = Math.abs(Math.floor((grid.flag_count%10)/1));

		ctx.drawImage(IMAGES["-"], BORDER_THICKNESS() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[tens], BORDER_THICKNESS() + NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		ctx.drawImage(IMAGES[units], BORDER_THICKNESS() + 2*NUMBER_WIDTH() + NUM_OFFSET,
			BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		}

	// Time
	time = timer.get_time();
	hundreds = Math.floor((time%1000)/100);
	tens = Math.floor((time%100)/10);
	units = Math.floor((time%10)/1);

	ctx.drawImage(IMAGES[hundreds], grid.width*TILE() + BORDER_THICKNESS() - 3*NUMBER_WIDTH() - NUM_OFFSET,
		BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	ctx.drawImage(IMAGES[tens], grid.width*TILE() + BORDER_THICKNESS() - 2*NUMBER_WIDTH() - NUM_OFFSET,
		BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
	ctx.drawImage(IMAGES[units], grid.width*TILE() + BORDER_THICKNESS() - NUMBER_WIDTH() - NUM_OFFSET,
		BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());

		if (time >= 100) {
			hundreds = Math.floor((time%1000)/100);
			tens = Math.floor((time%100)/10);
			units = Math.floor((time%10)/1);

			ctx.drawImage(IMAGES[hundreds], grid.width*TILE() + BORDER_THICKNESS() - 3*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[tens], grid.width*TILE() + BORDER_THICKNESS() - 2*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[units], grid.width*TILE() + BORDER_THICKNESS() - NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		} else if (time >= 10) {
			tens = Math.floor((time%100)/10);
			units = Math.floor((time%10)/1);

			ctx.drawImage(IMAGES["empty"], grid.width*TILE() + BORDER_THICKNESS() - 3*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[tens], grid.width*TILE() + BORDER_THICKNESS() - 2*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[units], grid.width*TILE() + BORDER_THICKNESS() - NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		} else if (time >= 0) {
			units = Math.floor((time%10)/1);

			ctx.drawImage(IMAGES["empty"], grid.width*TILE() + BORDER_THICKNESS() - 3*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES["empty"], grid.width*TILE() + BORDER_THICKNESS() - 2*NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
			ctx.drawImage(IMAGES[units], grid.width*TILE() + BORDER_THICKNESS() - NUMBER_WIDTH() - NUM_OFFSET,
				BORDER_THICKNESS() + NUM_OFFSET, NUMBER_WIDTH(), NUMBER_HEIGHT());
		}

	// Face / Reset Button
	var x_offset = (2*BORDER_THICKNESS()+grid.width*TILE()-FACE_DIM())/2;
	var y_offset = (BORDER_THICKNESS()+FACE_OFFSET());
	ctx.drawImage(getFaceImage(), x_offset, y_offset, FACE_DIM(), FACE_DIM());
}

/**
 * Gets the image of the face.
 */
function getFaceImage() {
	if (grid.is_win()) {
		if (!face_pressed) {
			return IMAGES["cool_face" + dark()];
		} else {
			return IMAGES["pressed_cool_face" + dark()];
		}
	} else if (grid.is_loss()) {
		if (!face_pressed) {
			return IMAGES["dead_face" + dark()];
		} else {
			return IMAGES["pressed_dead_face" + dark()];
		}
	} else if (board_pressed) {
		return IMAGES["scared_face" + dark()];
	} else {
		if (!face_pressed) {
			return IMAGES["happy_face" + dark()];
		} else {
			return IMAGES["pressed_happy_face" + dark()];
		}
	}
}

/**
 * Render the grid to the canvas.
 */
function drawBoard(overwrite = false) {
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			var img = grid.get_image(x,y);
			if (overwrite || img !== prev_grid[x][y]) {
				prev_grid[x][y] = img;
				ctx.drawImage(img, BORDER_THICKNESS() + x*TILE(),
					SCORE_BOARD_HEIGHT() + 2*BORDER_THICKNESS() + y*TILE(),
					TILE(), TILE());
			}
		}
	}
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleLevelDropdown() {
  document.getElementById("levelDropdown").classList.toggle("show");
	//document.getElementById("settingsDropdown").classList.remove("show");
}

function toggleSettingsDropdown() {
  document.getElementById("settingsDropdown").classList.toggle("show");
	document.getElementById("levelDropdown").classList.remove("show");
}

document.addEventListener('DOMContentLoaded', function () {

	// Initialize local storage
	/*
	if (!localStorage[EASY]) {
		localStorage[EASY] = 999;
	}
	if (!localStorage[MEDIUM]) {
		localStorage[MEDIUM] = 999;
	}
	if (!localStorage[HARD]) {
		localStorage[HARD] = 999;
	}
	if (!localStorage[EXPERT]) {
		localStorage[EXPERT] = 999;
	}
	*/
	if (localStorage["opening-move"] == undefined) {
		localStorage["opening-move"] = true;
	}
	if (localStorage["marks-?"] == undefined) {
		localStorage["marks-?"] = true;
	}
	if (localStorage["area-open"] == undefined) {
		localStorage["area-open"] = true;
	}
	if (localStorage["open-remaining"] == undefined) {
		localStorage["open-remaining"] = true;
	}
	if (localStorage["dark"] == undefined) {
		localStorage["dark"] = false;
	}
	if (localStorage["size"] == undefined) {
		localStorage["size"] = 1;
	}
	if (localStorage["custom"] == undefined) {
		localStorage["custom"] = JSON.stringify({height: 15, width: 15, ratio: 0.2});
	}

	// Set onclick listeners
	document.getElementById("levelDropdownButton").onclick = function(e) { /*_gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ toggleLevelDropdown(); };
	document.getElementById("settingsDropdownButton").onclick = function(e) { /*_gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ toggleSettingsDropdown(); };
	//document.getElementById("new").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ loadCanvas("divGameStage", LEVEL); };
	document.getElementById("easy").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ loadCanvas("divGameStage", EASY); };
	document.getElementById("medium").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ loadCanvas("divGameStage", MEDIUM); };
	document.getElementById("hard").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ loadCanvas("divGameStage", HARD); };
	//document.getElementById("expert").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ loadCanvas("divGameStage", EXPERT); };
	//document.getElementById("custom").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ custom(); };
	//document.getElementById("control").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ controls(); };
	document.getElementById("display").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ display(); };
	document.getElementById("opening-move").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveControlSettings(); };
	document.getElementById("marks-?").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveControlSettings(); };
	document.getElementById("area-open").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveControlSettings(); };
	document.getElementById("open-remaining").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveControlSettings(); };
	//document.getElementById("size").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveDisplaySettings(); };
	document.getElementById("light-theme").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveDisplaySettings(); };
	document.getElementById("dark-theme").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ saveDisplaySettings(); };
	document.getElementById("customLevelSubmit").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ submitCustom(); };
	//document.getElementById("highscores").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ highscores(); };
	document.getElementById("clearScores").onclick = function(e) { /*__gaq.push(['_trackEvent', e.target.id, 'clicked']);*/ clearScores(); };

	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		var modal = document.getElementById('highscores-modal');
	  	modal.style.display = "none";
	}

	var span = document.getElementsByClassName("close")[1];
	span.onclick = function() {
		var modal = document.getElementById('custom-modal');
	  	modal.style.display = "none";
	}

	var span = document.getElementsByClassName("close")[2];
	span.onclick = function() {
		var modal = document.getElementById('controls-modal');
	  	modal.style.display = "none";
	}

	var span = document.getElementsByClassName("close")[3];
	span.onclick = function() {
		var modal = document.getElementById('display-modal');
	  	modal.style.display = "none";
	}

	loadCanvas("divGameStage", localStorage["level"] || EASY);

	if (localStorage["prev_grid"] != undefined && localStorage["prev_grid"] != null) {
		prev_grid = JSON.parse(localStorage["prev_grid"]);
	}
	if (localStorage["grid"] != undefined && localStorage["grid"] != null) {
		var temp = JSON.parse(localStorage["grid"]);
		grid.rebuild(temp);
		
		// console.log(localStorage["level"]);
		set_canvas(parseInt(localStorage["level"]));
		init_draw();
	}
	if (localStorage["timer"] != undefined && localStorage["timer"] != null) {
		var temp = JSON.parse(localStorage["timer"]);
		timer._start_time = temp._start_time;
		timer._previous_time = temp._previous_time;
		timer._is_paused = temp._is_paused;
		timer._is_stopped = temp._is_stopped;
		
		drawScoreBoard();
	}
});

function controls() {
	var modal = document.getElementById("controls-modal");
	modal.style.display = "block";

	document.getElementById("opening-move").checked = localStorage["opening-move"] == "true";
	document.getElementById("marks-?").checked = localStorage["marks-?"] == "true";
	document.getElementById("area-open").checked = localStorage["area-open"] == "true";
	document.getElementById("open-remaining").checked = localStorage["open-remaining"] === "true";
}

function display() {
	var modal = document.getElementById("display-modal");
	modal.style.display = "block";

	document.getElementById("size").value = parseFloat(localStorage["size"]);
	document.getElementById("light-theme").checked = localStorage["dark"] === "false";
	document.getElementById("dark-theme").checked = localStorage["dark"] === "true";
}

function saveControlSettings() {
	localStorage["opening-move"] = document.getElementById("opening-move").checked;
	localStorage["marks-?"] = document.getElementById("marks-?").checked;
	localStorage["area-open"] = document.getElementById("area-open").checked;
	localStorage["open-remaining"] = document.getElementById("open-remaining").checked;
}

function saveDisplaySettings() {
	localStorage["size"] = document.getElementById("size").value;
	localStorage["dark"] = document.getElementById("dark-theme").checked;

	set_canvas(parseInt(localStorage["level"]));
	ctx.fillStyle = localStorage["dark"] == "true" ? "#787878" : '#C0C0C0';
	ctx.fillRect(0, 0, 2*BORDER_THICKNESS() + grid.width*TILE(), 3*BORDER_THICKNESS() + SCORE_BOARD_HEIGHT() + grid.height*TILE());
	drawBorder();
	drawBoard(true);
}

function custom() {
	var modal = document.getElementById('custom-modal');
	modal.style.display = "block";

	if (JSON.parse(localStorage["custom"])){
		document.getElementById("width").value = JSON.parse(localStorage["custom"]).width;
		document.getElementById("height").value = JSON.parse(localStorage["custom"]).height;
		document.getElementById("ratio").value = JSON.parse(localStorage["custom"]).ratio;
	}
}

function submitCustom() {
	var width = document.getElementById("width").value,
		height = document.getElementById("height").value,
		ratio = document.getElementById("ratio").value;

	localStorage["custom"] = JSON.stringify({width, height, ratio});

	if (width > 0 && height > 0 && ratio > 0 && ratio < 1 && width * height * (1 - ratio) >= 9) {
		loadCanvas("divGameStage", CUSTOM);
		var modal = document.getElementById('custom-modal');
		modal.style.display = "none";
	}
}

function highscores() {
	var modal = document.getElementById('highscores-modal');
	modal.style.display = "block";

	var modal_body = document.getElementById("highscores-body");

	modal_body.innerHTML =
	`<table style='width:100%' class='centered'>
		<tr>
			<th>Easy:</th>
			<td>${localStorage[EASY]}</td>
		</tr>
		<tr>
			<th>Medium:</th>
			<td>${localStorage[MEDIUM]}</td>
		</tr>
		<tr>
			<th>Hard:</th>
			<td>${localStorage[HARD]}</td>
		</tr>
		<tr>
			<th>Expert:</th>
			<td>${localStorage[EXPERT]}</td>
		</tr>
	</table>`;
}

function clearScores() {
	localStorage.clear();

	//localStorage[EASY] = 999;
	//localStorage[MEDIUM] = 999;
	//localStorage[HARD] = 999;
	//localStorage[EXPERT] = 999;

	highscores();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function is_dropdown_open() {
	var dropdowns = document.getElementsByClassName("dropdown-content");
	for (var i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			return true;
		}
	}
	return false;
}

function is_modal_open() {
	var modals = document.getElementsByClassName("modal");
	for (var i = 0; i < modals.length; i++) {
		var modal = modals[i];
		if (modal.style.display == "block") {
			return true;
		}
	}
	return false;
}

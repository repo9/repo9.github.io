import Vector from "./Vector.js";
import Tile from "./Tile.js";
import Timer from "./Timer.js";

class Map {

  /** @type {number} The width of the Map. */
  width;
  /** @type {number} The height of the Map. */
  height;
  /** @type {Array.<Array.<Tile>>} The data representation of the grid. */
  _grid;
  /** @type {number} The number of flags on the screen. */
  _flag_count;
  /** @type {boolean} The number of mines on the grid. */
  _mines_set;
  /** @type {number} The number of visible tiles. */
  _visible_count;
  /** @type {number} The max number of visible tiles. */
  _max_visible_count;
  /** @type {number} */
	_win_state;
  /** @type {Array.<Tile>} */
	_tripped_mine_tile;
  /** @type {Timer} */
  _timer;
  
  /**
   * @param {number} width 
   * @param {number} height
   * @param {number} tile_ratio A value between 0.0 and 1.0
   */
  constructor(width, height, tile_ratio) {
    this._mines_set = Math.round(tile_ratio * width * height);
    this._timer = new Timer();
    
    this.resetGrid(width, height);
  }
  
  resetGrid(width, height) {
    this.width = width;
    this.height = height;
    this._grid = [];
    
    for (var y = 0; y < this.height; y++) {
      var row = [];
      for (var x = 0; x < this.width; x++) {
        row.push(new Tile(0, x, y));
      }
      this._grid.push(row);
    }
  }
  
  buildGrid(init_x, init_y) {
    timer.start();
    
		// Sets all the bombs
    for (var i=0; i < this.flag_count; i++) {
      var x = Math.floor(Math.random() * this.width);
	    var y = Math.floor(Math.random() * this.height);
      
      while (this.getTile(x,y).hasMine() || is_n_away(1, init_x, init_y, x, y)) {
        x = Math.floor(Math.random()*this.width); 
        y = Math.floor(Math.random()*this.height);
      }
      this.getTile(x, y).setBomb();
    }
        
    // Sets all the bomb counts
    for (var x=0; x < this.width; x++) {
			for (var y=0; y < this.height; y++) {
				this.setBombCount(x,y);
			}
		}
		
		this._mines_set = true;
  }
  
  /**
	 * Sets the number of bombs surrounding a single tile
	 * @param {number} x    the x-coordinate
	 * @param {number} y    the y-coordinate
	 */
	setBombCount(x, y) {
		if (!this.getTile(x,y).hasMine()) {
			var val = this.getBombCount(x,y);
			this.set(val,x,y);
		}
	}
  
  /**
	 * Gets the number of bombs surrounding a single tile
	 * @param {number} x    the x-coordinate
	 * @param {number} y    the y-coordinate
   * @return {number}
	 */
	getBombCount(x, y) {
		var count = 0;
		for (var i = 0; i < SUR_TILES.length; i++) {
			count += (this.getTile(x + SUR_TILES[i][0], y+SUR_TILES[i][1]).hasMine() ? 1 : 0);
		}
		return count;
	}
  
  /**
   * Checks if the coordinates are valid.
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  checkCoordinates(x, y) {
    var output = true;
    
    if (x < 0 && x >= this.width) {
      console.log(`X, ${x}, is out of range`);
      output = false;
    }
    if (y < 0 && y >= this.height) {
      console.log(`Y, ${y}, is out of range`);
      output = false;
    }
    return output;
  }
  
  /**
   * @param {number} x
   * @param {number} y
   * @return {Tile}
   */
  getTile(x, y) {
    if (this.checkCoordinates(x, y)) {
      return this._grid[y][x];
    } else {
      return new Tile(0, x, y);
    }
  }
  
  /**
	 * Reveals the value hidden in a covered tile
	 * @param  {number} x the x-coordinate
	 * @param  {number} y the y-coordinate
	 */
	sweep(x, y) {
		if (!this._mines_set) {
			this.buildGrid(x, y);
		}
    var tile = this.getTile(x,y);
    
		if (!tile.clickable()) {
			tile.reveal();
			this._visible_count++;
			if (tile.hasMine()) {
				this.lose(x, y);
			} else {
				for (var i = 0; i < SUR_TILES.length; i++) {
					this.sweep(x + SUR_TILES[i][0], y + SUR_TILES[i][1]);
				}
			}
		} else if (tile.revealed() && (tile.value >= this.getBombCount(x, y))) {
			for (var i = 0; i < SUR_TILES.length; i++) {
				var xx = x+SUR_TILES[i][0], yy = y+SUR_TILES[i][1];
				if (this.getTile(x, y).clickable) {
					this.sweep(xx, yy);
				}
			}
		}
		if (this._visible_count == this._MAX_VISIBLE_COUNT) {
			this.win();
		}
	}
  
}

/**
 * Checks if the two points are within n distance of eachother.
 */
function is_n_away(n, x1, y1, x2, y2) {
  return (Math.abs(x2 - x1) <= n && Math.abs(y2 - y1) <= n);
}

/* Surrounding Tile values to add */
var SUR_TILES = [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1],	[1,1]];


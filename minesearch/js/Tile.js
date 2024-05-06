var TILE_IMAGES = ["empty_tile", "1_tile", "2_tile", "3_tile",
				   "4_tile", "5_tile", "6_tile", "7_tile", 
				   "8_tile",  "mine_tile", "flag_tile", 
				   "cover_tile", "tripped_mine_tile",
				   "incorrect_flag_tile", "unknown_tile"];

class Tile {

  static MINE = -1;
  static NO_FLAG = 0;
  static FLAG = 1;
  static UNKNOWN = 2

  value;
  _flag;
  _location;
  _revealed;
	_previous_image;

  constructor(value, x, y) {
    this.value = value;
    this._flag = NO_FLAG;
    this._location = new Vector(x,y);
    this._revealed = false;
		this._previous_image = "cover_tile";
  }

  get revealed() {
    return this._revealed;
  }

  get flag() {
    return this._flag;
  }
  
  get location() {
    return this._location.copy();
  }
  
  setMine() {
    this.value = MINE;
  }

  /**
   * Toggles the flag between not flagged, to flagged, to unknown
   */
  toggleFlag() {
    this._flag = (this._flag + 1) % 3;
  }
  
  clickable() {
    return !this._revealed && this._flag != FLAG;
  }

  /**
   * Checks if the tile contains a mines
   * @return {boolean}
   */
  hasMine() {
    return this.value === MINE;
  }
  
  /**
   * Changes the revealed value and returns if the reveal was successful.
   * @return {boolean} if there was a bomb this will be positive.
   */
  reveal() {
    if (this.flag() === FLAG) {
      return false;
    } else {
      this._revealed = true;
      return true;
    }
  }
  
  getImage() {
		var image;
    if (!this._revealed) {
			if (this._flag == NO_FLAG) {
				image = "cover_tile";
			} (this._flag == FLAG) {
				image = "flag_tile";
			} else {
				image = "unknown_tile";
			}
		} else {
			if (this.hasMine()) {
				image = "mine_tile";
			} else {
				image = "" + this.value + "_tile";
			}
		}
  }
	this._previous_image = image;
	return image;
}
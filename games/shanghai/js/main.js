phina.globalize();
var ASSETS = {
  image: {
    'tiles': 'assets/mahjhongtiles.png',
  },
};

/*
var SCREEN_WIDTH = 960;
var SCREEN_HEIGHT = 640;
var GRID_NUM_X = 19;
var GRID_NUM_Y = 10;
var GRID_SIZE_X = SCREEN_WIDTH / GRID_NUM_X; // size
var GRID_SIZE_Y = SCREEN_HEIGHT / GRID_NUM_Y;
*/

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;
var GRID_NUM_X = 12;
var GRID_NUM_Y = 19;
var GRID_SIZE_X = SCREEN_WIDTH / GRID_NUM_X; // size
var GRID_SIZE_Y = SCREEN_HEIGHT / GRID_NUM_Y;
var DEBUG = false;

var lineColor = "#f06951"; 

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(options) {
    // init
    this.superInit(options);
    // background
    this.backgroundColor = '';
    this.gx = Grid(SCREEN_WIDTH, GRID_NUM_X);
    this.gy = Grid(SCREEN_HEIGHT, GRID_NUM_Y);
    this.elem = PlainElement({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this).setPosition(this.gx.center(), this.gy.center());
    // canvas
    this.elem.canvas.context.strokeStyle = lineColor;
    this.elem.canvas.context.lineWidth = 4;
    this.tileGroup = DisplayElement().addChildTo(this);
    this.button  = Button({
      text: 'You solved the wrong puzzle! Again?',
      color: '#f06951',
      fontSize: 20,
      width: 400,
    }).addChildTo(this);
    this.button.setInteractive(false).hide();
    
    var self = this;
    this.button.setPosition(this.gx.center(), this.gy.center());
    this.button.onpush = function() {
      this.setInteractive(false).hide();
      self.initGame();
    };
    this.pair = [];
    this.points = [];
    this.initGame();

  },
  /**
   * @method initGame
   */
  initGame: function() {
    this.tileGroup.children.clear();
    this.locateTiles();
    this.setTileData();
    this.connectTileData();
    this.redrawTiles();
    if (!this.canClear()) {
      this.initGame();
    }
    else {
      this.locateTiles();
      this.connectTileData();
      this.redrawTiles();
    }
  },
  /**
   * @method locateTiles
   * arrange tiles
   */
  locateTiles: function() {
    var halfX = GRID_SIZE_X / 2;
    var halfY = GRID_SIZE_Y / 2;
    var self = this;
    Array.range(2, GRID_NUM_X - 2).each(function(i) {
      Array.range(1, GRID_NUM_Y - 1).each(function(j) {
        var x = self.gx.span(i) + halfX;
        var y = self.gy.span(j) + halfY;
        var tile = MahjongTile().addChildTo(self.tileGroup);
        tile.setPosition(x, y);
        tile.indexI = i;
        tile.indexJ = j;
        tile.onpointend = function() {
          // pair selection processing
          self.selectPair(tile);
        };
      });
    });
  },
  /**
   * @method canClear
   * @return {boolean} return a true or false
   */
  canClear: function() {
    // repeat for a few minutes
    (120).times(function(i) {
      if (this.canRemove()) {
        this.deletePair();
      }
    }, this);
    // If you can delete all of them
    if (this.tileGroup.children.length === 0) return true;
    this.clearPair();
    return false;
  },
  /**
   * @method canRemove
   * delete tile check
   * @return {boolean}
   */
  canRemove: function() {
    for (var i = 0; i < this.tileGroup.children.length; ++i) {
      var p1 = this.tileGroup.children[i];
      
      for (var j = 0; j < this.tileGroup.children.length; ++j) {
        var p2 = this.tileGroup.children[j];
        //
        if (p1.index === p2.index) {
          //
          if (p1.indexI !== p2.indexI || p1.indexJ !== p2.indexJ) {
            this.pair.push(p1);
            this.pair.push(p2);

            if (this.checkPair()) return true;
            this.clearPair();
          }
        }
      }  
    }
    return false;
  },
  /**
   * @method setTileData
   */
  setTileData: function() {
    var self = this;
    this.tileData = [];
    // Set 4 sets of each type
    (4).times(function() {
      Array.range(0, 34).each(function(index) {
        self.tileData.push(index);
      });    
    });
    this.tileData.shuffle();
  },
  /**
   * @method connectTileData
   */
  connectTileData: function() {
    var self = this;
    (this.tileData.length).times(function(i) {
      self.tileGroup.children[i].index = self.tileData[i];
    });
  },
  /**
   * @method redrawTiles
   */
  redrawTiles: function() {
    this.tileGroup.children.each(function(tile) {
      tile.frameIndex = tile.index;
      tile.setSize(GRID_SIZE_X * 0.95, GRID_SIZE_Y * 0.95);
    });
  },
  /**
   * @method selectPair
   * @param {Object} tile mahjong tile class object
   */
  selectPair: function(tile) {
    var pair = this.pair;
    if (pair.length === 0) {
      pair.push(tile);
      tile.drawFrame();
      tile.setInteractive(false);
      return;
    }
    if (pair.length === 1) {
      pair.push(tile);
      tile.drawFrame();
      tile.setInteractive(false);
      if (pair.first.index !== pair.last.index) {
        this.clearPair();
        return;
      }
      if (!this.checkPair()) {
        this.clearPair();
        return;
      }
      this.drawPiarLine();
      this.elem.alpha = 0;
      this.elem.tweener.clear()
               .fadeIn(800)
               .call(function() {
                 this.elem.alpha = 0;
                 this.deletePair();
                 this.checkmate();
               }, this);
    }
  },
  /**
   * @method clearPair
   */
  clearPair: function() {
    this.pair.each(function(tile) {
      tile.removeFrame();
      tile.setInteractive(true);
    });

    this.pair.clear();
  },
  /**
   * @method deletePair
   */
  deletePair: function() {
    this.pair.first.remove();
    this.pair.last.remove();
    this.pair.clear();
  },
  /**
   * @method checkmate
   */
  checkmate: function() {
    //
    if (this.canRemove()) {
      this.clearPair();
      return;
    }
    //
    if (this.tileGroup.children.length === 0) {
      //this.button.text = 'congratulations!';
      //this.button.setInteractive(true).show();
      success_game_show();
      return;
    }
    
    this.tileGroup.children.each(function(tile) {
      tile.setInteractive(false);  
    });
    // label
    //this.button.text = 'You solved the wrong puzzle! Again?';
    //this.button.setInteractive(true).show();
    fail_game_show();
  },
  /**
   * @method checkPair
   * @return {boolean}
   */
  checkPair: function() {
    if (this.checkNextTo()) return true;
    if (this.checkHorizontal()) return true;
    if (this.checkVertical()) return true;
    return false;
  },
  /**
   * @method checkNextTo
   * @return {boolean}
   */
  checkNextTo: function() {
    var p1 = this.pair.first;
    var p2 = this.pair.last;
    if (p1.indexI === p2.indexI) {
      if ((p1.indexJ === p2.indexJ - 1) || (p1.indexJ === p2.indexJ + 1)) {
        this.points.clear();
        return true;  
      }
    }
    if (p1.indexJ === p2.indexJ) {
      if ((p1.indexI === p2.indexI - 1) || (p1.indexI === p2.indexI + 1)) {
        this.points.clear();
        return true;  
      }
    }
    return false;  
  },
  /**
   * @method checkHorizontal
   * @return {boolean}
   */
  checkHorizontal: function() {
    var p1 = this.pair.first;
    var p2 = this.pair.last;
    
    for (var i = 0; i < GRID_NUM_X; i++) {
      var r1 = false;
      var r2 = false;
      var r3 = false;
      if (i < p1.indexI && !this.isTileInRangeI(i, p1.indexI - 1, p1.indexJ)) r1 = true;
      if (i > p1.indexI && !this.isTileInRangeI(p1.indexI + 1, i, p1.indexJ)) r1 = true;

      if (i < p2.indexI && !this.isTileInRangeI(i, p2.indexI - 1, p2.indexJ)) r2 = true;
      if (i > p2.indexI && !this.isTileInRangeI(p2.indexI + 1, i, p2.indexJ)) r2 = true;

      if (p1.indexJ < p2.indexJ && !this.isTileInRangeJ(p1.indexJ, p2.indexJ, i)) r3 = true;  
      if (p1.indexJ > p2.indexJ && !this.isTileInRangeJ(p2.indexJ, p1.indexJ, i)) r3 = true;  
      // L
      if (i === p1.indexI) {
        r1 = true;
        if (i < p2.indexI && !this.isTileInRangeI(i, p2.indexI - 1, p2.indexJ)) r2 = true;
        if (i > p2.indexI && !this.isTileInRangeI(p2.indexI + 1, i, p2.indexJ)) r2 = true;
        
        if (p1.indexJ < p2.indexJ && !this.isTileInRangeJ(p1.indexJ + 1, p2.indexJ, i)) r3 = true;  
        if (p1.indexJ > p2.indexJ && !this.isTileInRangeJ(p2.indexJ, p1.indexJ - 1, i)) r3 = true;  
      }
      // L
      if (i === p2.indexI) {
        r2 = true;
        if (i < p1.indexI && !this.isTileInRangeI(i, p1.indexI - 1, p1.indexJ)) r1 = true;
        if (i > p1.indexI && !this.isTileInRangeI(p1.indexI + 1, i, p1.indexJ)) r1 = true;
        
        if (p2.indexJ < p1.indexJ && !this.isTileInRangeJ(p2.indexJ + 1, p1.indexJ, i)) r3 = true;  
        if (p2.indexJ > p1.indexJ && !this.isTileInRangeJ(p1.indexJ, p2.indexJ - 1, i)) r3 = true;  
      }

      if (i === p1.indexI && i == p2.indexI) {
        r1 = true;
        r2 = true;
        if (p1.indexJ < p2.indexJ && !this.isTileInRangeJ(p1.indexJ + 1, p2.indexJ - 1, i)) r3 = true;  
        if (p1.indexJ > p2.indexJ && !this.isTileInRangeJ(p2.indexJ + 1, p1.indexJ - 1, i)) r3 = true;  
        
      }
      if (r1 && r2 && r3) {
        this.points.clear();
        this.points.push(Vector2(p1.indexI, p1.indexJ));
        this.points.push(Vector2(i, p1.indexJ));
        this.points.push(Vector2(i, p2.indexJ));
        this.points.push(Vector2(p2.indexI, p2.indexJ));
        return true;
      }
    }
    return false;
  },
  /**
   * @method checkVertical
   * @return {boolean}
   */
  checkVertical: function() {
    var p1 = this.pair.first;
    var p2 = this.pair.last;
    
    for (var j = 0; j < GRID_NUM_Y; j++) {
      var r1 = false;
      var r2 = false;
      var r3 = false;

      if (j < p1.indexJ && !this.isTileInRangeJ(j, p1.indexJ - 1, p1.indexI)) r1 = true;
      if (j > p1.indexJ && !this.isTileInRangeJ(p1.indexJ + 1, j, p1.indexI)) r1 = true;

      if (j < p2.indexJ && !this.isTileInRangeJ(j, p2.indexJ - 1, p2.indexI)) r2 = true;
      if (j > p2.indexJ && !this.isTileInRangeJ(p2.indexJ + 1, j, p2.indexI)) r2 = true;

      if (p1.indexI < p2.indexI && !this.isTileInRangeI(p1.indexI, p2.indexI, j)) r3 = true;  
      if (p1.indexI > p2.indexI && !this.isTileInRangeI(p2.indexI, p1.indexI, j)) r3 = true;  
      // L
      if (j === p1.indexJ) {
        r1 = true;
        if (j < p2.indexJ && !this.isTileInRangeJ(j, p2.indexJ - 1, p2.indexI)) r2 = true;
        if (j > p2.indexJ && !this.isTileInRangeJ(p2.indexJ + 1, j, p2.indexI)) r2 = true;
        
        if (p1.indexI < p2.indexI && !this.isTileInRangeI(p1.indexI + 1, p2.indexI, j)) r3 = true;  
        if (p1.indexI > p2.indexI && !this.isTileInRangeI(p2.indexI, p1.indexI - 1, j)) r3 = true;  
      }

      if (j === p2.indexJ) {
        r2 = true;
        if (j < p1.indexJ && !this.isTileInRangeJ(j, p1.indexJ - 1, p1.indexI)) r1 = true;
        if (j > p1.indexJ && !this.isTileInRangeJ(p1.indexJ + 1, j, p1.indexI)) r1 = true;
        
        if (p2.indexI < p1.indexI && !this.isTileInRangeI(p2.indexI + 1, p1.indexI, j)) r3 = true;  
        if (p2.indexI > p1.indexI && !this.isTileInRangeI(p1.indexI, p2.indexI - 1, j)) r3 = true;  
      }

      if (j === p1.indexJ && j === p2.indexJ) {
        r1 = true;
        r2 = true;
        if (p1.indexI < p2.indexI && !this.isTileInRangeI(p1.indexI + 1, p2.indexI - 1, j)) r3 = true;  
        if (p1.indexI > p2.indexI && !this.isTileInRangeI(p2.indexI + 1, p1.indexI - 1, j)) r3 = true;  
      } 
      //
      if (r1 && r2 && r3) {
        this.points.clear();
        this.points.push(Vector2(p1.indexI, p1.indexJ));
        this.points.push(Vector2(p1.indexI, j));
        this.points.push(Vector2(p2.indexI, j));
        this.points.push(Vector2(p2.indexI, p2.indexJ));
        return true;
      }
    }
    return false;
  },
  /**
   * @method isTileInRangeI
   * @return {boolean}
   */
  isTileInRangeI: function(i1, i2, j) {
    var result = false;
    
    this.tileGroup.children.some(function(tile) {
      if (i1 <= tile.indexI &&  tile.indexI <= i2 && tile.indexJ === j) {
        result = true;
        return true;
      }
    });
    return result;
  },
  /**
   * @method isTileInRangeJ
   * @return {boolean}
   */
  isTileInRangeJ: function(j1, j2, i) {
    var result = false;
    
    this.tileGroup.children.some(function(tile) {
      if (j1 <= tile.indexJ &&  tile.indexJ <= j2 && tile.indexI === i) {
        result = true;
        return true;
      }
    });
    return result;
  },
  /**
   * @method drawPiarLine
   */
  drawPiarLine: function() {
    var points = this.points;
    this.elem.canvas.clear();
    
    for(var i = 0; i < points.length - 1; ++i) {
      var x1 = this.gx.span(points[i].x) + GRID_SIZE_X / 2;
      var y1 = this.gy.span(points[i].y) + GRID_SIZE_Y / 2;
      var x2 = this.gx.span(points[i + 1].x) + GRID_SIZE_X / 2;
      var y2 = this.gy.span(points[i + 1].y) + GRID_SIZE_Y / 2;

        if(x1==x2){ 
          if(y1>y2){
            this.elem.canvas.drawLine(x1, y1+2, x2, y2-2);
          }else{
            this.elem.canvas.drawLine(x1, y1-2, x2, y2+2);
          }
        }

        if(y1==y2){
          if(x1>x2){
            this.elem.canvas.drawLine(x1+2, y1, x2-2, y2);
          }else{
            this.elem.canvas.drawLine(x1-2, y1, x2+2, y2);
          }
        }
  
    }
  },
});
/**
 * @class MahjongTile
 */
phina.define('MahjongTile', {
  // Sprite
  superClass: 'Sprite',
  /**
   * @method init
   */
  init: function() {
    this.superInit('tiles', 30, 40);
    this.setInteractive(true);
  },
  /**
   * @method drawFrame
   */
  drawFrame: function() {
    RectangleShape({
      width: GRID_SIZE_X,
      height: GRID_SIZE_Y,
      fill: null,
      stroke: lineColor,
      cornerRadius:8,
    }).addChildTo(this);
  },
  /**
   * @method removeFrame
   */
  removeFrame: function() {
    this.children.clear();
  },

});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  
  app.run();
});

//control

function reset_game() {
  location.reload();
}

function fail_game_show(){
  document.getElementById("popup-fail").style.display = "block";
}

function success_game_show(){
  document.getElementById("popup-success").style.display = "block";
}

/**
 *  @fileOverview Interface of Minesweeper
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */

/** ------------Global variables ------------ */

let focus = true;

let grid;
let cols= 9;
let rows= 9;
let mines= 10;
let width= 36;
let flags= 0;
let gameSt= true;   //true: play  false: stop
let mode = 1; //1: search  -1:flag
let mouseClickMode = true; 

let originBoxs = 9;

let theme = 0;
let diff = 0;   //0:easy 1:midium 2:hard

let tempTheme = 0;
let tempDiff = 0;   //0:easy 1:midium 2:hard


diffSet(diff);
themeSet(theme);


function themeSet(theme){
  switch(theme){
    case 1:
        document.getElementById("bomb").style.borderStyle="outset";
        document.getElementById("flower").style.borderStyle="inset";
      break;
    default:
        document.getElementById("bomb").style.borderStyle="inset";
        document.getElementById("flower").style.borderStyle="outset";
      break;
  }

}

function diffSet(diff){

    switch(diff){
    case 1:
        document.getElementById("easy").style.borderStyle="outset";
        document.getElementById("medium").style.borderStyle="inset";
        document.getElementById("hard").style.borderStyle="outset";   
      break;
    case 2:
        document.getElementById("easy").style.borderStyle="outset";
        document.getElementById("medium").style.borderStyle="outset";
        document.getElementById("hard").style.borderStyle="inset";        
      break;
    default:
        document.getElementById("easy").style.borderStyle="inset";
        document.getElementById("medium").style.borderStyle="outset";
        document.getElementById("hard").style.borderStyle="outset"; 
      break;
  }

}

function menu(){
  var menu = document.getElementById("menuPopup");
  if(menu.style.display == "none" || menu.style.display == ""){
    menu.style.display="block";
    document.getElementById("canvas-holder").style.display="none";

    themeSet(theme);
    diffSet(diff);    
  }
}


function theme1Btn(){
  tempTheme = 0;
  themeSet(0);
}

function theme2Btn(){
  tempTheme = 1;
  themeSet(1);
}

function easyBtn(){
  tempDiff = 0;
  diffSet(0);
}

function mediumBtn(){
  tempDiff = 1;
  diffSet(1);
}

function hardBtn(){
  tempDiff = 2;
  diffSet(2);
}

function saveStart(){

  closeMenu();

  theme = tempTheme;
  diff = tempDiff;

  switch(diff){
    case 0:
      gameStart(9, 9, 10);
      break;
    case 1:
      gameStart(16, 16, 40);
      break;
    default:
      gameStart(30, 16, 99);
      break;
  }

  preload(); //theme set

}

function firstStart(){

  //document.getElementById("logo").style.display="none";
  document.getElementById("startGamebtn").style.display="none";
  document.getElementById("newGamebtn").style.display="block";
  document.getElementById("cancelbtn").style.display="block";
  saveStart();

}

function closeMenu(){
  document.getElementById("canvas-holder").style.display="block";
  document.getElementById("menuPopup").style.display="none";
}


function gameStart(r, c, m){

  rows = r;
  cols = c;
  mines = m;

  timeReset();
  timeStart();  //time reset
  setup();

}

function gameReset(){
  timeReset();
  timeStart();  //time reset
  setup();
}

function flag(){
  //cusAlert("You won!<br>"+document.getElementById("time").innerText);
  mode= mode*-1;

  //document.getElementById("flagBtn").style.background = "url('이미지 경로')";
  if(mode==-1){
    document.getElementById("flagBtn").className="flagBtn_";
  }else{
    document.getElementById("flagBtn").className="flagBtn";
  }
}


/** ------------ P5 interface ------------ */
/** Creates a canvas with a 2D array according to the input
    * @pre need a valid number of rows and columns to build the board
    * @post the board has been created and filled with mines, the user can now play the game!
    */
function setup() {
    /** Gets the dimensions from the user */

    flags = mines;
    document.getElementById("flagsLeft").innerHTML = flags;

    document.getElementById("startBtn").className="startBtn";  //resetBtn set

    width= Math.floor(36/(cols/originBoxs));

    gameSt = true;

    /** Boundaries for the grid */
    if (rows<2){
        rows=2;
    }
    if (cols < 2){
        cols = 2;
    }
    if (rows > 30){
        rows = 30;
    }
    if (cols > 30){
        cols = 30;
    }
    if(mines<=0){
        mines=1;
        flags=1;
    }
    if(mines>=rows*cols){
        mines=rows*cols-1;
        flags=mines;
    }

    /** Creates a canvas that holds the amount of cols and rows given according to the set width*/
    let canvas = createCanvas(cols*width +1, rows*width +1);
    canvas.parent('canvas-holder');

    /** Creates a 2D Array with the cols and rows given*/
    grid = create2DArray(cols, rows);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[c][r] = new Box(c*width, r*width, width);
      }
    }

    /** Populates the grid with the amount of mines given */
    mine_population(mines, rows, cols, grid);

    /** Populates the count of each box in the grid */
    generate_playing_field(mines, rows, cols, grid);

}

/** Draws the canvas on the site by calling the show function on each box
    * @pre there has been a 2d array built, but it has nothing inside it
    * @post the array is now filled with mines or number of adjacent mines
    * @return none
    */
function draw() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

/** ------------ Helper Functions ------------ */

/**
 * Creates a 2D Array according to the cols and rows given
 * @param   {number} cols number of columns for the 2D array
 * @param   {number} rows number of rows for the 2D array
 * @return  {array} 2D array with the the numbers of cols and rows
 */
function create2DArray(cols,rows){
  let grid = new Array(cols);
  for (let c=0; c<cols; c++){
    grid[c] = new Array(rows);
  }
  return grid;
}


function mousePressed() {
    if (mouseButton === RIGHT) {
      mouseClickMode = false;

      let x = floor(mouseX/width);
      let y = floor(mouseY/width);
        //alert("right");

      if (grid[x][y].clicked==false && gameSt == true){
                if (grid[x][y].flagged==true){
                        grid[x][y].flagged=false;
                        flags = flags + 1;
                }
                else if (flags > 0){
                        grid[x][y].flagged=true;
                        flags = flags - 1;
                }
      }
      document.getElementById("flagsLeft").innerHTML = flags;

      if(win(cols, rows, grid, mines)){
            gameSt = false; //game end
            pause(); //time stop
            cusAlert("You won!<br>"+document.getElementById("time").innerText);
            //window.alert("You won!");
            //location = location;
      }


    }
    else {
        //alert("left");
        mouseClickMode = true;
    }
}


/**
 * Changes the box implementation when it is clicked  the number of mines adjacent to that spot will appear. If they have flagged every
 * mine, they win
 *
 * @pre The board has been created and filled with mines, the user is playing
 * @post if the user clicks a mine, they lose. If they click anything other than a mine,
 * @return none
 */
function mouseClicked(){
    /** Gets coordinate of the click input */
  let x = floor(mouseX/width);
  let y = floor(mouseY/width);

    if(mode === 1){   //flag
      //console.log(mouseClickMode);

      /** If the box does not have a flag, change the boxs implementation */
      if (grid[x][y].flagged==false && gameSt == true){
        grid[x][y].clicked=true;
        /** Generates spaces if the box is an space and not a mine*/
        if (grid[x][y].count==0 && grid[x][y].mine==false){
            reveal_spaces(x,y,cols,rows,grid);
        }
        /** Calls win function */
        if(win(cols, rows, grid, mines)){
            gameSt = false; //game end
            pause(); //time stop
            cusAlert("You won!<br>"+document.getElementById("time").innerText);
            //window.location.reload(true);
        }
        /** Calls lose function */
        if(grid[x][y].mine == true){

          gameSt = false; //game end
          document.getElementById("startBtn").className="startBtn_";  //resetBtn set
          pause(); //time stop
          lose(grid);
        }
      }
    }else{
       if (grid[x][y].clicked==false && gameSt == true){
                if (grid[x][y].flagged==true){
                        grid[x][y].flagged=false;
                        flags = flags + 1;
                }
                else if (flags > 0){
                        grid[x][y].flagged=true;
                        flags = flags - 1;
                }
        }
        document.getElementById("flagsLeft").innerHTML = flags;

        if(win(cols, rows, grid, mines)){
            gameSt = false; //game end
            pause(); //time stop
            cusAlert("You won!<br>"+document.getElementById("time").innerText);
            //window.alert("You won!");
            //location = location;
        }

    }
  //}
}

window.onblur = function() {
  //console.log("out");
  if(gameSt){
    focus = false;
    pause();
  }
};

window.onfocus = function() {
  //console.log("out");
  if(gameSt && !focus){
    focus = true;
    resume();
  }
};
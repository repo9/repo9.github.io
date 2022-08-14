/**
 *  @fileOverview Box class
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */


 /**
  * A class to represent boxes in the grid
  * @class
  *

  *
  * @property {number} x the box's x coordinate
  * @property {number} y the box's y coordinate
  * @property {number} w the box's width
  * @property {boolean} mine  contains or not a mine
  * @property {boolean} clicked   has been clicked or not
  * @property {number} count counter of the times the box has been clicked
  * @property {boolean} flagged   contains or not a flag
  */


/**
  * @constructor
  * @pre: need valid grid inputs
  * @Post: a box object which is available to be shown has been generated
  * @return: undefined
*/
function Box(x,y,width)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.mine = false;
    this.clicked = false;
    this.count = 0;
    this.flagged = false;
}

/**
   * @pre: grid has been created and filled with values
   * @post: reveals the value of the grid that was clicked on
   * @returntype: undefined
*/
let img={}; //count
let defaultBox;
let clickedBox;
let mineBox;
function preload(){
    for(var i =0; i<8; i++){
        img[i] = loadImage("img/"+theme+"/"+(i+1)+".png");
    }

    defaultBox = loadImage("img/"+theme+"/■.png");
    clickedBox = loadImage("img/"+theme+"/□.png");
    mineBox = loadImage("img/"+theme+"/y.png");
    flagBox = loadImage("img/"+theme+"/x.png");

}

Box.prototype.show = function() {

    //fill(250, 250, 250  );
    //rect(this.x, this.y, this.w, this.w);
    image(defaultBox, this.x, this.y, this.w, this.w);
    if (this.clicked && this.flagged==false){
        if(this.mine==true){

            image(mineBox, this.x, this.y, this.w, this.w);

        }
        else if(this.count==1){
            // yellow 1
            image(img[0], this.x, this.y, this.w, this.w);
        }
        else if(this.count==2){
            // light green
            image(img[1], this.x, this.y, this.w, this.w);
        }
        else if(this.count==3){
            // dark green
            image(img[2], this.x, this.y, this.w, this.w);
        }
        else if(this.count==4){
            // light blue
            image(img[3], this.x, this.y, this.w, this.w);
        }
        else if(this.count==5){
            // blue
            image(img[4], this.x, this.y, this.w, this.w);
        }
        else if(this.count==6){
            // dark blue
            image(img[5], this.x, this.y, this.w, this.w);
        }
        else if(this.count==7){
            // purple
            image(img[6], this.x, this.y, this.w, this.w);
        }
        else if(this.count==8){
            // pink
            image(img[7], this.x, this.y, this.w, this.w);
        }
        else{
            // gray
            image(clickedBox, this.x, this.y, this.w, this.w);
        }
    }
    else if (this.flagged){
        //flag

        image(flagBox, this.x, this.y, this.w, this.w);
        //fill(179, 0, 0);
        //triangle(this.x + this.w/2, this.y + 2, this.x + this.w, this.y + this.w/2, this.x + this.w/2, this.y + this.w/2);
        //fill(0,0,0);
        //quad(this.x + this.w/2, this.y + 2, this.x + this.w/2 - 4, this.y + 2, this.x + this.w/2 - 4, this.y + this.w - 2, this.x + this.w/2, this.y + this.w - 2);
    }

}

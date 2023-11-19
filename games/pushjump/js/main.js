window.onload = function(){

  var gameWidth = window.innerWidth;
  var gameHeight = window.innerHeight;
  var ratio = 4/3;

  //if (gameHeight / gameWidth < ratio) {
  //  gameWidth = Math.ceil(gameHeight / ratio);
  //}

  var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'game');
  game.state.add("menu",menuState,true);
  game.state.add("main",mainState);

};

var menuState = function(game){

  var enterKey, leftKey, rightKey;
  var wh=0;  //select player

  var y = -230;

  this.init = function(){
    if(!this.game.device.desktop){
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    }
    this.game.scoreBest = this.game.scoreBest || 0;
    this.game.playerStyle = this.game.playerStyle || 0;
    this.playerArr = [];
  };
  this.preload = function(){
    this.load.image("back", "./assets/back.png");
    //this.load.spritesheet("cloud", "./assets/clouds.png",64,32);
    this.load.spritesheet("plate", "./assets/plates.png",64,40);
    this.load.spritesheet("player", "./assets/players.png",36,64);
    this.load.spritesheet("button", "./assets/buttons.png",80,40);
    this.load.spritesheet("item", "./assets/items.png",24,24);
    this.load.spritesheet("icon", "./assets/icons.png",20,20);
    //this.load.spritesheet("guide", "./assets/guide.png",200,126);
    this.load.spritesheet("title", "./assets/title.png",200,126);
    //this.game.add.text(this.world.centerX, this.world.centerY, "Loading...", {fontSize:"24px", fill:"#fff"}).anchor.set(0.5);
  };
  this.create = function(){
    var back = this.game.add.sprite(0,0,"back");
    back.scale.set(this.game.width/160,this.game.height/280);
    //back.scale.set(this.game.width/300,this.game.height/400);
    // clouds

    var btn = this.game.add.sprite(this.world.centerX, this.world.centerY+120, "button", 0);
    btn.anchor.set(0.5);
    btn.scale.set(1.5);
    this.game.add.tween(btn).from({alpha:0},300,"Linear",true).onComplete.add(function(obj){
      obj.inputEnabled = true;
      obj.events.onInputDown.add(function(){
        this.game.state.start("main");
      },this);
    },this);

    for (var i=0; i<3; i++){
      this.playerArr[i] = this.game.add.sprite(this.world.centerX, this.world.centerY+240+y, "player", i);
      this.playerArr[i].anchor.set(0.5);
      this.playerArr[i].alpha = 0;
    }
    this.playerArr[this.game.playerStyle].alpha = 1;

    var btn1 = this.game.add.sprite(this.world.centerX-100, this.world.centerY+245+y, "button", 4);
    btn1.anchor.set(0.5);
    btn1.inputEnabled = true;
    btn1.events.onInputDown.add(function(){
      this._setPlayer(-1);
    },this);
    var btn2 = this.game.add.sprite(this.world.centerX+100, this.world.centerY+250+y, "button", 5);
    btn2.anchor.set(0.5);
    btn2.inputEnabled = true;
    btn2.events.onInputDown.add(function(){
      this._setPlayer(1);
    },this);

    //var guide = this.game.add.sprite(this.world.centerX,80,"guide",6);
    //guide.anchor.set(0.5);
    //guide.scale.set(1.0);

    var title = this.game.add.sprite(this.world.centerX,200,"title",6);
    title.anchor.set(0.5);
    title.scale.set(1.4);

    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

  };
  this.update = function(){

    if (enterKey.isDown){
      console.log("down");

        this.game.state.start("main");
      
        
    }


    if (leftKey.isDown && wh==0){
      console.log("left-D");
      wh=-1;
      this._setPlayer(wh);
    }else if (leftKey.isUp&& wh==-1){
      console.log("left-U");
      wh=0;
    }

    if (rightKey.isDown&& wh==0){
      console.log("right-D");
      wh=1;
      this._setPlayer(wh);
    }else if (rightKey.isUp&& wh==1){
      console.log("right-U");
      wh=0;
    }

  }

  this._setPlayer = function(go){
    this.playerArr[this.game.playerStyle].alpha = 1;
    this.playerArr[this.game.playerStyle].x = this.world.centerX;
    this.game.add.tween(this.playerArr[this.game.playerStyle]).to({alpha:0,x:this.world.centerX+go*50},200,"Linear",true);

    this.game.playerStyle = (((this.game.playerStyle - go) % 3) + 3) % 3;

    this.playerArr[this.game.playerStyle].alpha = 1;
    this.playerArr[this.game.playerStyle].x = this.world.centerX;
    this.game.add.tween(this.playerArr[this.game.playerStyle]).from({alpha:0,x:this.world.centerX-go*50},200,"Linear",true);
  };
};

var mainState = function(game){

  var group, player, effect, point;

  var moving; 
  var holding;
  var holdTime;

  var spaceKey, leftKey, rightKey;
  var kj=1;

  var gameState = true;

  var gamePreBestScore = 0;

  this.pArr = [17,15,12,10,15,13,8,17]; 
  this.init = function(){

    moving = true;
    holding = false;
    holdTime = 0;

    this.lastX = 40;
    this.lastY = 20;
    this.lastD = 1;
    this.lastP = 0;

    this.bonus = 0;
    this.playerStyle = this.game.playerStyle; 
    this.items = {txt:[null,null,null],val:[0,4,4]}; 
  };
  this.create = function(){

    gamePreBestScore = Number(localStorage.getItem("scoreUTTEWFWBR"));

    gameState = true;
    var back = this.game.add.sprite(0,0,"back");
    back.scale.set(this.game.width/160,this.game.height/280);
    // clouds
    /*
    for (var i=0; i<3; i++){
      var firstX = this.game.rnd.between(20,this.game.width-20);
      var firstTime = Math.floor((20000-3000*i)*(firstX+150)/(this.game.width+200));
      var cloud = this.game.add.sprite(firstX,this.game.height-250+50*i,"cloud",this.game.rnd.integerInRange(0,2));
      cloud.scale.set(1+0.5*i);
      cloud.alpha = 0.3;
      this.game.add.tween(cloud).to({x:-150},firstTime,"Linear",true).onComplete.add(function(obj,tw,twTime){
        obj.x = this.game.width+50;
        this.game.add.tween(obj).to({x:-150},twTime,"Linear",true,0,-1).onLoop.add(function(obj){
          obj.frame = this.game.rnd.integerInRange(0,2);
        },this);
      },this,0,20000-3000*i);
    }
    */

    group = this.game.add.group();
    this.plate1 = group.create(this.world.centerX-this.lastX, this.world.centerY+this.lastY, "plate", 0);
    this.plate1.anchor.set(0.5,0.4);
    // 
    this.game.add.tween(this.plate1).from({y:this.plate1.y-50,alpha:0},200,"Linear",true).onComplete.add(function(){
      this.plate2 = group.create(this.world.centerX+this.lastX, this.world.centerY-this.lastY, "plate", 0);
      this.plate2.anchor.set(0.5,0.4);
      this.plate2.sendToBack();
      this.game.add.tween(this.plate2).from({y:this.plate2.y-50,alpha:0},200,"Linear",true).onComplete.add(function(){
        //
        effect = group.create(0, 0, "button", 6); 
        effect.anchor.set(0.5);
        effect.visible = false; // 
        // 
        point = group.create(0, 0, "button", 7); 
        point.anchor.set(0.5);
        point.scale.set(0.5);
        point.visible = false; // 
        player = group.create(this.world.centerX-this.lastX, this.world.centerY+this.lastY);
        // 
        player.b = player.addChild(this.game.add.sprite(0, 0, "player", this.playerStyle));
        player.b.anchor.set(0.5,0.875);
        player.b.animations.add("delay",[this.playerStyle],10,false);
        // 
        player.txt = player.addChild(this.game.add.text(0, -30, "", {fontSize:"16px", fill:"#777"}));
        player.txt.anchor.set(0.5);

        this.game.add.tween(player).from({y:player.y-50,alpha:0},200,"Linear",true).onComplete.add(function(){
          moving = false;
        },this);
      },this);
    },this);

    this.items.txt[0] = this.game.add.text(this.world.centerX, 80, "0", {fontSize:"48px", fill:"#777"});  
    this.items.txt[0].anchor.set(0.5);
    this.game.add.sprite(10,10,"icon",0);
    this.game.add.sprite(75,10,"icon",1);
    this.items.txt[1] = this.game.add.text(35, 8, this.items.val[1], {fontSize:"20px", fill:"#777"});
    this.items.txt[2] = this.game.add.text(100, 8, this.items.val[2], {fontSize:"20px", fill:"#777"});
    //best score
    this.items.txt[3] = this.game.add.text(10, 35, "best score: "+ gamePreBestScore, {fontSize:"17px", fill:"#777"});

    this.game.input.onDown.add(function(){
      if(!moving && !holding){
        holding=true;
        holdTime=this.game.time.now;
        if(this.items.val[2]>0){
          point.x=player.x;
          point.y=player.y;
          point.visible = true;
        }
      }
    },this);
    this.game.input.onUp.add(this._jump,this);


    //this.game.input.keyboard.addCallbacks(this, null, null, this._jump);

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);



  };
  this.update = function(){
    if(holding){ // 
      var power = Math.min(Math.floor((this.game.time.now - holdTime) / 16), 250);
      player.scale.y = 1 - (power>100 ? 0.3 : 0.3 * power / 100);
      player.scale.x = 1 + (power>100 ? 0.5 : 0.5 * power / 100);
      if(this.items.val[2]>0){
        var tarX = this.world.centerX-this.lastX+this.lastD*power*2;
        var tarY = this.world.centerY+this.lastY-power;
        point.x=tarX;
        point.y=tarY;
      }
    }


    if (spaceKey.isDown && kj){
      console.log("down");

        if(gameState){
          kj=-1;
          if(!moving && !holding){
            holding=true;
            holdTime=this.game.time.now;
            if(this.items.val[2]>0){
              point.x=player.x;
              point.y=player.y;
              point.visible = true;
            }
          }   
        }else{
          //this.game.state.start("main");
        }
    }else if (spaceKey.isUp&& kj==-1){
      if(gameState){
        kj = 1;
        this._jump();
      }
    }

    if (leftKey.isDown){
      console.log("left");

        if(gameState){
          //this.game.state.start("menu");
        }else{
          this.game.state.start("menu");
        }
    }

    if (rightKey.isDown){
      console.log("right");

        if(gameState){
          //this.game.state.start("main");
        }else{
          this.game.state.start("main");
        }
    }




  };
  this._setItem = function(id, v){
    this.items.val[id]+=v;
    this.items.txt[id].text = this.items.val[id];
  };
  this._jump = function(){
    if(!moving && holding){
      moving = true;
      holding = false;
      player.scale.y = 1;
      player.scale.x = 1;
      point.visible = false;
      var power = Math.min(Math.floor((this.game.time.now - holdTime) / 16), 250); // 
      var jumpX = this.world.centerX-this.lastX+this.lastD*power*2;
      var jumpY = this.world.centerY+this.lastY-power;
      // ***  ***
      var jumpTime = 300; // 
      // 
      this.game.add.tween(player).to({x:jumpX, y:jumpY},jumpTime,"Linear",true).onComplete.add(function(obj){
        if(this._checkScore()){
          obj.b.animations.play("delay",10).onComplete.addOnce(this._newPlate,this); // 
        }else{
          obj.b.animations.play("delay",10).onComplete.addOnce(this._fall,this);
        }
      },this);
      // 
      player.b.y = -40; 
      player.b.angle = -this.lastD * 150;
      this.game.add.tween(player.b).to({angle:-this.lastD*90, x:this.lastD*20, y:-80}, jumpTime/2, Phaser.Easing.Quadratic.Out, false).to({angle:0,x:0,y:0},jumpTime/2,Phaser.Easing.Quadratic.In,true);
      // ******
    }
  };
  this._checkScore = function(){
    // 
    if(this.items.val[2]>0){
      this._setItem(2,-1);
    }
    if(Math.abs(player.x-this.plate2.x)<=this.pArr[this.lastP]){   
      if(this.plate2.item && this.plate2.item.alive){
        this._setItem(this.plate2.itemID,1);
        this.plate2.item.kill();
      }
      var addScore = 1;
      if(Math.abs(player.x-this.plate2.x)<=3){ // 
        this.bonus += 2; 
        addScore = this.bonus;
        effect.reset(this.plate2.x,this.plate2.y);
        effect.scale.set(0.5);
        effect.visible = true;
        effect.alpha=1;
        this.game.add.tween(effect.scale).to({x:3,y:3},800,Phaser.Easing.Cubic.Out,true);
        this.game.add.tween(effect).to({alpha:0},800,Phaser.Easing.Cubic.Out,true).onComplete.add(function(obj){obj.visible = false;},this);
      }else{
        this.bonus = 0;
      }
      this._setItem(0,addScore);
      // 
      player.txt.reset(0,-30);
      player.txt.text = addScore; 
      player.txt.alpha = 1; 
      this.game.add.tween(player.txt).to({y:player.txt.y-50,alpha:0},800,"Linear",true).onComplete.add(function(txt){txt.kill();},this);
      return true;
    }else{
      return false;
    }
  };
  this._fall = function(){
    player.sendToBack();
    if(player.y>this.plate2.y){this.plate2.sendToBack();}

    if(Math.abs(player.x-this.plate2.x)-this.pArr[this.lastP] < 12){  // 
      player.angle = (player.y<this.plate2.y && this.lastD>0) || (player.y>this.plate2.y && this.lastD<0) ? 30 : -30;  // 
    }
    this.game.add.tween(player).to({y:player.y+100,alpha:0},500,"Linear",true).onComplete.add(function(){
      this._setItem(1,-1);
      if(this.items.val[1]>0){
        player.x = this.world.centerX-this.lastX;
        player.y = this.world.centerY+this.lastY-50;
        player.angle = 0;
        player.bringToTop();
        this.game.add.tween(player).to({y:player.y+50,alpha:1},200,"Linear",true).onComplete.add(function(){
          moving = false;
        },this);
      }else{
        this._overMenu();
        gameState = false;
      }
    },this);
  };
  this._newPlate = function(sprite,anim){
    moving = false;
    var newRange = this.game.rnd.integerInRange(10, 50); // 
    var newD = this.game.rnd.sign();   // 
    var newX = newD * newRange*2;    // 
    var newY = newRange;           // 
    this.lastP = this.game.rnd.between(0,7); // 
    this.plate2 = group.getFirstDead(true, this.world.centerX+this.lastX+newX*2, this.world.centerY-this.lastY-newY*2, "plate", this.lastP);
    this.plate2.anchor.set(0.5,0.4);
    this.plate2.sendToBack();
    // 
    if(this.game.rnd.integerInRange(0,10)>6){
      if(this.plate2.item){
        this.plate2.item.reset(0,0);
        this.plate2.itemID = this.game.rnd.integerInRange(1,2);
        this.plate2.item.play("item_"+this.plate2.itemID);
      }else{
        this.plate2.item = this.plate2.addChild(this.game.add.sprite(0,0,"item")); 
        this.plate2.item.anchor.set(0.5,0.9);
        this.plate2.item.animations.add("item_1",[0,1,2,1],5,true); 
        this.plate2.item.animations.add("item_2",[3,4,5,4],5,true); 
        this.plate2.itemID = this.game.rnd.integerInRange(1,2);
        this.plate2.item.play("item_"+this.plate2.itemID);
      }
    }
    this.game.add.tween(this.plate2).from({alpha:0},200,"Linear",true);
    group.forEachAlive(this._tween,this,newX,newY); // 
    this.lastX=newX;
    this.lastY=newY;
    this.lastD=newD;
  };
  this._tween = function(plate,newX,newY){
    this.game.add.tween(plate).to({x:plate.x-this.lastX-newX,y:plate.y+this.lastY+newY},300,"Linear",true).onComplete.add(function(plate){
      if(!plate.inWorld && plate!=player){plate.kill();}
    },this);
  };
  this._overMenu = function(){  //gameover


    var box = this.game.add.sprite(this.world.centerX, this.world.centerY, "button", 3);
    box.anchor.set(0.5);
    box.scale.set(this.game.width/80,4);
    this.game.add.tween(box).from({alpha:0},300,"Linear",true);

    var btn1 = this.game.add.sprite(this.world.centerX+65, this.world.centerY, "button", 1);
    btn1.anchor.set(0.5);
    btn1.scale.set(1.4);
    this.game.add.tween(btn1).from({alpha:0},300,"Linear",true).onComplete.add(function(obj){
      obj.inputEnabled = true;
      obj.events.onInputDown.add(function(){
        this.game.state.start("main");
      },this);
    },this);

    var btn2 = this.game.add.sprite(this.world.centerX-65, this.world.centerY, "button", 2);
    btn2.anchor.set(0.5);
    btn2.scale.set(1.4);
    this.game.add.tween(btn2).from({alpha:0},300,"Linear",true).onComplete.add(function(obj){
      obj.inputEnabled = true;
      obj.events.onInputDown.add(function(){
        this.game.state.start("menu");
      },this);
    },this);

    this.game.scoreBest = this.items.val[0]>this.game.scoreBest?this.items.val[0]:this.game.scoreBest;
    this.game.add.text(this.world.centerX, this.world.centerY+50, "Best : " + this.game.scoreBest, {fontSize:"20px", fill:"#777"}).anchor.set(0.5);

    var gamePreBestScore = Number(localStorage.getItem("scoreUTTEWFWBR"));
    if(gamePreBestScore < this.game.scoreBest){
        localStorage.setItem("scoreUTTEWFWBR", this.game.scoreBest);  //score save
    }

  };
};
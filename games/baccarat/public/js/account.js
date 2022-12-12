"use strict";

const acntCanvas = document.getElementById('accountCanvas');
const acntctx = acntCanvas.getContext('2d');
acntCanvas.width = cWidth;
acntCanvas.height = cHeight;

//Need to make these variables private
let balance=5000, bet=100;

//load balance
var acc = load_cookie("baccarat_acc");
if(acc!=null){
  balance = parseInt(acc);
}else{
  save_cookie("baccarat_acc", balance, 365);
}

//Centers Player, Banker, Tie Buttons
(function(){
  let xPos = Math.floor(cWidth/2)+'px';
  let yPos = Math.floor(cHeight*0.35)+"px";
  var b = document.getElementById('Buttons');
  b.style.width = cWidth+'px';
  b.style.top = yPos;
})()

const accountDisplay=(()=>{
  const account = document.getElementById('Account');
  const chips = document.getElementsByClassName('chips');
  const btns = document.getElementsByClassName('btns');

  const chipValues = [10,50,100];
  let chipSelect= chipValues[0];
  //const chipSize = Math.floor(cWidth/15);
  //const btnSize = Math.floor(cWidth/25);

  const chipSize = 40;
  const btnSize = 40;

  const yCord = cHeight-50;
  const xBalance = cWidth*0.75;
  const acntFont = 20;
  const chipFont = Math.floor(chipSize/5);

  for(let i=0; i<chips.length; i++){chips[i].style.width = chips[i].style.height = chipSize+"px";}

  for(let i=0; i<btns.length; i++){
    btns[i].style.marginBottom = (chipSize-btnSize)/2+"px";
    btns[i].style.width = btns[i].style.height = btnSize+"px";
  }

  //account.style.left = cWidth/4-btnSize-1.5*chipSize+'px';//centers chips at under player symbol
  account.style.left = "10px";
  account.style.top = cHeight-chipSize-cHeight/30+'px';
  account.style.zIndex = 5;

  acntctx.font = acntFont+'px Quantico';
  acntctx.textBaseline = "middle";
  acntctx.textAlign = 'left';
  acntctx.fillStyle = "#ffffff";
  acntctx.fillText('Balance',cWidth-200,yCord);
  acntctx.textAlign = 'right';
  acntctx.fillText(balance,cWidth-10,yCord)

  //Draws under canvas. Fix in future versions
  // const chipValueTextStart = cWidth/4-chipSize;
  // function writeChipValues(){
  //   acntctx.font = chipFont+'px Arial';
  //   acntctx.textAlign = 'center';
  //   let yPos = cHeight-cHeight/30-chipSize/2;
  //   let j=chipValues.length;
  //   for(let i = 0; i<j; i++){//
  //      acntctx.fillText('Test ',chipValueTextStart+i*chipSize,yPos);
  //   }
  // }
  //
  // writeChipValues();

  function displayChipSelected(){
    /*
    let xPos = Math.floor(cWidth/3);
    let yPos = yCord;
    acntctx.font = acntFont+'px Quantico';
    acntctx.textAlign = 'right';
    acntctx.fillText('Chip Value ',xPos,yPos);
    acntctx.textAlign = 'left';
    acntctx.clearRect(xPos,yPos-acntFont/2,acntFont*4,acntFont);
    acntctx.fillText(chipSelect,xPos,yPos);
    */
  }
  displayChipSelected();

  function displayBet(){
    let xPos = xBalance;
    let yPos = yCord+acntFont*1.2;
    acntctx.clearRect(xPos-100,yPos-10,300,acntFont);
    acntctx.font = acntFont+'px Quantico';
    acntctx.textAlign = 'left';
    acntctx.fillStyle = "#ffffff";
    acntctx.fillText('Bet',cWidth-200,yPos);
    acntctx.textAlign = 'right';
    acntctx.fillText(bet,cWidth-10,yPos);
  }
  displayBet();

  function updateBalance(win){
    acntctx.textAlign = 'right';
    acntctx.font = acntFont+'px Quantico';
    acntctx.clearRect(cWidth-110,yCord-10,240,20);
    acntctx.fillText(balance,cWidth-10,yCord)
    //acntctx.fillText(balance,cWidth-10,yCord)

    //save balance
    save_cookie("baccarat_acc", balance, 365);

    if(win>0){
      animations.fadeOut(win,anictx,1,xBalance+acntFont*1.4,yCord,'up',()=>{
        animationCanvas.style.zIndex = 0;
        gamePlay.canPlay=true;
      });
    }else{
      animations.fadeOut(bet,anictx,1,xBalance+acntFont*1.4,yCord,'down',()=>{
        animationCanvas.style.zIndex = 0;
        gamePlay.canPlay=true;
      });
    }
  }

  function blueSelect(){chipSelect=chipValues[0]; displayChipSelected(); incBet();}
  function greenSelect(){chipSelect=chipValues[1]; displayChipSelected(); incBet();}
  function redSelect(){chipSelect=chipValues[2]; displayChipSelected(); incBet();}

  // function setBalance(newBalance){balance=newBalance}
  function decBet(){
    //let newBet = bet-=chipSelect;
    //if(newBet>minBet){bet=newBet;
    //}else{bet=minBet;}

    bet = 0;

    displayBet();
  }

  function incBet(){
    let newBet = bet+=chipSelect;
    if(newBet<maxBet){bet=newBet;
    }else{bet=maxBet;}
    displayBet();
  }

  return{
    updateBalance: updateBalance,
    blueSelect: blueSelect,
    greenSelect: greenSelect,
    redSelect: redSelect,
    incBet: incBet,
    decBet: decBet,
  }

})()

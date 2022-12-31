// Starting game board values
var cardsInDeck;

$( document ).ready(function() {
  get_Cards();
  cardsInDeck = cards;
  updateVisibleChipBalances();
});

var current_turn = "player";
var current_wager = 0;
var currentChipBalance = localStorage.getItem('blackjackChips') || 777;
var gameWinner = "none"; // To be declared at end of game
var isGameOver = false;

var dealer_Hand = [];
var dealerHandTotal = 0;
var dealerGameBoard = $("#dealer");
var dealerStatus = "start"; // Possible statuses are start (initial gameplay), stand, hit

// Player hand and starting totals
var player_Hand = [];
var playerHandTotal = 0;
var playerGameBoard = $("#user-hand");
var playerHandTotalDisplay = $(".hand-total");
var playerStatus = "start";  // Possible statuses are start (initial gameplay), stand, hit

var playerHasAce = false;  

var splitGame = false; // default value is false, must be turned true
var playerSplitHand = [];
var playerSplitHandTotal = 0;
var playerSplitGameBoard = $("#user-split-hand");
var playerSplitHandTotalDisplay = $(".split-hand-total");
var playerSplitStatus;

// Buttons pulled from DOM
var startButton = $("#start-game-button");
var doubleDownButton = $("#double-down-button");
var hitButton = $("#hit-button");
var standButton = $("#stand-button");
var splitButton = $(".split-button");
var playAgainButton = $(".new-game-button"); 

// Deactivates a button (both event listener and appearance)
function disableButton(buttonName) {
	$(buttonName).off();
	$(buttonName).addClass("disabled-button");
}

// Activates a button (both event listener and appearance)
function enableButton(buttonName, event) {
	$(buttonName).click(event);
	$(buttonName).removeClass("disabled-button");
}

// Update chip totals displayed to user throughout the game
function updateVisibleChipBalances() {
	$(".current-wager").text(current_wager);
	$(".current-chip-balance").text(currentChipBalance);
	localStorage.setItem('blackjackChips', currentChipBalance);
}

// Update card hand totals displayed to user throughout the game
function updateVisibleHandTotals() {
	$(playerHandTotalDisplay).text(playerHandTotal);
	$(playerSplitHandTotalDisplay).text(playerSplitHandTotal);

	// If the dealer has not played yet or game is not over, only show value of 1st card
	// as the player is still making their initial moves
	if (dealer_Hand.length === 2 && isGameOver === false && dealerStatus === "start") {
		$(".dealer-hand-total").text(dealerHandTotal - dealer_Hand[1].value);
	} else {
		$(".dealer-hand-total").text(dealerHandTotal);
	}

}

// Called when player clicks on a chip
function selectWager(amount){
	current_wager = amount;
	updateVisibleChipBalances();
}

// 	ANIMATIONS/INTERACTIVITY:
function flipHiddenCard() {
	// If it's just the initial round, first we need to flip/reveal the hidden dealer card when this is called
	if (dealer_Hand.length === 2) {
		$("#dealer-card-1").addClass("flipped");
		setTimeout(function(){
			$("#dealer-card-1").attr("src", "img/" + dealer_Hand[1].src);
			updateVisibleHandTotals();
		}, 250);	
	} 
}

// Used in split game mode, shrinks the inactive deck and totals
function scaleDownDeck(deck, totalDisplay) {
	$(totalDisplay).addClass("splithand-scaledown");
	$(deck).addClass("splithand-scaledown");
}

// Used in split game mode, enlarges the deck and totals when turn active or when
// dome with gameplay
function enlargeDeck(deck, totalDisplay) {
	$(totalDisplay).removeClass("splithand-scaledown");
	$(deck).removeClass("splithand-scaledown");
}

function getLanguage() {
  return navigator.language || navigator.userLanguage;
}

// Toggling rules from main nav gives an animation effect
$(".rules-nav").click(function(){
	$("#rules").toggle("blind", 500);

});

// But clicking close does not provide an animation effect
$("#rules-close").click(function(){
	$("#rules").hide();
});

// Materialize modal
$(".modal").modal({ 
      dismissible: false, 
      opacity: .40, 
      inDuration: 300, 
      outDuration: 200, 
      startingTop: "10%", // Starting top style attribute
      endingTop: "10%", // Ending top style attribute
    }
  );

// EVENT LISTENERS:
$("#chip-10").click(function(){selectWager(10)});
$("#chip-25").click(function(){selectWager(25)});
$("#chip-50").click(function(){selectWager(50)});
$("#chip-100").click(function(){selectWager(100)});

// Button activation
$(startButton).click(startGame);
$(doubleDownButton).click(doubleDown); 
$(hitButton).click(hit);
$(standButton).click(stand);
$(playAgainButton).click(newGame);
$("#reset-game").click(resetGame);

$(".reduce-aces-button").click(   // Can only see this if player draws 2 aces, would only be reducing in 1st deck
	function(){
		reduceAcesValue(player_Hand);
		disableButton(splitButton, split);
}); 

//Roles language

if(getLanguage()=="ko-KR"){
	krRuleAct()
}else{
	enRuleAct()
}


$("#enRoleBtn").click(enRuleAct);
$("#krRoleBtn").click(krRuleAct);

function enRuleAct(){
	$("#enRole").show();
	$("#krRole").hide();
	$("#enRoleBtn").addClass("rulesLanActive");
	$("#krRoleBtn").removeClass("rulesLanActive");
}

function krRuleAct(){
	$("#enRole").hide();
	$("#krRole").show();
	$("#enRoleBtn").removeClass("rulesLanActive");
	$("#krRoleBtn").addClass("rulesLanActive");
}

// This file contains key interactions that will occur after the player has clicked a button

var startGame = function() {
	get_Cards();
	$("#chipsgroup").removeClass("highlightbet");
	if (current_wager === 0) {
		Materialize.toast("You must select a bet to play", 1000);
		$("#chipsgroup").addClass("highlightbet");
	} else if (currentChipBalance < 10) {
		Materialize.toast("You're out of chips! Reset the game to continue" , 2000);
	} else if (currentChipBalance < current_wager) {
		Materialize.toast("Insufficient chip balance, please select a lower bet" , 1500);
	} else {
		currentChipBalance -= current_wager;
		updateVisibleChipBalances();
		$("#welcome").hide();
		$("#game-over").hide();
		$(".brand-logo").text("blackjack"); 
		$("#game-board").show("fade", 1000);
		cardsInDeck = cards;
		cardsInDeck.sort(function() {return 0.5 - Math.random()});
		for (let i = 0; i <= 1; i++) {
			setTimeout(function(){
				current_turn = "player";
				dealCard(player_Hand, playerGameBoard);
				current_turn = "dealer";
				dealCard(dealer_Hand, dealerGameBoard);
			}, i*1500);
		}
		setTimeout(function(){
			current_turn = "player";
			if (player_Hand.length === 2 && player_Hand[0].name === player_Hand[1].name) {
				enableButton(splitButton, split);
			}
		}, 2500);
			
	}
}

var hit = function() {
	if (current_turn === "player") {
		playerStatus = "hit";
		dealCard(player_Hand, playerGameBoard);
	} else if (current_turn === "playerSplit") {
		playerSplitStatus = "hit";
		dealCard(playerSplitHand, playerSplitGameBoard);
	}
}

var stand = function() {
	if (current_turn === "player") {
		changeHand(playerStatus);
	} else if (current_turn === "playerSplit") {
		changeHand(playerSplitStatus);
	}
}

var split = function() {
	splitGame = true; 
	playerHandTotal = playerHandTotal - player_Hand[1].value;
	playerSplitHandTotal = player_Hand[1].value;
	updateVisibleHandTotals();
	$(".split-hand-total").removeClass("inactive").show(); 
	$(playerSplitGameBoard).removeClass("inactive").show();	
	var splitCard = player_Hand.pop();
	playerSplitHand.push(splitCard);
	var card_Image = $("#player-card-1").attr("id", "playerSplit-card-0");

	card_Image.hide(); // Hide it at first to allow for the transition to occur
	// This is the first card in the deck, so want to cancel out the previous offset/stacking and have it go to the initial normal spot
	card_Image.appendTo($(playerSplitGameBoard)).offset({left: 60}).css("margin-right", "auto").show();

	currentChipBalance -= current_wager; 
	current_wager = current_wager * 2;
	updateVisibleChipBalances();

	// Then, deal 1 new card for each newly split deck
	current_turn = "player";
	dealCard(player_Hand, playerGameBoard);
	current_turn = "playerSplit";
	dealCard(playerSplitHand, playerSplitGameBoard);

	// Make split button no longer clickable as in this game you can only split once
	disableButton(splitButton);

	// Shrink the inactive deck to both signal what deck they are playing and to make room on the board
	setTimeout(function(){
		scaleDownDeck(playerSplitGameBoard, playerSplitHandTotalDisplay);
		current_turn = "player"; 
	}, 1000);

}

function doubleDown() {
	if (currentChipBalance - current_wager <= 0) {
		Materialize.toast("Insufficient chip balance" , 1000);
	}
	else {
		currentChipBalance -= current_wager; //subtracts the same value again from current balance
		current_wager = current_wager * 2;
		updateVisibleChipBalances();
		disableButton(doubleDownButton);
	}
}

function newGame() {
	get_Cards();
	$("#chipsgroup").removeClass("highlightbet");
	cardsInDeck = cards;
	gameWinner = "none";
	dealer_Hand = [];
	dealerHandTotal = 0;
	dealerStatus = "start";
	player_Hand = [];
	playerHandTotal = 0;
	playerStatus = "start";  
	playerHasAce = false;  
	splitGame = false; 
	isGameOver = false;
	playerSplitHand = [];
	playerSplitHandTotal = 0;
	playerSplitStatus = "start";

	if (current_wager === 0){
		Materialize.toast("You must select a bet to play", 1000);
		$("#chipsgroup").addClass("highlightbet");
	} else {	
		$(playerSplitGameBoard).hide();
		$(".split-hand-total").hide();
		enableButton(standButton, stand);
		enableButton(hitButton, hit);
		enableButton(doubleDownButton, doubleDown);
		dealerGameBoard.empty();
		playerGameBoard.empty();
		playerSplitGameBoard.empty();
		updateVisibleHandTotals();
		startGame(); 		
	}
}

function resetGame() {
	current_wager = 0;
	currentChipBalance = 777;
	updateVisibleChipBalances();
	location.reload();
}
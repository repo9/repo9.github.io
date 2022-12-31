// This file contains the main logic utilized during active gameplay, before the game is declared over

function dealCard(hand, location) {
	var cardDrawn = cardsInDeck.pop();
	hand.push(cardDrawn);
	var index = hand.length - 1;

	// Create card image for card, hide initially so it doesn't impact transition
	var card_Image = $("<img>").attr("class", "card").attr("src", "img/" + hand[index].src).hide();
	card_Image.attr("id", current_turn + "-card-" + index);

	// To create stacked card effect
	if (index === 0) {
		card_Image.appendTo($(location)).show();
	} else if (index > 0) {
		card_Image.appendTo($(location)).offset({left: -60}).css("margin-right", -60).show();	
	} 
	if (hand[index].name === "ace" && current_turn != "dealer") {
		playerHasAce = true;
	}
	// Note: tried to dry this out by putting totals as a param but couldn't get it working yet
	if (current_turn === "player") {
		playerHandTotal += hand[index].value;
	} else if (current_turn === "playerSplit") {
		playerSplitHandTotal += hand[index].value;
	} else if (current_turn === "dealer") {
		dealerHandTotal += hand[index].value;
	}	
	// Second card only for dealer should show face down
	if (dealer_Hand.length === 2 && current_turn === "dealer") {
		card_Image.attr("src", "img/card_back.png");
	}
	updateVisibleHandTotals();
	evaluateGameStatus();
}

function evaluateGameStatus() {
	// Player can only split or double down after first 2 cards drawn
	if (player_Hand.length === 3 || dealerStatus === "hit") {
		disableButton(doubleDownButton);
		disableButton(splitButton);
	}
	if (current_turn != "dealer") {
		if (playerHasAce === true) {
			if (current_turn === "player") {  // Dry out by having params in here
				reviewAcesValue(player_Hand, playerHandTotal);
			} else if (current_turn === "playerSplit") {
				reviewAcesValue(playerSplitHand, playerSplitHandTotal);
			}	
		} else {
			isPlayerDone();
		}
	}		
	if (current_turn === "dealer" && dealerStatus === "hit") {
		dealerPlay();
	}
}


// The purpose of this function is to detect when a turn should be shifted without the player
// needing to click "stand". This is also an important step for determining what the next move
// is if there is a split deck. 
function isPlayerDone() {
	if (splitGame === false && playerHandTotal >= 21) {
		gameOver();
	} else if (splitGame === true) {
		if (current_turn === "player") {
			if (playerHandTotal === 21) {
				gameOver();
			// If it's a split game, we can't just game over on the first hand if the player goes over
			} else if (playerHandTotal > 21)
				changeHand(playerStatus); 
		} else if (current_turn === "playerSplit") {
			if (playerSplitHandTotal === 21) {
				gameOver();
			} else if (playerSplitHandTotal > 21) {
				// If the player was under 21 in their first game, the dealer should play before gameover
				if (playerHandTotal < 21) { 
					changeHand(playerSplitStatus);
				} else {
					gameOver();
				}
			}
		}
	}
}

function changeHand(currentDeckStatus) {
	currentDeckStatus = "stand";
	if (current_turn === "player") {		
		if (splitGame === true) {
			current_turn = "playerSplit";
			// Scale down the player deck as we change turns, but only on split hand
			scaleDownDeck(playerGameBoard, playerHandTotalDisplay);
			enlargeDeck(playerSplitGameBoard, playerSplitHandTotalDisplay);
		} else if (splitGame === false) {
			current_turn = "dealer";
			dealerStatus = "hit";
		}
	} else if (current_turn === "playerSplit") {
		current_turn = "dealer";
		dealerStatus = "hit";
	}
	evaluateGameStatus(); 
}

function reviewAcesValue(hand, total) {	
	if (total > 21) {
		// If they have exactly 2 aces in the first draw, prompt them to choose to split or not
		if (hand.length === 2) {  
			enableButton(splitButton, split);
			$("#two-aces-prompt").modal("open");
		// Otherwise, just reduce the aces value so they are no longer over 21
		} else if (hand.length > 2) {
			reduceAcesValue(hand);
			isPlayerDone();
		}
	} else {
		isPlayerDone();
	}
}

function reduceAcesValue(deck) {
	for (var i = 0; i < deck.length; i++) {  
		if (deck[i].name === "ace" && deck[i].value === 11) { // Only focusing on aces that haven't been changed from 11 to 1 already
			deck[i].value = 1;
			if (current_turn === "player") {
				playerHandTotal -= 10;
			} else if (current_turn === "playerSplit") {
				playerSplitHandTotal -= 10;
			}
			updateVisibleHandTotals();
			Materialize.toast("Your ace value changed from 11 to 1", 1500);
		}	
	}
}

function dealerPlay() {
	flipHiddenCard();
	disableButton(standButton);
	disableButton(hitButton);
	disableButton(splitButton);
	// The below logic is based on standard blackjack rules
	if (dealerHandTotal < 17) {
		setTimeout(function(){
			dealCard(dealer_Hand, dealerGameBoard);
		}, 1000);
	} else if (dealerHandTotal >= 21) {
		setTimeout(function(){
			gameOver();
		}, 1100);
	} else if (dealerHandTotal >= 17) {
		setTimeout(function(){
			dealerStatus = "stand";
			gameOver();
		}, 1100);
	}
}
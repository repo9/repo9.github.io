//Full array of possible cards
var cards;

function get_Cards(){
	cards = [
		{ 
			"suit": "clubs",
			"name": "2",
			"src": "club/2.png",
			"value": 2
		},
		{ 
			"suit": "clubs",
			"name": "3",
			"src": "club/3.png",
			"value": 3
		},
		{ 
			"suit": "clubs",
			"name": "4",
			"src": "club/4.png",
			"value": 4
		},
		{ 
			"suit": "clubs",
			"name": "5",
			"src": "club/5.png",
			"value": 5
		},
		{ 
			"suit": "clubs",
			"name": "6",
			"src": "club/6.png",
			"value": 6
		},
		{ 
			"suit": "clubs",
			"name": "7",
			"src": "club/7.png",
			"value": 7
		},
		{ 
			"suit": "clubs",
			"name": "8",
			"src": "club/8.png",
			"value": 8
		},
		{ 
			"suit": "clubs",
			"name": "9",
			"src": "club/9.png",
			"value": 9
		},
		{ 
			"suit": "clubs",
			"name": "10",
			"src": "club/10.png",
			"value": 10
		},
		{ 
			"suit": "clubs",
			"name": "ace",
			"src": "club/a.png",
			"value": 11
		},
		{ 
			"suit": "clubs",
			"name": "jack",
			"src": "club/j.png",
			"value": 10
		},
		{ 
			"suit": "clubs",
			"name": "king",
			"src": "club/k.png",
			"value": 10
		},
		{ 
			"suit": "clubs",
			"name": "queen",
			"src": "club/q.png",
			"value": 10
		},
		{ 
			"suit": "diamonds",
			"name": "2",
			"src": "diamond/2.png",
			"value": 2
		},
		{ 
			"suit": "diamonds",
			"name": "3",
			"src": "diamond/3.png",
			"value": 3
		},
		{ 
			"suit": "diamonds",
			"name": "4",
			"src": "diamond/4.png",
			"value": 4
		},
		{ 
			"suit": "diamonds",
			"name": "5",
			"src": "diamond/5.png",
			"value": 5
		},
		{ 
			"suit": "diamonds",
			"name": "6",
			"src": "diamond/6.png",
			"value": 6
		},
		{ 
			"suit": "diamonds",
			"name": "7",
			"src": "diamond/7.png",
			"value": 7
		},
		{ 
			"suit": "diamonds",
			"name": "8",
			"src": "diamond/8.png",
			"value": 8
		},
		{ 
			"suit": "diamonds",
			"name": "9",
			"src": "diamond/9.png",
			"value": 9
		},
		{ 
			"suit": "diamonds",
			"name": "10",
			"src": "diamond/10.png",
			"value": 10
		},
		{ 
			"suit": "diamonds",
			"name": "ace",
			"src": "diamond/a.png",
			"value": 11
		},
		{ 
			"suit": "diamonds",
			"name": "jack",
			"src": "diamond/j.png",
			"value": 10
		},
		{ 
			"suit": "diamonds",
			"name": "king",
			"src": "diamond/k.png",
			"value": 10
		},
		{ 
			"suit": "diamonds",
			"name": "queen",
			"src": "diamond/q.png",
			"value": 10
		},
		{ 
			"suit": "hearts",
			"name": "2",
			"src": "heart/2.png",
			"value": 2
		},
		{ 
			"suit": "hearts",
			"name": "3",
			"src": "heart/3.png",
			"value": 3
		},
		{ 
			"suit": "hearts",
			"name": "4",
			"src": "heart/4.png",
			"value": 4
		},
		{ 
			"suit": "hearts",
			"name": "5",
			"src": "heart/5.png",
			"value": 5
		},
		{ 
			"suit": "hearts",
			"name": "6",
			"src": "heart/6.png",
			"value": 6
		},
		{ 
			"suit": "hearts",
			"name": "7",
			"src": "heart/7.png",
			"value": 7
		},
		{ 
			"suit": "hearts",
			"name": "8",
			"src": "heart/8.png",
			"value": 8
		},
		{ 
			"suit": "hearts",
			"name": "9",
			"src": "heart/9.png",
			"value": 9
		},
		{ 
			"suit": "hearts",
			"name": "10",
			"src": "heart/10.png",
			"value": 10
		},
		{ 
			"suit": "hearts",
			"name": "ace",
			"src": "heart/a.png",
			"value": 11
		},
		{ 
			"suit": "hearts",
			"name": "jack",
			"src": "heart/j.png",
			"value": 10
		},
		{ 
			"suit": "hearts",
			"name": "king",
			"src": "heart/k.png",
			"value": 10
		},
		{ 
			"suit": "hearts",
			"name": "queen",
			"src": "heart/q.png",
			"value": 10
		},
		{ 
			"suit": "spades",
			"name": "2",
			"src": "spade/2.png",
			"value": 2
		},
		{ 
			"suit": "spades",
			"name": "3",
			"src": "spade/3.png",
			"value": 3
		},
		{ 
			"suit": "spades",
			"name": "4",
			"src": "spade/4.png",
			"value": 4
		},
		{ 
			"suit": "spades",
			"name": "5",
			"src": "spade/5.png",
			"value": 5
		},
		{ 
			"suit": "spades",
			"name": "6",
			"src": "spade/6.png",
			"value": 6
		},
		{ 
			"suit": "spades",
			"name": "7",
			"src": "spade/7.png",
			"value": 7
		},
		{ 
			"suit": "spades",
			"name": "8",
			"src": "spade/8.png",
			"value": 8
		},
		{ 
			"suit": "spades",
			"name": "9",
			"src": "spade/9.png",
			"value": 9
		},
		{ 
			"suit": "spades",
			"name": "10",
			"src": "spade/10.png",
			"value": 10
		},
		{ 
			"suit": "spades",
			"name": "ace",
			"src": "spade/a.png",
			"value": 11
		},
		{ 
			"suit": "spades",
			"name": "jack",
			"src": "spade/j.png",
			"value": 10
		},
		{ 
			"suit": "spades",
			"name": "king",
			"src": "spade/k.png",
			"value": 10
		},
		{ 
			"suit": "spades",
			"name": "queen",
			"src": "spade/q.png",
			"value": 10
		}
	]
}

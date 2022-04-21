//initialize variables
var letters = ["X", "O"]
var userTurn = 0;
var totals = [];
var winnerNums = [7, 56, 73, 84, 146, 273, 292, 448];
var i, j;
var gameOver;
var formDiv = document.getElementById("userForm");
var playAgain = document.getElementById("startAgain");

//hide play again button
playAgain.classList.add("hidden");

//initialize scores
var usersScores = [0,0,0];
var catsScore = 0;

function startGame(){
	//get unernames
	userOne = document.getElementById("playerOne").value;
	userTwo = document.getElementById("playerTwo").value;
	var users = [userOne,userTwo];
	//hide form
	formDiv.classList.remove("show");
	formDiv.classList.add("hidden");
	//hide play again button
	playAgain.classList.add("hidden");
	
	//build game board
	var gameBoard = document.getElementById("game-board");
	var innerDivs = "";
	var counter = 1;
	for (i = 1; i <= 3; i++){
		innerDivs += '<div id = "row-' + i + '">';
		for(j = 1; j <= 3; j ++){
			innerDivs += '<div onclick="playGame(this, ' + counter + ');"></div>';
			counter *= 2;
		}
		innerDivs += '</div>';
	}
	gameBoard.innerHTML = innerDivs;
	
	//initialize elements
	document.getElementById("game-message").innerText = "It's " + users[userTurn] + "'s Turn";
	totals = [0, 0];
	gameOver = false;
	
	//build score board
	var scoreBoard = document.getElementById("score-board");
	var innerTags = "";
	innerTags += '<h2>Score Board</h2>';
	innerTags += '<p>' + users[0] + ': ' + usersScores[0] + '</p>';
	innerTags += '<p>' + users[1] + ': ' + usersScores[1] + '</p>';
	innerTags += '<p>Cats: ' + usersScores[2] + '</p>';
	scoreBoard.innerHTML = innerTags;
	scoreBoard.classList.add("scoreboard");
}
function playGame(clickedDiv, divValue){
	//get unernames
	userOne = document.getElementById("playerOne").value;
	userTwo = document.getElementById("playerTwo").value;
	var users = [userOne,userTwo];
	
	//run code if no player has won
	if (!gameOver)
	{
		//insert letters
		clickedDiv.innerText = letters[userTurn];
		//add together the totals for each player
		totals[userTurn] += divValue;
		
		//create a loop to see if one of the players won
		if (isWin())
		{
			document.getElementById("game-message").innerText = users[userTurn] + " wins!";
			usersScores[userTurn] += 1;
		}
		//see if the players tied
		else if (gameOver){
			document.getElementById("game-message").innerText = "Darn, it's a cat's game!";
			usersScores[2] += 1;
			
		}
		else{
			if (userTurn) userTurn = 0;
			else userTurn = 1;
			//stop user from clicking a div that's already been selected
			clickedDiv.attributes["0"].nodeValue = "";
			//switch title to show whose turn it is
			document.getElementById("game-message").innerText = "It's " + users[userTurn] + "'s Turn";
		}
	}
}
//check to see if a player won
function isWin(){
	for (i = 0; i < winnerNums.length; i++){
		if((totals[userTurn] & winnerNums[i]) == winnerNums[i]){
			gameOver = true;
			playAgain.classList.toggle("hidden");
			return true;
		}
	}
	//see if game is a tie
	if (totals[0] + totals[1] == 511){
		gameOver = true;
		playAgain.classList.toggle("hidden");
	}
	return false;
}
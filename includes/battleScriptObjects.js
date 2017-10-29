// This is Sloth's attempt at integrating objects.

// When the awesome code below is complete, wrap it into a self-executing function for testing on the website.

// Variable game parameters

var userHealthDefault = 40; // Total health for the game
var grantHealthDefault = 10; // This is health *per round*
var minHealth = 0; // The minimum health total for a player during battle
var grantName = "The Almighty Grant"; // Change this to revise Grant's name throughout the script.
var totalRoundsNeededToWin = 3;
var userMinDamage = 1;
var userMaxDamage = 3;
var grantMinDamage = 1;
var grantMaxDamage = 5;
var userHealMin = 1;
var userHealMax = 10;
var totalNumberOfHeals = 2;
var gameWinner; // This is the one variable we're passing out of the startGame() battle code and therefore needs to be declared globally.
var continueToPlay; // This also must be a global variable; this is a kill game switch.

// This Lab requires the user character and Grant to be objects.

var userCharacter = {
	name: "", 
	health: 0, 
	wins: 0,
	healCount: 0, 
	heal: function (min, max) {
		var userHeal = getRandomInt(min, max);
		return userHeal;
	},
	attack: function (min, max) {
		var userAttack = getRandomInt(min, max);
		return userAttack;
	},
};

var grantChirpus = {
	name: grantName,
	health: 0,
	wins: 0,
  	attack: function (min, max) {
		var grantAttack = getRandomInt(min, max);
		return grantAttack;
	},
};

// And now... the code for the game, all called within functions:

startGame();
getUserName();
startCombat();
endOfGame();

// startGame() includes the "Do you want to play?" prompt and forces a "y" or "n" answer via a do while loop.

function startGame() {
	do {
    	var playResponse = window.prompt("Do you dare to enter the dungeon of " + grantChirpus.name + "? (Y/N)", "Y");
		if (playResponse === null || playResponse.toLowerCase() == "n" || playResponse.toLowerCase() == "no") {
			window.alert("You have indicated that you do not wish to play.  Clearly, you are no match for " + grantChirpus.name + "!");
			continueToPlay = "no";
			return;
		} else if (playResponse.toLowerCase() == "y" || playResponse.toLowerCase() == "yes") {
			window.alert("So; you believe you can defeat " + grantChirpus.name + " " + totalRoundsNeededToWin + " times with a total of " + userHealthDefault + " health?  We shall see!");
			continueToPlay = "yes";
			return;
		} else {
			window.alert("Please indicate your desire to play with (Y)es or (N)o.");
			continueToPlay = "undecided";
		}
	}	
	while (continueToPlay !== "yes" && continueToPlay !== "no");
}

// getUserName() will ask the player for his or her character name, assuming the continueToPlay kill switch has not been thrown to "no".

function getUserName() {
	if (continueToPlay == "yes") {
		do {
			var getName = prompt("Please enter your Wizard name.");
			if (getName !== null) {
				userCharacter.name = getName;
			} else {
				window.alert("Please enter a name to continue.");
			}
		}
		while (getName === null);
	} else if (continueToPlay == "no") {
		return;
	}
}

// getRandomInt() generates a random integer between min and max.

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// turnPrompt() is a window prompt which asks the player if he or she wishes to continue the game, quit, or use a healing potion.

function turnPrompt () {
	do {
		var continueOrHeal = window.prompt("Current health totals are:  " + userCharacter.name + ": " + userCharacter.health + "; " + grantChirpus.name + ": " + grantChirpus.health + ".  Do you wish to (C)ontinue, (E)scape, or (H)eal?", "C");
		if (continueOrHeal === null) {
			window.alert("Please select (C)ontinue, (E)scape, or (H)eal.");
			continueToPlay = "undecided";
		} else if (continueOrHeal.toLowerCase() == "c") {
			window.alert("The battle continues!");
			continueToPlay = "yes";
			return;
		} else if (continueOrHeal.toLowerCase() == "e") {
			window.alert("You cowardly cur!");
			continueToPlay = "no";
			return;
		} else if (continueOrHeal.toLowerCase() == "h") {
			if (userCharacter.healCount < totalNumberOfHeals) {
				userCharacter.health = userCharacter.health + userCharacter.heal(userHealMin, userHealMax);
				userCharacter.healCount = userCharacter.healCount + 1;
				var healsRemaining = totalNumberOfHeals - userCharacter.healCount;
				window.alert("You pop the cork on a healing potion and drink deeply.  Your total health has increased to " + userCharacter.health + "!  You now have " + healsRemaining + " portions remaining.");
				continueToPlay = "undecided";
			} else if (userCharacter.healCount >= totalNumberOfHeals) {
				window.alert("Dude; didn't we just tell you that you have " + healsRemaining + " potions left?  Either flee or stand your ground and fight!");
				continueToPlay = "undecided";
			} 
		} else {
			window.alert("Please select (C)ontinue, (E)scape, or (H)eal.");
			continueToPlay = "undecided";
		}
	}
	while (continueToPlay !== "yes" && continueToPlay !== "no");
}

// damageResolution() causes damage to both Grant and the user character and returns the value to the interface.

function damageResolution (turnNumber) {

	console.log("Turn " + turnNumber + ".  " + userCharacter.name + " and " + grantChirpus.name + " both attack!");

	var userDamage = userCharacter.attack(userMinDamage, userMaxDamage);
	grantChirpus.health = grantChirpus.health - userDamage;
	var grantDamage = grantChirpus.attack(grantMinDamage, grantMaxDamage);
	userCharacter.health = userCharacter.health - grantDamage;

	if (userDamage === 0) {
		console.log("Bummer!  " + userCharacter.name + " misses " + grantChirpus.name + ", dealing " + userDamage + " damage.  " + grantChirpus.name + " still has " + grantChirpus.health + " health.");
	} else {
		console.log("YES!  " + userCharacter.name + " deals " + userDamage + " damage of pain to " + grantChirpus.name + "!  " + grantChirpus.name + " now has " + grantChirpus.health + " health.");
	}

	if (grantDamage === 0) {
		console.log("Ha!  " + grantChirpus.name + " misses " + userCharacter.name + " completely, dealing " + grantDamage + " damage.  " + userCharacter.name + " still has " + userCharacter.health + " health.");
	} else {
		console.log("Ouch!  " + grantChirpus.name + " deals " + grantDamage + " damage to " + userCharacter.name + ".  " + userCharacter.name + " now has " + userCharacter.health + " health.");
	}

}

// battleRoundLoop() is a while loop for a round of battle.  The round ends when either the player or Grant is reduced to the minimum health.

function battleRoundLoop() {

	var turnNumber = 0;

	window.alert("You face " + grantChirpus.name + " with a feral smile.  Let the battle begin!")

	while (userCharacter.health > minHealth && grantChirpus.health > minHealth) {



		// Call the turnPrompt() function and kill the game if kill switch is triggered.  Otherwise, allow damage to occur.

		turnPrompt();

		turnNumber = turnNumber + 1;

		if (continueToPlay == "no") {
			return;
		} else {
			damageResolution(turnNumber);
		}

	}

	roundWinnerDetermination();

	console.log("---- End of Round ----");

}

// roundWinnerDetermination() figures out which player wins a round and adjusts the win totals appropriately.

function roundWinnerDetermination() {
	if (userCharacter.health > grantChirpus.health) {
		userCharacter.wins = userCharacter.wins + 1;
		window.alert(grantChirpus.name + " has been reduced to " + grantChirpus.health + " health.  " + userCharacter.name + " wins the round!  Awesome!");
	} else if (grantChirpus.health > userCharacter.health) {
		grantChirpus.wins = grantChirpus.wins + 1;
		window.alert(userCharacter.name + "has been reduced to " + userCharacter.health + " health and " + grantChirpus.name + " emerges victorious!  How can this be?");
	} else {
		window.alert("No one wins.  The round ends in a draw, " + userCharacter.health + " to " + grantChirpus.health + ".");
	}
}

// startCombat() is the main meat of the game.  It includes a while loop which will run rounds of battle until the player is defeated or Grant is defeated X number of times.

function startCombat() {

	// Set initial health settings

	userCharacter.health = userHealthDefault;

	// declare and set initial round number...

	var roundNumber = 0;

  	// This while loop ensures that the game continues until either the total number of rounds needed to win is achives, or the user's health reaches the min value.

	while (userCharacter.wins < totalRoundsNeededToWin && userCharacter.health > minHealth && continueToPlay == "yes") {

		// Prep for new round - Grant's health is reset to default and the round number is increased by one.

		grantChirpus.health = grantHealthDefault;
		roundNumber = roundNumber + 1;

		console.log("ROUND " + roundNumber);
		console.log("Current health totals:  " + userCharacter.name + " " + userCharacter.health + "; " + grantChirpus.name + " " + grantChirpus.health + ".");
		console.log("Current total round wins for " + userCharacter.name + ":  " + userCharacter.wins + ".");

		battleRoundLoop();

	}

	gameWinnerDetermination();	

  	return;

}

// gameWinnerDetermination() figures out who won the game and declares the winner using the gameWinner variable.

function gameWinnerDetermination() {
	if (userCharacter.wins === totalRoundsNeededToWin) {
  		gameWinner = userCharacter.name;
  	} else if (userCharacter.health <= minHealth) {
  		gameWinner = grantChirpus.name;
  	} else {
  		gameWinner = "No one";
  	}
  	return;
}

// endOfGame() displays appropriate text based upon the results of the game.

function endOfGame() {

	if (continueToPlay == "no") {
		window.alert("Sharpen up those battle skills and come back when you're ready!");
	} else if (gameWinner == grantChirpus.name) {
		window.alert("You have been defeated in heated battle.  Better luck next time, " + userCharacter.name + "!");
	} else if (gameWinner == userCharacter.name) {
		window.alert("Congrats!  " + grantChirpus.name + " has been utterly defeated.  We knew you had it in you, " + userCharacter.name + "; well done indeed!");
	} else {
		window.alert("Wait a minute... we can't figure out what happened here.  Did " + gameWinner + " win?  This code is seriously flawed!");
	}	

}


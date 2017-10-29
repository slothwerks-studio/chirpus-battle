
// When the awesome code below is complete, wrap it into a self-executing function for use on the website.

// Variable game parameters

var userHealthDefault = 40; // Total health for the game
var grantHealthDefault = 10; // This is health *per round*
var grantName = "the Almighty Grant"; // Change this to revise Grant's name throughout the script.
var totalRoundsNeededToWin = 3;
var minDamage = 1;
var maxDamage = 5;
var gameWinner; // This is the one variable we're passing out of the startGame() battle code and therefore needs to be declared globally.
var doYouWantToContinue; // This also must be a global variable, as it is used to determine some of the post-game text.

// This Lab requires the start of the game and the battle loop itself to be within functions.

if (startGame() === true) {
  
	var userName = prompt("Please enter your Wizard name.");

	startCombat(); // startCombat includes the entire battle sequence loop from start to finish.

	// Responses to winner declaration

	if (doYouWantToContinue === false) {
		console.log("Sharpen up those battle skills and come back when you're ready, " + userName + "!");
	} else if (gameWinner == grantName) {
		console.log("You have been defeated in heated battle.  Better luck next time, " + userName + "!");
	} else if (gameWinner == userName) {
		console.log("Congrats!  " + grantName + " has been utterly defeated.  We knew you had it in you, " + userName + "; well done indeed!");
	} else {
		console.log("Wait a minute... we can't figure out what happened here.  Did " + gameWinner + " win?  This code is seriously flawed!");
	}	

} else {

  console.log("This script will need to be re-run in order to play.");
  
}

// getDamage() generates a random integer between min and max.

function getDamage(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// startGame() determines if the user wishes to play the game.

function startGame() {
	var playResponse = window.prompt("Do you dare to enter the dungeon of " + grantName + "? (Y/N)", "Y");
	if (playResponse.toLowerCase() == "y") {
		window.alert("So; you believe you can defeat " + grantName + " " + totalRoundsNeededToWin + " times with a total of " + userHealthDefault + " health?  We shall see!");
		return true;
	} else {
		window.alert("You have indicated that you do not wish to play... or cannot follow simple Y/N prompts effectively.  Either way, you shall be no match for " + grantName + "!");
		return false;
	}
}

// startCombat() includes the full battle loop, which consists of two nested while loops (one for the game and one for each round of combat within the game).

function startCombat() {

	// Set initial health settings

	var userHealthTotal = userHealthDefault;
  	var grantHealthTotal = grantHealthDefault;
  	var minHealth = 0;

  	// Set initial win totals...

  	var userWinTotal = 0;
	var grantWinTotal = 0;

	// declare and set initial round number...

	var roundNumber = 0;

  	// This "outer" while loop ensures that the game continues until either the total number of rounds needed to win is achives, or the user's health reaches the min value.

	while (userWinTotal < totalRoundsNeededToWin && userHealthTotal > minHealth) {

		// Prep for new round - Grant's health is reset to default; # of turns is reset to zero, and the round number is increased by one.

		grantHealthTotal = grantHealthDefault;
		var turnNumber = 0;
		roundNumber = roundNumber + 1;

		console.log("ROUND " + roundNumber);
		console.log("Current health totals:  " + userName + " " + userHealthTotal + "; " + grantName + " " + grantHealthTotal + ".");
		console.log("Current total round wins for " + userName + ":  " + userWinTotal + ".");

		// This "inner" while loop ensures that the round continues until either Grant or the user's health total reaches the min value.

		while (userHealthTotal > minHealth && grantHealthTotal > minHealth) {

			// The following if else statement offer the choice to quit after each turn.  It will not kick in until after turn 1 has occurred, since the user just agreed to play.

			if (turnNumber !== 0) {

	  			if (window.confirm("Had enough?  Should " + userName + " continue to fight " + grantName + "?") === false) {
	  				console.log("You cowardly cur!");
	  				doYouWantToContinue = false;
	  				return
	  			} else {
	  				console.log("The battle continues!");
	  				doYouWantToContinue = true;
	  			}
			
			}

			turnNumber = turnNumber + 1;

			console.log("Turn " + turnNumber + ".  " + userName + " and " + grantName + " both attack!");

			var userDamage = getDamage(minDamage, maxDamage);
			grantHealthTotal = grantHealthTotal - userDamage;
			var grantDamage = getDamage(minDamage, maxDamage);
			userHealthTotal = userHealthTotal - grantDamage;

			if (userDamage === 0) {
				console.log("Bummer!  " + userName + " misses " + grantName + ", dealing " + userDamage + " damage.  " + grantName + " still has " + grantHealthTotal + " health.");
			} else {
				console.log("YES!  " + userName + " deals " + userDamage + " damage of pain to " + grantName + "!  " + grantName + " now has " + grantHealthTotal + " health.");
			}

			if (grantDamage === 0) {
				console.log("Ha!  " + grantName + " misses " + userName + " completely, dealing " + grantDamage + " damage.  " + userName + " still has " + userHealthTotal + " health.");
			} else {
				console.log("Ouch!  " + grantName + " deals " + grantDamage + " damage to " + userName + ".  " + userName + " now has " + userHealthTotal + " health.");
			}
		  
		}

		// Round winner determination

		if (userHealthTotal > grantHealthTotal) {
			userWinTotal = userWinTotal + 1;
			console.log(grantName + " has been reduced to " + grantHealthTotal + " health.  " + userName + " wins the round!  Awesome!");
		} else  if (grantHealthTotal > userHealthTotal) {
			grantWinTotal = grantWinTotal + 1;
			console.log(grantName + " emerges victorious.  How can this be?");
		} else {
			console.log("No one wins.  The round ends in a draw, " + userHealthTotal + " to " + grantHealthTotal + ".");
		}

		console.log("------------------------");

	}

    // Game winner determination

  	if (userWinTotal === totalRoundsNeededToWin) {
  		gameWinner = userName;
  	} else if (userHealthTotal <= minHealth) {
  		gameWinner = grantName;
  	} else {
  		gameWinner = "No one";
  	}
  	
  	return

}
	

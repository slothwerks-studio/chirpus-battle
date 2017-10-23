var userDamage;
var grantDamage;
var userHealthTotal;
var grantHealthTotal;
var userHealthDefault = 40;
var grantHealthDefault = 10;
var userWinTotal = 0;
var grantWinTotal = 0;
var gameWinner;
var userName;
var grantName = "The Almighty Grant";
var turnNumber = 0;
var roundNumber = 0;
var totalRoundsNeededToWin = 3;
var minHealth = 0;
var minDamage = 1;
var maxDamage = 5;
var playResponse;
var doYouWantToContinue;

// This Lab requires the start of the game and the battle loop itself to be within functions.

if (startGame() === true) {
  
	userName = prompt("Please enter your Wizard name.");

	startCombat();

	if (doYouWantToContinue === false) {
	console.log("Sharpen up those battle skills and come back when you're ready, " + userName + "!");
	} else if (gameWinner == grantName) {
		console.log("You have been defeated in heated battle.  Better luck next time, " + userName + "!");
	} else if (gameWinner == userName) {
		console.log("Congrats!  " + grantName + " has been utterly defeated.  We knew you had it in you, " + userName + "; well done indeed!");
	} else {
		console.log("Ummmmm... how did no one win?  This code is seriously flawed!");
	}	

} else {

  console.log("Very well; back to your regularly scheduled programming.");
  
}

function getDamage(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// startGame() determines if the user wishes to play the game.

function startGame() {
	playResponse = window.prompt("Do you dare to enter the dungeon of the Almighty Grant? (Y/N)", "Y");
	if (playResponse.toLowerCase() == "y") {
		window.alert("So; you believe you can defeat " + grantName + " " + totalRoundsNeededToWin + " times with a total of " + userHealthDefault + " health?  We shall see!");
		return true;
	} else {
		window.alert("You have indicated that you do not wish to play... or cannot follow simple Y/N prompts effectively.  Either way, you shall be no match for " + grantName + "!");
		return false;
	}
}

function startCombat() {

	// Set initial health totals

	userHealthTotal = userHealthDefault;
  	grantHealthTotal = grantHealthDefault;

  	// This "outer" while loop ensures that the game continues until either the total number of rounds needed to win is achives, or the user's health reaches the min value.

	while (userWinTotal < totalRoundsNeededToWin && userHealthTotal > minHealth) {

		// Prep for new round - Grant's health is reset to default; # of turns is reset to zero, and the round number is increased by one.

		grantHealthTotal = grantHealthDefault;
		roundNumber = roundNumber + 1;
		turnNumber = 0;

		console.log("ROUND " + roundNumber);
		console.log("Current health totals:  " + userName + " " + userHealthTotal + "; " + grantName + " " + grantHealthTotal + ".");
		console.log("Current total round wins for " + userName + ":  " + userWinTotal + ".");

		// This "inner" while loop ensures that the round continues until either Grant or the user's health total reaches the min value.

		while (userHealthTotal > minHealth && grantHealthTotal > minHealth) {
			
			turnNumber = turnNumber + 1;

			console.log("Turn " + turnNumber + ".  " + userName + " and " + grantName + " both attack!");

			userDamage = getDamage(minDamage, maxDamage);
			grantHealthTotal = grantHealthTotal - userDamage;
			grantDamage = getDamage(minDamage, maxDamage);
			userHealthTotal = userHealthTotal - grantDamage;

			if (userDamage === 0) {
				console.log("Bummer!  " + userName + " misses " + grantName + ", dealing " + userDamage + " damage.");
				console.log(grantName + " still has " + grantHealthTotal + " health.");
			} else {
				console.log("YES!  " + userName + " deals " + userDamage + " damage of pain to " + grantName + "!");
				console.log(grantName + " now has " + grantHealthTotal + " health.");
			}

			if (grantDamage === 0) {
				console.log("Ha!  " + grantName + " misses " + userName + " completely, dealing " + grantDamage + " damage.");
				console.log(userName + " still has " + userHealthTotal + " health.");
			} else {
				console.log("Ouch!  " + grantName + " deals " + grantDamage + " damage to " + userName + ".");
				console.log(userName + " now has " + userHealthTotal + " health.");
			}
			
			if (userHealthTotal > minHealth && grantHealthTotal > minHealth) {

  			if (window.confirm("Had enough?  Should " + userName + " continue to fight " + grantName + "?") === false) {
  				console.log(userName + ", you cowardly cur!  Stand your ground and fight!");
  				userHealthTotal = 0;
  				doYouWantToContinue = false;
  			} else {
  				console.log("Very well, then; the battle continues!");
  				doYouWantToContinue = true;
  			}
			
			}
		  
		}

		/* These statements may not work given the method used to end the battle round while loop...

		console.log("End of the round, y'all!");
		console.log(userName + " has " + userHealthTotal + " health.");
		console.log(grantName + " has " + grantHealthTotal + " health.");

		*/

		// Round winner determination

		if (userHealthTotal > grantHealthTotal) {
			userWinTotal = userWinTotal + 1;
			console.log(userName + " wins the round!  Awesome!");
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
  	
  	return gameWinner;

}
	

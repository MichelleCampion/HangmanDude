import React, {Component} from 'react';
import './App.css';
import Modal from 'react-modal';

//importing data - eg word database, starting image, list of letters
import {alphabet} from './Alphabet';
import {buttonDisabled} from './Alphabet';
import {words} from './AllWords';
import startPic from './startPic.png';

//importing other Components
import Letters from './Letters';
import GameOver from './GameOver';
import Winner from './Winner';
import ImageDisplay from './ImageDisplay';


//style properties for modal - used for 'Quit Game' button
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


//creating local copy of imported data:

//letters of the alphabet for users to make a guess - these will be displayed as buttons
const localAlphabet = alphabet; 

/*
 * boolean array to indicate whether letters have been chosen or not - used for disabling buttons
 * all values in array set to false to begin with
 * as letters are chosen, the corresponding boolean variables are set to true 
*/
const booleansForButtons = buttonDisabled;


//local dictionary object - used to generate random word for game
const localWords = words;


//options for drop-down menu - user can select difficulty level
//the chosen value will be used to filter words in the dictionary by word length
const difficulty = [
	{"level": "Choose your difficulty level"},
	{"level": "Easy", "description": "(3-5 letters)"},
	{"level": "Medium", "description": "(6-7 letters)"},
	{"level": "Hard", "description": "(8+ letters)"}
	];

/*
 * function to generate random word from word object array passed as parameter
 * this will mean the word is chosen based on the difficulty level  
 * chosen by the user (from a new array returned by filter function)
*/
function generateRandomWord(wordObjectsArray)
{
	let randomIndex = Math.floor(Math.random()*wordObjectsArray.length);
	return wordObjectsArray[randomIndex].word;			
}

/*	
 * function for creating array version of word to guess including spaces between letters
 * this array will be used to compare user guesses with individual letters in the rando m word
*/
function wordToArrayOfLetters(randomWord)
{
	const wordToGuess = [];						
	for(let i=0; i<randomWord.length; i++)
	{
		wordToGuess[i*2]= randomWord.charAt(i);
		wordToGuess[i*2+1] = " ";
	}
	return wordToGuess;
}

/*
 * function to generate array to represent the game word as underscore characters to show users how many letters there are to guess
 * this will be displayed when the game is started and updated when correct letters are chosen until there are no underscores remaining
 * and the game is won
*/
function startingDashes(randomWord)
{
	const dashes = [];
	for(let i=0; i<randomWord.length; i++)
	{
		dashes[i*2]="__";
		dashes[i*2+1]=" "; 		//including spaces between underscore characters so each character is easier to see
	}
	return dashes;
}


let numGuesses = 12;
// determines the number of wrong guesses allowed in game. This value is 
// passed to the state variable guessesRemaining


class App extends Component{
    
	constructor(props)
	{
		super(props);
		
		// initially setting default/arbitrary values for state variables: userDifficulty, words, randomWord, 
		// randomWordArray and dashLine as these will be updated when difficulty level is selected
		
		this.state={	
			userDifficulty: "",	
			playClicked: false,
			words: localWords,
			randomWord: "",
			randomWordArray: [],
			dashLine: [],
			guessesRemaining: numGuesses,
			alphabet: localAlphabet,
			booleanForButton: booleansForButtons,
			modalIsOpen: false
		};
		
		this.checkWordArrayForGuess = this.checkWordArrayForGuess.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.handleListChange = this.handleListChange.bind(this);
		this.handlePlayButton = this.handlePlayButton.bind(this);
		
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	
	// open modal when 'Quit Game' button is clicked
	openModal() 
	{
		this.setState({modalIsOpen: true});
	}
	
	// close modal if player decides not to quit the game
	closeModal() 
	{
		this.setState({modalIsOpen: false});
	}
	
	// callback for filter function - used when filtering words based on user difficulty selection
	findWords(length1, length2)
	{
		return function(wordsObject)
		{
			return (wordsObject.word.length >= length1 && wordsObject.word.length <= length2);
		}
	}
	
	/*
	 *filtering localWords based on difficulty selected and associated word length
	 *and setting state variable words equal to new array output from filter function
	 *This method is used below in handleListChange method
	*/
	getWordsArray(difficulty)
	{
		let length1=0;
		let length2=0;
		
		//setting word lengths as described in drop-down menu on start screen
		
		if(difficulty==="Easy")
		{
			length1 = 3;
			length2 = 5;
		}
		else if(difficulty==="Medium")
		{
			length1 = 6;
			length2 = 7;
		}
		else 
		{
			length1 = 8;
			length2 = 20;
		}
		
		const wordsForGame = words.filter(this.findWords(length1, length2));
		this.setState({words: wordsForGame}); //update state variable with words available for this game, ie. filtered words
	
	}
	
	//method to handle drop-down list for difficulty level selection
	handleListChange(event)
	{
		let difficulty = event.target.value;
		
		this.setState({userDifficulty: difficulty});
		this.getWordsArray(difficulty);
	}
	
	
	/*
	 * Once this button is clicked the game will start
	 * This button is disabled until user difficulty is selected
	 * Once difficulty is selected, this information is used here to set the state variables for that game
	*/
	handlePlayButton()
	{
		let word = generateRandomWord(this.state.words);
		this.setState({randomWord: word});
		
		let wordToGuess = wordToArrayOfLetters(word);
		this.setState({randomWordArray: wordToGuess});
		this.setState({dashLine: startingDashes(word)});
		
		this.setState({playClicked: true});
	}
	
	//callback for filter function
	findLetter(letterID)
	{
		return function(letterObject)
		{
			return (letterObject.id === letterID);
		}
	}
	
	checkWordArrayForGuess(letterID)
	{
		//identifying letter guessed by user by its id
		let foundLetter = this.state.alphabet.filter(this.findLetter(letterID));
		let userGuess = foundLetter[0].letter;
		
		//using booleanButtons to disable the button for letter selected so 
		//it cannot be chosen again
		let newBooleanButtons = this.state.booleanForButton.slice();
		newBooleanButtons[letterID]=true;
		this.setState({booleanForButton: newBooleanButtons});
		
		
		//now to check if the letter is in the word or not:
		
		//first creating local copies of current state variables to use in this method
		let updatedDashLine = this.state.dashLine;
		let wordToCheck = this.state.randomWordArray;
		let letterInWord = false;
		
		//check each character in the random word array
		for(let i=0; i<wordToCheck.length-1; i++) 
		{
			if(wordToCheck[i]===userGuess)
			{
				updatedDashLine[i] = userGuess;
				letterInWord = true;
			}			
		}
		
		this.setState({dashLine: updatedDashLine});
		
		if(letterInWord===false)
		{
			this.setState({guessesRemaining: this.state.guessesRemaining - 1});
		}
	}
	
	//sets necessary state variables back to starting values
	resetGame()
	{
		this.setState({guessesRemaining: numGuesses}); 
		this.setState({userDifficulty: ""});
		this.setState({playClicked: false});
		this.setState({booleanForButton: booleansForButtons});
		this.setState({modalIsOpen: false});
	}
	
	//this method is used to check if the game has been won
	// when the game is won, there will be 0 underscore characters remaining
	countDashes(dashLine)
	{
		let count=0;
		for(let i=0; i<dashLine.length; i++)
		{
			if(dashLine[i]==="__")
			{
				count++;
			}
		}
		return count;
	}
	
	  
	render() {
		{/**----------------------------------------------------------------------------------------**/}
		{/**Starting Screen**/}
		if((this.state.playClicked===false))
		{
			return(
			<div className="Start Page" class="container-fluid">
				<header className="App-header">
				
				{/*<h1>Welcome to our Hangman game!</h1>*/}
				
				<div class="container" align="center">
				<div class="row align-items-center">
				
				<div class="col">
					<img src={startPic}  alt="logo"  width="90%" />
				</div>
				
				<div class="col lead">
					<form>
					<div class="form-group">
				{/*	Choose your difficulty level: <br/> */}
						<select class="form-control" onChange={this.handleListChange}>
							{difficulty.map(level =>
							<option value={level.level}>
								{level.level} &nbsp; {level.description}</option>
							)}
						</select>
					</div>
					</form><br/>
					
					{/**Play button disabled while difficulty level not selected**/}
					<button disabled={this.state.userDifficulty===""||this.state.userDifficulty==="Choose your difficulty level"} class="btn btn-primary btn-lg btn-block" onClick={this.handlePlayButton}>
						PLAY</button>
						<br/><br/>
				</div>
				
				</div>
				</div>
				</header>
			</div>
			);
		}	
		/**----------------------------------------------------------------------------------------**/
		/**...Game Over Screen...(renders the GameOver component)**/
		/**... The word of the game is passed to this component via props **/
		/**..The resetGame function is passed via props too to add functionality to a button in this component **/
		else if(this.state.guessesRemaining===0) 
		{
			return (
				<div className="GameOverPage" class="container-fluid">
				<header className="App-header">
				
					<div class="container">
						<GameOver  answer={this.state.randomWord}  reset={this.resetGame}/>
					</div>
				</header>
				</div>
			);
		}
		/**----------------------------------------------------------------------------------------**/
		/**...Winner Screen...(renders the Winner component)**/
		/**... The word of the game is passed to this component via props **/
		/**..The resetGame function is passed via props too to add functionality to a button in this component **/
		else if(this.countDashes(this.state.dashLine)===0)
		{
			return (
				<div className="WinnerPage" class="container-fluid  lead">
				<header className="App-header">
				
					<div class="container">
						<Winner gameWord={this.state.randomWord} reset={this.resetGame}/>
					</div>
				
				</header>
				</div>
			);
		}
		/**----------------------------------------------------------------------------------------**/
		/**...otherwise In-Game Display**/
		/**...uses Bootstrap grid layout**/
		/**...renders game images, Letters component, state variables and quitGame button(which uses react-modal)**/
		/**...The quitGame button uses react-modal**/
		else{
			return (
				<div className="App" class="container-fluid  lead">
				<header className="App-header">
					
					
					<div class="container">
					<div class="row align-items-center">
					
						<div class="col align-items-center">
							<ImageDisplay guesses={this.state.guessesRemaining}/>
						</div>
					
								
						<div class="col">
															
							<div class="lead text-center">
								<p class="text-center" style={{fontSize: 25}}>
									<b>Guesses remaining: &nbsp; {this.state.guessesRemaining}</b>
								</p>
							
								<p  style={{fontSize: 35, border:"6px solid lightblue" }}>
								<br/>
									<b>{this.state.dashLine}</b> 
								
								</p>									
									
							</div>
							<br/>

							<div class="alert alert-warning role=alert">
									
								<Letters  alphabet={this.state.alphabet} buttonHandler={this.checkWordArrayForGuess}  
									buttonBooleans={this.state.booleanForButton}/>
							</div>
							<br/>
						
							
							<div>
								<button class="btn btn-info btn-block" onClick={this.openModal}>QUIT GAME</button>
								
								<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
									<h2>Are you sure you want to quit your game?</h2>
									<br/>
									<button class="btn btn-success btn-lg" onClick={this.resetGame}>Yes Please!</button> &nbsp; &nbsp; &nbsp; &nbsp;
									<button class="btn btn-danger btn-lg" onClick={this.closeModal}>No</button>
								</Modal>
								
							</div>
							
						</div>	
						
					</div>
					</div>
					
				  </header>
				</div>
			);
		}
	}
}
export default App;

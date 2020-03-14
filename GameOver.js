import React, {Component} from 'react';
import './App.css';
import gameOver from './gameOver.png';


/** This component displays the GameOver image for our game
 * 
 *  Using Bootstrap grid layout (<divs> are rows and cols)
 *  
 * The word the player was trying to guess is passed to this
 *  component via props and is displayed in this render function
 * 
 *  There is a button to allow the player to play again 
*/


class GameOver extends Component{
	
	render(){
		
		const resetButton = this.props.reset;
		const answer = this.props.answer;
		
		
		return(
			<div  className="GameOver" class="container">
			
			<div class="row align-items-center">
				
				<div class="col">
					<img src={gameOver}  alt="game over"  width="90%" />
					
				</div>
					
					
				<div class="col">				
					<div align="center">
						<p>
							<h2> Oh nooooooooo....</h2>
							<br/>
							<h2>The word was: &nbsp; <mark>{answer}</mark></h2>
							<br/>
							<h2>Better luck next time!</h2>
						</p>
					</div>
					
					<br/>
					
					<button onClick={()=> resetButton()} class="btn btn-primary btn-lg btn-block">PLAY AGAIN</button>
				</div>
			
			
			</div>
			</div>
		);
	}
		
}

export default GameOver;


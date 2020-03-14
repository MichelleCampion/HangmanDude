import React, {Component} from 'react';
import './App.css';
import winner1 from './winner1.png';


/** This component displays the Winner image for our game
 *  Using Bootstrap grid layout (<divs> are rows and cols)
 *  There is a button to allow the player to play again 
*/

class Winner extends Component{
	
	render(){
		
		const resetButton = this.props.reset;
		const wordOfGame = this.props.gameWord;
		
		
		return(
			<div  className="Winner" class="container-fluid  lead">
				
				<div class="container">
				<div class = "row align-items-center">
				
					<div class="col">
						<img src={winner1}  alt="Winner"  width="90%" />
					</div>
				
					<div class="col" align="center">
					
						<br/><br/>
							<h1> Yes! You guessed the word</h1> <br/>
							<h1 style={{ color: 'black' }}><mark>{wordOfGame}</mark></h1><br/>
							<h1>correctly and saved this Dude! </h1> <br/>
						<br/><br/>
						<button onClick={()=> resetButton()} class="btn btn-primary btn-block" style={{fontSize: 25}}>PLAY AGAIN</button>
					</div>
				</div>
				</div>
			</div>
		);
	}
		
}

export default Winner;

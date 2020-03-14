import './App.css';
import React, {Component} from 'react';

import selectLetter from './selectLetter.png';
import head from './head.png';
import body from './body.png';
import leg from './leg.png';
import legs from './legs.png';
import arm from './arm.png';
import arms from './arms.png';
import boot from './boot.png';
import boots from './boots.png';
import glove from './glove.png';
import gloves from './gloves.png';
import hair from './hair.png';



class ImageDisplay extends Component{
	
	render(){
		
		//local access to number of guesses remaining stored in this variable numGuesses
		const numGuesses = this.props.guesses;
		
		/** the image names from above are stored in an array in such a way that the index of the corresponds to the number of guesses remaining 
		  * and means that the images will be displayed in the correct order
		  * ie. when numGuesses==12, we render a blank piece of paper as there will have been no wrong guesses at this stage
		  *(hair is repeated since the images here will only be displayed while numGuesses >0 and index 0 will not actually be used) 
		 */
		
		const images = [hair, hair, gloves, glove, boots, boot, arms, arm, legs, leg, body, head, selectLetter];
		let i=numGuesses;
			
			return(
				<div className="ImageDisplay" >
				<div style={{ height: '95vh', margin: 0, padding: 0 }}>
					
										
					<div class="container" >
					<img src={images[i]} width="90%"  alt="Guessed Wrong" />
					<br/>
					</div>
					<br/>
											
					
				</div>
				</div>
			);
		}
		
}

export default ImageDisplay;



//originally displayed the images as follows....much longer code!

/*
else if(numGuesses===11)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_1} width="30%" alt="11 guesses left" />
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===10)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_2} width="30%" alt="ten guesses left" />
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===9)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_3} width="30%" alt="nine guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===8)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_4} width="30%" alt="eight guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===7)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_5} width="30%" alt="seven guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===6)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_6} width="30%" alt="six guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===5)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_7} width="30%" alt="five guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===4)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_8} width="30%" alt="four guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===3)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_9} width="30%" alt="three guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===2)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_10} width="30%" alt="two guesses left"/>
					</div>
					
					</div>
				</div>
			);
		}
		else if(numGuesses===1)
		{
			return(
				<div className="ImageDisplay" class="container-fluid">
					<div class="alert alert-success" >
										
					<div align="center" >
					<img src={IMG_11} width="30%" alt="one guess left"/>
					</div>
					
					</div>
				</div>
			);
		}
*/

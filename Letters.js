import './App.css';
import React, {Component} from 'react';

/** This component displays the letters of the alphabet in a table
 *  The alphabet objects and associated boolean variables are passed from the App
 *  component via props.
 *  The boolean variables are used in this component to disable buttons 
 *  once they have been clicked
*/

class Letters extends Component{
	
	
	render(){
		
		const alphabet = this.props.alphabet;
		const useLetterButton = this.props.buttonHandler;
		const booleanButtons = this.props.buttonBooleans;
		//console.log(booleanButtons);
		
		
		return(
			<div className="Letters" class="container-fluid" style={{width: '100%'}}>
				
				<table align="center" class="table lead text-justify " >
				
				<thead>
				
					{alphabet.map(item => (
					<tc key={item.id}>
						<td><button disabled={booleanButtons[item.id]} class="btn btn-info btn-md" onClick={() => useLetterButton(item.id)}>{item.letter}</button></td>
					</tc>
					)
					)}
				</thead>
				</table>
				
			</div>
		);
		
	}
}

export default Letters;

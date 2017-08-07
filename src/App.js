import React, { Component } from 'react';
import logo from './logo.svg';
import Editor from 'elementary-editor';
import { Button, Card } from 'antd';
import './App.css';

const ButtonGroup = Button.Group;

class App extends Component {

 constructor(props){
	super(props);
	this.state = { editorState: null };
	this.editor = null;
 }
 
 clearEditor() {
   this.editor.clear();
 }

 getContent() {
   console.log(this);
   console.log("____________________");   
   const currentState = this.editor.clear();
   console.log(currentState);
 }
 
 logState() {  
   const currentState = this.editor.getContent();
   const jsonState = JSON.stringify(currentState);
   console.log(jsonState); 	
   this.setState({editorState: jsonState})
 }
 
 render(){

	return (
	<div className="App">
       
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Elementary Editor demo</h2>
		</div>
	
		<div>
		  <div className="EditorContainer">
			<Editor initialState={null} ref={(editor) => this.editor = editor} />
		  </div>
		</div>
		
		<div>		    

			<ButtonGroup className="LogStateButton">
				<Button type="primary" onClick={() => this.clearEditor()}>
				    Clear editor 
				</Button>
				<Button type="primary" onClick={() => this.logState()}>
					Log State
				</Button>
			</ButtonGroup>
			
		</div>
		
		<div className="LogStateResult">
			<Card>
			  <p>
				{this.state.editorState != null ? 
						this.state.editorState : "Press 'Log state' to log the current state."
				}
			  </p>
			</Card>
		</div>

	</div>
	);	 		 
 }
	
}

export default App;
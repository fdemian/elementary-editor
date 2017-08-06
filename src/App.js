import React, { Component } from 'react';
import logo from './logo.svg';
import Editor from 'elementary-editor';
import { Button } from 'antd';
import './App.css';

const editorContainerStyle = {
	height:'300px', 
	marginTop:'100px', 
	width:'90%', 
	marginLeft:'5%',
	textAlign:'left'
};

class App extends Component {

 constructor(props){
	super(props);
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
 
 render(){

	return (
	<div className="App">
       
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Elementary Editor demo</h2>
		</div>
	
		<div>
			<div style={editorContainerStyle}>
				<Editor initialState={null} ref={(editor) => this.editor = editor} />
			</div>
		</div>
		
		<div>
		    <Button 
				type="primary" 
				className="LogStateButton"
				onClick={() => this.clearEditor()}
			>
			    Clear editor
			</Button>
		</div>

	</div>
	);	 		 
 }
	
}

export default App;
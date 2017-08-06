import React, { Component } from 'react';
import logo from './logo.svg';
import Editor from './Editor/Editor';
import './App.css';

const editorContainerStyle = {
	height:'300px', 
	marginTop:'100px', 
	width:'90%', 
	marginLeft:'5%',
	textAlign:'left'
};

class App extends Component {
 
 constructor(props) {
	super(props);
	this.editor = null;	
 }
 
 render(){
   return (
   <div className="App">
       
	  <div className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <h2>Welcome to React</h2>
	  </div>
	
	  <div>
		<div style={editorContainerStyle}>
		  <Editor ref={(editor) => this.editor = editor} initialState={null} />
	    </div>
	  </div>

   </div>
   );  
 }
 	
}

export default App;
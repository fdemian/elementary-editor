import React from 'react';
import logo from './logo.svg';
import Editor from './Editor/Editor';
import EditorStyles from './Editor/EditorStyles';
import './App.css';

const _state = null;

function editorChangeFn(rawState) {}
function setClearFn(clearFn) {}

function setInsertFn(insertQuoteFn)
{
  console.log(insertQuoteFn);
}

const editorContainerStyle = {
	height:'300px', 
	marginTop:'100px', 
	width:'90%', 
	marginLeft:'5%',
	textAlign:'left'
};

const App = () => {

 return (
 <div className="App">
       
    <div className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <h2>Welcome to React</h2>
    </div>
	
	<div>
	   <div style={editorContainerStyle}>
		  <Editor
		    onEditorChange={editorChangeFn} 
		    setClearEditorFn={setClearFn} 
		    setInsertFn={setInsertFn}
		    initialState={_state}
		    editorStyles={EditorStyles}		  
		  />
	    </div>
	</div>

 </div>
 );	
	
 }

export default App;
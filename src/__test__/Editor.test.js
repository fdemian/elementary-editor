import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../Editor/Editor';
import EditorStyles from '../Editor/EditorStyles';

const _state = null;

function editorChangeFn(rawState) {}
function setClearFn(clearFn) {}

function setInsertFn(insertQuoteFn)
{
  console.log(insertQuoteFn);
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =  <Editor
		    onEditorChange={editorChangeFn} 
		    setClearEditorFn={setClearFn} 
		    setInsertFn={setInsertFn}
		    initialState={_state}
		    editorStyles={EditorStyles} />;
   
  ReactDOM.render(editor, div);
});
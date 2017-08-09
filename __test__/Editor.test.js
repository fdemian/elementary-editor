import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../Editor/Editor';
import EditorStyles from '../Editor/EditorStyles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =  <Editor
		    onEditorChange={(rawState) => {}} 
		    setClearEditorFn={(clearFn) => {}} 
		    setInsertFn={(insertQuoteFn) => {}}
		    initialState={null}
		    editorStyles={EditorStyles} />;
   
  ReactDOM.render(editor, div);
});

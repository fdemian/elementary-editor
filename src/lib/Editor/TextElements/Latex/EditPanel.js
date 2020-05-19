import React from 'react';
import { Input } from 'antd';
import EditorButtons from './Buttons';

const { TextArea } = Input;

const textAreaStyle = { width: '20%', marginLeft: '40%' };

const EditPanel = (props) => {

  const {
    editMode,
    onValueChange,
    texValue,
    invalidTeX,
    save,
    remove,
  } = props;

  if(!editMode)
    return null;

  return (
  <div>
    <TextArea
       rows={2}
       style={textAreaStyle}
       onChange={onValueChange}
       value={texValue}
    />
    <div>
      <EditorButtons
        invalid={invalidTeX}
        removeFn={remove}
        saveFn={save}
      />
   </div>
 </div>
 );
}

export default EditPanel;

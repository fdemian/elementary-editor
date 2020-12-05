import React, {
  lazy,
  Suspense
} from 'react';

import Input from 'antd/lib/input';
import Spin from 'antd/lib/button';

const EditorButtons = lazy(() => import('./Buttons'));

const { TextArea } = Input;

const textAreaStyle = {
  width: "20%",
  marginLeft: "40%",
};

const EditPanel = (props) => {
  const { editMode, onValueChange, texValue, invalidTeX, save, remove } = props;

  if (!editMode) return null;

  return (
  <Suspense fallback={<Spin />}>
    <div className="edit-panel-container">
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
 </Suspense>
 );
}

export default EditPanel;

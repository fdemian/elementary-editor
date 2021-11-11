import katex from "katex";
import React, { useState, useEffect } from "react";
//import KatexOutput from "./KatexOutput";
//import EditPanel from "./EditPanel";
import { Input } from 'antd';
import QuoteBlock from './QuoteOutput';

const { TextArea } = Input;

const replaceData = (props) => {
  const { entityKey, data, contentState } = props;
  return contentState.mergeEntityData(entityKey, data);
};

const EditPanel = (props) => {

  const { editMode, onValueChange, texValue, save, remove } = props;
  const { content } = texValue.content;

  if(!editMode)
    return null;

  return <TextArea rows={4} value={content} />;
}

const QuoteBlockEditor = (props) => {

  // Get content value.
  const { contentState, blockProps, block } = props;
  const eA0 = props.block.getEntityAt(0);
  const entity = contentState.getEntity(eA0);
  const entityData = entity.getData();
  const comment = entityData.props ? entityData.props : { content: entityData };

  //
  const [editMode, setEditMode] = useState(false);
  const [quoteValue, setQuoteValue] = useState(comment);
  const [saveMode, setSaveMode] = useState(false);

  const getValue = () => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    return entity.getData().content;
  };

  console.clear();
  console.log(props);
  console.log("::::");

  const onClick = () => {
    if (editMode) return;

    setEditMode(true);
    //quoteValue(getValue());
    startEdit();
  };

  const onValueChange = (evt) => {
    const { value } = evt.target;
    let invalid = false;
    setQuoteValue(value);
  };

  const save = () => {
    setEditMode(false);
    setSaveMode(true);
  };

  const startEdit = () => {
    const key = block.getKey();
    blockProps.onStartEdit(key);
  };

  const remove = () => {
    const key = block.getKey();
    blockProps.onRemove(key);
  };

  return (
  <>
    <QuoteBlock
      comment={comment}
      onClick={onClick}
      editMode={editMode}
    />
    <EditPanel
      editMode={editMode}
      onValueChange={onValueChange}
      texValue={quoteValue}
      save={save}
      remove={remove}
    />
  </>
  );
}

export default QuoteBlockEditor;

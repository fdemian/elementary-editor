import katex from "katex";
import React, { useState, useEffect } from "react";
import KatexOutput from "./KatexOutput";
import EditPanel from "./EditPanel";

const replaceData = (props) => {
  const { entityKey, data, contentState } = props;
  return contentState.mergeEntityData(entityKey, data);
};

const TeXBlock = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [texValue, setTexValue] = useState(null);
  const [invalidTeX, setInvalidTeX] = useState(false);
  const [saveMode, setSaveMode] = useState(false);

  const { contentState, blockProps, block } = props;

  const onClick = () => {
    if (editMode) return;

    setEditMode(true);
    setTexValue(getValue());
    startEdit();
  };

  const onValueChange = (evt) => {
    const { value } = evt.target;
    let invalid = false;

    try {
      /* eslint-disable */
      katex.__parse(value);
      /* eslint-enable */
    } catch (e) {
      invalid = true;
    } finally {
      setInvalidTeX(invalid);
      setTexValue(value);
    }
  };

  const save = () => {
    setInvalidTeX(false);
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

  const getValue = () => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    return entity.getData().content;
  };

  useEffect(() => {
    if (!editMode && !invalidTeX && saveMode) {
      const editKey = block.getEntityAt(0);
      const props = {
        entityKey: editKey,
        data: { content: texValue },
        contentState: contentState,
      };
      let _newState = replaceData(props);
      blockProps.onFinishEdit(editKey, _newState);
      setSaveMode(false);
    }
  }, [editMode, invalidTeX, saveMode, block, contentState, texValue, blockProps]);

  // TODO: Colapse into one line.
  let texContent = null;
  if (editMode) {
    texContent = invalidTeX ? "" : texValue;
  } else {
    texContent = getValue();
  }

  let className = "TeXEditor-tex" + (editMode ? " TeXEditor-activeTeX" : "");

  return (
    <div className={className}>
      <KatexOutput content={texContent} onClick={onClick} />
      <EditPanel
        editMode={editMode}
        onValueChange={onValueChange}
        texValue={texValue}
        invalidTeX={invalidTeX}
        save={save}
        remove={remove}
      />
    </div>
  );
};

export default TeXBlock;

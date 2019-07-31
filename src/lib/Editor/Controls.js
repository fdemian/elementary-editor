import React, { useState, useRef } from 'react';
import StyleButton from './StyleButton';
import URLInput from './URLInput';
import './css/Controls.css';

const EditorControls = (props) => {

  // Set state
  const [showURLInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlType, setUrlType] = useState('');

  const {
    sendPost,
    editor,
    editorStyles,
    selectionCollapsed,
    blockIsActive,
    inlineIsActive,
    customBlockIsActive,
    onToggleInline,
    onToggleBlock
  } = props;
  
  const onUrlChange = (e) => {
    setUrlValue(e.target.value);
  }

  const getInput = (type) => {
    setShowUrlInput(true);
    setUrlType(type);
  }

  const confirmUrl = (e) => {
    e.preventDefault()

    const styleObject = findStyleObjectByName(urlType);

    if (styleObject.toggleFn == null)
       return;

    styleObject.toggleFn(editor, urlType, urlValue);

    setShowUrlInput(false);
    setUrlValue('');
    setUrlType('');
  }

  const cancelUrl = () => {
    setShowUrlInput(false);
    setUrlValue('');
    setUrlType('');
  }

  const customBlockToggleFn = (blockName) => {

    const styleObject = findStyleObjectByName(blockName);

    if (styleObject.toggleFn === null)
      return;

    if (styleObject.requiresSelection && editor.selectionIsCollapsed())
      return;

    if (styleObject.requiresInput) {
      getInput(styleObject.label);
      return;
    }

    styleObject.toggleFn(editor);
  }

  const findStyleObjectByName = (name) => {
    const customStyles = editorStyles.CUSTOM_STYLES;
    const matches = customStyles.filter(style =>
      (style.label === name || style.style === name)
    )

    return matches[0];
  }

  if (showURLInput) {
    return (
    <div className='EditorControls'>
       <div className='RichEditor-controls'>
         <URLInput
            changeFn={onUrlChange}
            urlValue={urlValue}
            type={urlType}
            cancelFn={cancelUrl}
            confirmFn={confirmUrl}
         />
       </div>
    </div>
    )
  }

  return (
  <div className='EditorControls'>
    <div className='RichEditor-controls'>
      {editorStyles.INLINE_STYLES.map(type =>
        (<StyleButton
            key={type.label}
            activeFn={inlineIsActive.bind(type.style)}
            label={type.label}
            onToggle={onToggleInline}
            style={type.style}
            icon={type.icon}
        />))}
        {editorStyles.BLOCK_TYPES.map(type =>
          (<StyleButton
            key={type.label}
            activeFn={blockIsActive.bind(type.style)}
            label={type.label}
            onToggle={onToggleBlock}
            style={type.style}
            icon={type.icon}
          />))}
          {editorStyles.CUSTOM_STYLES.map(type =>
            (<StyleButton
              key={type.label}
              activeFn={customBlockIsActive}
              label={type.label}
              onToggle={customBlockToggleFn}
              style={type.style}
              icon={type.icon}
          />))}
      </div>
    </div>
    )
};

export default EditorControls

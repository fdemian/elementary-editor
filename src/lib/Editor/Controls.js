import React from 'react';
import StyleButton from './StyleButton';
import URLInput from './URLInput';
import './css/Controls.css';

const EditorControls = (props) => {
  const {
    editorStyles,
    blockIsActive,
    inlineIsActive,
    customBlockIsActive,
    customBlockToggleFn,
    onToggleInline,
    onToggleBlock,
    confirmInput,
    onInputChange,
    showInput,
    cancelInput,
    urlPlaceholderText,
    inputVisible,
    inputValue,
    inputType,
    altControls,
    editorState
  } = props;

  if (inputVisible) {
    return (
    <div className='EditorControls'>
        <div className='RichEditor-controls'>
          <URLInput
            type={inputType}
            changeFn={onInputChange}
            urlValue={inputValue}
            cancelFn={cancelInput}
            confirmFn={confirmInput}
            placeHolderText={urlPlaceholderText}
          />
         </div>
    </div>
    );
  }

  // TODO merge stylebutton mappings.
  return (
    <div className="EditorControls">
      <div className="RichEditor-controls">
        {editorStyles.INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            activeFn={inlineIsActive.bind(type.style)}
            label={type.label}
            onToggle={onToggleInline}
            style={type.style}
            icon={type.icon}
            editorState={editorState}
          />
        ))}
        {editorStyles.BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            activeFn={blockIsActive.bind(type.style)}
            label={type.label}
            onToggle={onToggleBlock}
            style={type.style}
            icon={type.icon}
          />
        ))}
        {editorStyles.CUSTOM_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            activeFn={customBlockIsActive}
            label={type.label}
            onToggle={customBlockToggleFn}
            getInput={showInput}
            style={type.style}
            icon={type.icon}
          />
        ))}
        {altControls ? altControls.map((type) => (
          <StyleButton
            key={type.label}
            activeFn={customBlockIsActive}
            label={type.label}
            onToggle={customBlockToggleFn}
            getInput={showInput}
            style={type.style}
            icon={type.icon}
          />
        )) : null}
      </div>
    </div>
  );
};

export default EditorControls;

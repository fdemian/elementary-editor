import React, {
  lazy,
  Suspense
} from 'react';
import StyleButton from './StyleButton';
import './css/Controls.css';

const URLInput = lazy(() => import('./URLInput'));

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
    inputVisible,
    inputType,
    inputValue,
    altControls
    editorState
  } = props;

  if (inputVisible) {
    return (
    <Suspense fallback={<p>Loading</p>}>
      <div className='EditorControls'>
        <div className='RichEditor-controls'>
          <URLInput
            changeFn={onInputChange}
            urlValue={inputValue}
            type={inputType}
            cancelFn={cancelInput}
            confirmFn={confirmInput}
          />
         </div>
       </div>
    </Suspense>
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
        {altControls ? altControls.map(P => (
          <P  />
        )) : null}
      </div>
    </div>
  );
};

export default EditorControls;

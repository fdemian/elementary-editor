import React from "react";
import { Editor } from "draft-js";

const BaseEditor = (config) => {
  const AltEditor = config.altEditor;
  if (AltEditor) {
    return(
    <AltEditor
       aria-label={config.ariaLabel}
       blockStyleFn={config.getBlockStyle}
       blockRendererFn={config.blockRendererFn}
       blockRenderMap={config.blockRenderMap}
       editorState={config.editorState}
       handleKeyCommand={config.handleKeyCommand}
       onChange={config.onChange}
       customStyleMap={config.styleMap}
       ref={config.reference}
       spellCheck={config.spellCheck}
       readOnly={config.readOnly}
       plugins={config.plugins}
     />
     );
  }

  return (
  <Editor
    aria-label={config.ariaLabel}
    blockStyleFn={config.getBlockStyle}
    blockRendererFn={config.blockRendererFn}
    blockRenderMap={config.blockRenderMap}
    editorState={config.editorState}
    handleKeyCommand={config.handleKeyCommand}
    onChange={config.onChange}
    customStyleMap={config.styleMap}
    ref={config.reference}
    spellCheck={config.spellCheck}
    readOnly={config.readOnly}
  />
  );
};

export default BaseEditor;

import React from "react";
import { Editor } from "draft-js";

const BaseEditor = (config) => {
  const AltEditor = config.altEditor;
  const { altRenderProps } = config;
  if (AltEditor) {
    return(
    <>
      <AltEditor
        aria-label="Editor"
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
    </>
    );
  }

  return (
    <Editor
      aria-label="Editor"
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

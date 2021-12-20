import React from "react";
import { Editor } from "draft-js";

import '../../../node_modules/@draft-js-plugins/hashtag/lib/plugin.css'


const BaseEditor = (config) => {
  const AltEditor = config.altEditor;
  const { altRenderProps } = config;

  if (AltEditor) {
    return(
    <>
      <AltEditor
        blockStyleFn={config.getBlockStyle}
        blockRendererFn={config.blockRendererFn}
        blockRenderMap={config.blockRenderMap}
        editorState={config.editorState}
        handleKeyCommand={config.handleKeyCommand}
        onChange={config.onChange}
        ref={config.reference}
        spellCheck={config.spellCheck}
        readOnly={config.readOnly}
        plugins={config.plugins}
      />
      {altRenderProps ? altRenderProps.map(P => (<P />)): null}
    </>
    );
  }

  return (
    <Editor
      blockStyleFn={config.getBlockStyle}
      blockRendererFn={config.blockRendererFn}
      blockRenderMap={config.blockRenderMap}
      editorState={config.editorState}
      handleKeyCommand={config.handleKeyCommand}
      onChange={config.onChange}
      ref={config.reference}
      spellCheck={config.spellCheck}
      readOnly={config.readOnly}
    />
  );
};

export default BaseEditor;

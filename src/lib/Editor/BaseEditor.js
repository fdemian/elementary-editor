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
        customStyleMap={config.styleMap}
        ref={config.reference}
        spellCheck={config.spellCheck}
        readOnly={config.readOnly}
        plugins={config.plugins}
      />
      {altRenderProps ? altRenderProps.map((p) => {
          const Component = p.component;
          return(<Component {...p.props} />);
        }): null
      }
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
      customStyleMap={config.styleMap}
      ref={config.reference}
      spellCheck={config.spellCheck}
      readOnly={config.readOnly}
    />
  );
};

export default BaseEditor;

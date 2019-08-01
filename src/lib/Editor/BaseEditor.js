import React from 'react'
import { Editor } from 'draft-js'

const BaseEditor = (config) => {

  const AltEditor = config.altEditor;

  if (AltEditor) {
    return (
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
    />
    )
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
  )
}

export default BaseEditor

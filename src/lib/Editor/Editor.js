import React, { useState, useImperativeHandle } from 'react'
import Draft from 'draft-js'
import { Map } from 'immutable'
import 'katex/dist/katex.css'
//import insertTeXBlock from './TextElements/Latex/insertTeXBlock'
import removeTeXBlock from './TextElements/Latex/removeTeXBlock'
import TeXBlock from './TextElements/Latex/TeXBlock'
import Spoiler from './TextElements/Spoiler/SpoilerWrapper'
import Media from './TextElements/Media/Media'
import Link from './TextElements/Link/Link'
import editorStyles from './EditorStyles'
import QuoteBlockWrapper from './TextElements/QuoteBlock/QuoteBlockWrapper'
import EditorControls from './Controls'
import BaseEditor from './BaseEditor'
import {
  getBlockStyle,
  findLinkEntities,
  findSpoilerEntities,
  filterWhiteListedStyles
} from './utils';

import './css/Draft.css'
import './css/Editor.css'

const {
  CompositeDecorator,
  ContentState,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw
} = Draft;

const blockRenderMap = Map({
  SPOILER: { element: Spoiler },
  Latex: { element: TeXBlock }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

const EditorComponent = (props) => {

  const { altEditor, initialState, containerRef } = props;

  let decorator = null;
  let initialStateEditor;

  if (!altEditor) {
   decorator = new CompositeDecorator([
     {
       strategy: (contentBlock, callback, contentState) =>
       findLinkEntities(contentBlock, callback, contentState),
       component: Link
     },
     {
       strategy: (contentBlock, callback, contentState) =>
       findSpoilerEntities(contentBlock, callback, contentState),
       component: Spoiler
     }
   ])
  }

  const { createEmpty, createWithContent } = EditorState;

  if (initialState == null) {
    initialStateEditor = createEmpty(decorator)
  } else {
   const parsedState = JSON.parse(initialState);
   const contentState = convertFromRaw(parsedState);
   initialStateEditor = createWithContent(contentState, decorator);
  }

  // State and refs.
  const [texEdits, setTexEdits] = useState(Map());
  const [editorState, setEditorState] = useState(initialStateEditor);


  // Functions.
  const focus = () => console.log("FOCUS!"); //props.containerRef.current.focus();
  const getCurrentContent = () => editorState.getCurrentContent();
  const customBlockIsActive = () => false; // TODO: revise.

  let _editorStyles = null;

  // If the user has defined which styles to whitelist, use only those.
  // Otherwise use all of the styles.
  let filterStyles = (props.filterStyles === undefined)
  ? null: props.filterStyles;

  if(filterStyles === null) {
    _editorStyles = editorStyles;
  } else {
   const whiteListed = filterWhiteListedStyles(editorStyles, props.filterStyles);
   _editorStyles = whiteListed;
  }

  const getContent = () => {
    const currentContent = getCurrentContent();
    return convertToRaw(currentContent);
  }

  const getPlainText = () => {
    return getCurrentContent().getPlainText();
  }

  const removeTex = (blockKey) => {
    setTexEdits(texEdits.remove(blockKey));
    setEditorState(removeTeXBlock(editorState, blockKey));
  };

  const insertTex = (blockKey, newContentState) => {
    const { createWithContent } = EditorState;
    const texEditState = texEdits.remove(blockKey);
    const editorContent = createWithContent(newContentState);
    setTexEdits(texEditState);
    setEditorState(editorContent);
  }

  const blockIsActive = (block) => {
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return block === blockType;
  }

  const inlineIsActive = (style) => {

   const currentStyle = editorState.getCurrentInlineStyle();

   if (currentStyle === undefined)
      return false;

   return currentStyle.has(style);
  }

  /*
  static customBlockIsActiveFn(block) {
    return false;
  } */

  const onChange = (state) => {
    setEditorState(state);
  }

  const handleKeyCommand = (command) => {

    const {handleKeyCommand} = RichUtils;
    const newState = handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return true;
    }

    return false;
  }

  const customRenderFn = (contentBlock) => {

    const type = contentBlock.getType()
    const text = contentBlock.getText()

    if (text === 'media') {
      return {
        component: Media,
        editable: false
      }
    }

    if (text === 'QuoteBlock') {
      return {
        component: QuoteBlockWrapper,
        editable: false
      }
    }

    if (type === 'atomic') {
      return {
        component: TeXBlock,
        editable: false,
        props: {
          onStartEdit: (blockKey) => {
            const texEditState = texEdits.set(blockKey, true);
            setTexEdits(texEditState);
          },
          onFinishEdit: (blockKey, newContentState) => insertTex(blockKey, newContentState),
          onRemove: blockKey => removeTex(blockKey)
        }
      }
    }

    return null;
  }

  const selectionIsCollapsed = () => {
    return editorState.getSelection().isCollapsed();
  }

  const toggleBlockType = (blockType) => {
    const { toggleBlockType } = RichUtils;
    onChange(toggleBlockType(editorState, blockType));
  }

  const toggleInlineStyle = (inlineStyle) => {
    const { toggleInlineStyle } = RichUtils;
    onChange(toggleInlineStyle(editorState, inlineStyle))
  }

  // TODO: check this out.
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor Editor';
  const contentState = editorState.getCurrentContent()

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder Editor'
    }
  }

  const clear = () => {
   const emptyState = ContentState.createFromText('');
   const clearedState = EditorState.push(editorState, emptyState);
   setTexEdits(Map());
   setEditorState(clearedState);
  }

  // Exposed methods.
  useImperativeHandle(containerRef, () => {
    return {
     clear: clear,
     getContent: getContent,
     getPlainText: getPlainText
    }
  });

  return (
  <div style={{ height: '100%' }} ref={containerRef}>
    <EditorControls
      editorState={editorState}
      editorStyles={_editorStyles}
      onToggleBlock={toggleBlockType}
      onToggleInline={toggleInlineStyle}
      selectionCollapsed={selectionIsCollapsed}
      blockIsActive={blockIsActive}
      inlineIsActive={inlineIsActive}
      customBlockIsActive={customBlockIsActive}
      editor={containerRef}
    />
    <div
      className={className}
      onClick={focus}
      role='textbox'
      tabIndex={0}
     >
      <BaseEditor
        blockStyleFn={getBlockStyle}
        blockRendererFn={customRenderFn}
        blockRenderMap={extendedBlockRenderMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        spellCheck={false}
        readOnly={texEdits.count()}
        altEditor={altEditor}
      />
    </div>

  </div>
  );

}

export default EditorComponent;

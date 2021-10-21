import React, { useState, useRef, useImperativeHandle } from "react";
import Draft from "draft-js";
import { Map } from "immutable";
import { getTexBlock, removeTeXBlock } from "./TextElements/Latex/texUtils";
import TeXBlock from "./TextElements/Latex/TeXBlock";
import Spoiler from "./TextElements/Spoiler/SpoilerWrapper";
import Media from "./TextElements/Media/Media";
import Link from "./TextElements/Link/Link";
import editorStyles from "./EditorStyles";
import QuoteBlockWrapper from "./TextElements/QuoteBlock/QuoteBlockWrapper";
import QuoteBlock from "./TextElements/QuoteBlock/QuoteBlock";
import EditorControls from "./Controls";
import BaseEditor from "./BaseEditor";
import {
  getBlockStyle,
  findLinkEntities,
  findSpoilerEntities,
  filterWhiteListedStyles,
  createNewImmutableEntity,
  insertEntityToState,
} from "./utils";

import "katex/dist/katex.css";
import "./css/Draft.css";
import "./css/Editor.css";

const {
  CompositeDecorator,
  ContentState,
  EditorState,
  RichUtils,
  DefaultDraftBlockRenderMap,
  convertToRaw,
  convertFromRaw,
  AtomicBlockUtils
} = Draft;

const KeyboardElem = ({children}) => <kbd>{children}</kbd>;

const blockRenderMap = Map({
  SPOILER: { element: Spoiler },
  LATEX: { element: TeXBlock },
  QUOTEBLOCK: { element: QuoteBlock },
  Keyboard: { element: KeyboardElem }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const EditorComponent = (props) => {

  const { altEditor, initialState, containerRef } = props;

  let decorator = null;
  let initialStateEditor;

  if (!altEditor) {
    decorator = new CompositeDecorator([
      {
        strategy: (contentBlock, callback, contentState) =>
          findLinkEntities(contentBlock, callback, contentState),
        component: Link,
      },
      {
        strategy: (contentBlock, callback, contentState) =>
          findSpoilerEntities(contentBlock, callback, contentState),
        component: Spoiler,
      },
    ]);
  }

  if (initialState == null) {
    initialStateEditor = EditorState.createEmpty(decorator);
  } else {
    const parsedState = JSON.parse(initialState);
    const contentState = convertFromRaw(parsedState);
    initialStateEditor = EditorState.createWithContent(contentState, decorator);
  }

  const editorRef = useRef(null);

  // State and refs.
  const [texEdits, setTexEdits] = useState(Map());
  const [editorState, setEditorState] = useState(initialStateEditor);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputType, setInputType] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Functions.
  const focus = () => editorRef.current.focus();
  const readOnly = texEdits.count();
  const getCurrentContent = () => editorState.getCurrentContent();
  const customBlockIsActive = () => false; // TODO: revise.

  let _editorStyles = null;

  // If the user has defined which styles to whitelist, use only those.
  // Otherwise use all of the styles.
  let filterStyles =
    props.filterStyles === undefined ? null : props.filterStyles;

  if (filterStyles === null) {
    _editorStyles = editorStyles;
  } else {
    const whiteListed = filterWhiteListedStyles(
      editorStyles,
      props.filterStyles
    );
    _editorStyles = whiteListed;
  }

  const getContent = () => {
    const currentContent = getCurrentContent();
    return convertToRaw(currentContent);
  };

  const getPlainText = () => {
    return getCurrentContent().getPlainText();
  };

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
  };

  const blockIsActive = (block) => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return block === blockType;
  };

  const inlineIsActive = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    if (currentStyle === undefined) return false;

    return currentStyle.has(style);
  };

  const onChange = (state) => {
    setEditorState(state);
    if (props.onChange) props.onChange(getContent());
  };

  const handleKeyCommand = (command) => {
    const { handleKeyCommand } = RichUtils;
    const newState = handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return true;
    }

    return false;
  };

  const customRenderFn = (contentBlock) => {
    const type = contentBlock.getType();
    const text = contentBlock.getText();

    if (text === "media" || text === "Image" || text === "Video") {
      return {
        component: Media,
        editable: false,
      };
    }

    if (text === "QuoteBlock") {
      return {
        component: QuoteBlockWrapper,
        editable: false
      };
    }

    if (type === "atomic") {

      if(text === "blockquote"){
        return {
          component: QuoteBlockWrapper,
          editable: false
        };
      }

      return {
        component: TeXBlock,
        editable: false,
        props: {
          onStartEdit: (blockKey) => {
            const texEditState = texEdits.set(blockKey, true);
            setTexEdits(texEditState);
          },
          onFinishEdit: (blockKey, newContentState) =>
            insertTex(blockKey, newContentState),
          onRemove: (blockKey) => removeTex(blockKey),
        },
      };
    }

    return null;
  };

  const selectionIsCollapsed = () => {
    return editorState.getSelection().isCollapsed();
  };

  const findStyleObjectByName = (name) => {
    const customStyles = editorStyles.CUSTOM_STYLES;
    const matches = customStyles.filter(
      (style) => style.label === name || style.style === name
    );

    return matches[0];
  };

  const insertEntity = (entityName) => {
    const newEntity = createNewImmutableEntity(editorState, entityName);
    const newState = insertEntityToState(editorState, newEntity);
    setEditorState(newState, () => {
      setTimeout(() => focus(), 0);
    });
  };

  const customBlockToggleFn = (blockName, getInput) => {
    const selectionCollapsed = selectionIsCollapsed();
    const styleObject = findStyleObjectByName(blockName);
    const { requiresSelection } = styleObject;

    if (styleObject.toggleFn === null) return;

    if (requiresSelection && selectionCollapsed) return;

    if (styleObject.requiresInput) {
      setInputVisible(true);
      setInputType(styleObject.label);
      return;
    }

    toggleCustomStyle(styleObject);
  };

  const confirmInput = (e) => {
    e.preventDefault();

    const styleObject = findStyleObjectByName(inputType);

    if (styleObject.toggleFn == null) return;

    const newState = styleObject.toggleFn(editorState, inputType, inputValue);

    // Reset input fields.
    setInputVisible(false);
    setInputValue("");
    setInputType("");

    // Set the new editor state.
    if (newState !== null) setEditorState(newState);
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const cancelInput = () => {
    setInputVisible(false);
    setInputValue("");
    setInputType("");
  };

  const showInput = () => setInputVisible(true);

  const insertCustomBlock = (block, text) => {
    const { type, mutability, content } = block;
    const { insertAtomicBlock } = AtomicBlockUtils;
    const contentStateWithEntity = contentState.createEntity(
      type,
      mutability,
      content
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    return insertAtomicBlock(newEditorState, entityKey, (text ? text : " "));
  };

  const toggleCustomStyle = (styleObject) => {
    let newState = null;

    switch (styleObject.style.toUpperCase()) {
      case "SPOILER":
        insertEntity("SPOILER");
        break;

      case "LATEX":
        const texBlock = getTexBlock();
        newState = insertCustomBlock(texBlock);
        break;

      default:
        break;
    }

    if (newState !== null) setEditorState(newState);
  };

  const toggleBlockType = (blockType) => {
    const { toggleBlockType } = RichUtils;
    onChange(toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    const { toggleInlineStyle } = RichUtils;
    onChange(toggleInlineStyle(editorState, inlineStyle));
  };

  // TODO: check this out.
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor Editor";
  const contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder Editor";
    }
  }

  const clear = () => {
    const emptyState = ContentState.createFromText("");
    const clearedState = EditorState.push(editorState, emptyState);
    setTexEdits(Map());
    setEditorState(clearedState);
  };

  const addNewEntity = (type, mutability, data) => {
    const block = {
      type: type,
      mutability: mutability,
      content: data
    };
    const newState = insertCustomBlock(block, type);
    setEditorState(newState);
  }

  // Exposed methods.
  useImperativeHandle(containerRef, () => {
    return {
      clear: clear,
      getContent: getContent,
      getPlainText: getPlainText,
      addNewEntity: addNewEntity
    };
  });

  return (
    <div
      style={{ height: "100%" }}
      ref={containerRef}
      className="em-editor-container"
    >
      <EditorControls
        editorState={editorState}
        editorStyles={_editorStyles}
        onToggleBlock={toggleBlockType}
        onToggleInline={toggleInlineStyle}
        selectionCollapsed={selectionIsCollapsed}
        blockIsActive={blockIsActive}
        inlineIsActive={inlineIsActive}
        customBlockIsActive={customBlockIsActive}
        customBlockToggleFn={customBlockToggleFn}
        editor={containerRef}
        inputType={inputType}
        inputVisible={inputVisible}
        inputValue={inputValue}
        confirmInput={confirmInput}
        onInputChange={onInputChange}
        cancelInput={cancelInput}
        showInput={showInput}
      />
      <div className={className} onClick={focus} role="textbox" tabIndex={0}>
        <BaseEditor
          blockStyleFn={getBlockStyle}
          blockRendererFn={customRenderFn}
          blockRenderMap={extendedBlockRenderMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          spellCheck={false}
          readOnly={readOnly}
          altEditor={altEditor}
          reference={editorRef}
        />
      </div>
    </div>
  );
};

export default EditorComponent;

import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import Draft from "draft-js";
import { Map } from "immutable";
import editorStyles from "./EditorStyles";
import QuoteBlockWrapper from "./TextElements/QuoteBlock/QuoteBlockWrapper";
import QuoteBlock from "./TextElements/QuoteBlock/QuoteBlock";
import { getTexBlock, removeTeXBlock } from "./TextElements/Latex/texUtils";
import TeXBlock from "./TextElements/Latex/TeXBlock";
import Spoiler from "./TextElements/Spoiler/SpoilerWrapper";
import Media from "./TextElements/Media/Media";
import Link from "./TextElements/Link/Link";
import EditorControls from "./Controls";
import { Editor } from "draft-js";

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
  AtomicBlockUtils,
  Modifier
} = Draft;

const styleMap = {
  'KEYBOARD': {
    margin: '0 0.2em',
    padding: '0.15em 0.4em 0.1em',
    fontSize: '90%',
    background: 'rgba(150,150,150,.06)',
    border: '1px solid rgba(100,100,100,.2)',
    borderBottomWidth: '2px',
    borderRadius: '3px',
  },
  'SPOILER': {
    border: '1px dotted gray',
    borderTop: 'none',
    background: '#fff',
    padding: '0px 1.4px'
  }
};

const blockRenderMap = Map({
  SPOILER: { element: Spoiler },
  LATEX: { element: TeXBlock },
  QUOTEBLOCK: { element: QuoteBlock }
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const EditorComponent = (props) => {

  const {
    altEditor,
    altLabels,
    initialState,
    containerRef ,
    altRenderProps,
    altControls,
    plugins,
    ariaLabel
  } = props;

  // Editor initialization.
  let BaseEditor = altEditor ? altEditor : Editor;
  let decorator = null;
  let initialStateEditor;
  let _editorStyles = null;
  let filterStyles = null;

  if (initialState == null) {
    initialStateEditor = EditorState.createEmpty(decorator);
  } else {
    const parsedState = JSON.parse(initialState);
    const contentState = convertFromRaw(parsedState);
    initialStateEditor = EditorState.createWithContent(contentState, decorator);
  }

  // State and refs.
  const editorRef = useRef(null);
  const [texEdits, setTexEdits] = useState(Map());
  const [editorState, setEditorState] = useState(initialStateEditor);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputType, setInputType] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Basic editor functions Functions.
  const focus = () => editorRef.current ? editorRef.current.focus() : {};
  const readOnly = texEdits.count();
  const getCurrentContent = () => editorState.getCurrentContent();
  const customBlockIsActive = () => false; // TODO: revise.


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
      }
    ]);
  }

  // If the user has defined which styles to whitelist, use only those.
  // Otherwise use all of the styles.
  filterStyles =
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

  const replaceLabelIfPresent = (obj, labels) => {
    const labelFound = labels.find(l => l.style === obj.style);
    if(labelFound !== undefined){
      return {...obj, label: labelFound.label };
    }
    return obj;
  }

  const replaceLabels = (altLabels, styleArray) => {
    return styleArray.map(s => replaceLabelIfPresent(s, altLabels));
  }

  if(altLabels){
    _editorStyles = {
      BLOCK_TYPES: replaceLabels(altLabels, _editorStyles.BLOCK_TYPES),
      INLINE_STYLES: replaceLabels(altLabels, _editorStyles.INLINE_STYLES),
      CUSTOM_STYLES: replaceLabels(altLabels, _editorStyles.CUSTOM_STYLES)
    }
  }


  /*
  useEffect(() => {
  console.log("Effect");
  }, []);
  */

  // Internal editor functions.

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
    const altElem = altControls ? altControls.find(t => t.style === text) : null;

    if(altElem !== undefined && altElem !== null) {
      return null;
    }

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
    let customStyles = _editorStyles.CUSTOM_STYLES;
    if(customStyles.find(s => s.style === name) && altControls && (altControls.find(s => s.style ===name)!== undefined)){
      customStyles = customStyles.filter(s => s.style !== name);
    }
    const matchStyles = customStyles.concat(altControls ? altControls: []);
    const matches = matchStyles.filter(
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

    if(inlineStyle === "unstyled")
      return;

    const selection = editorState.getSelection();

    if(selection.isCollapsed())
      return;

    const contentState = editorState.getCurrentContent();
    let modifiedContent;

    if(inlineIsActive(inlineStyle)) {
      modifiedContent = Modifier.removeInlineStyle(
        contentState,
        selection,
        inlineStyle
      );
    }
    else {
      modifiedContent = Modifier.applyInlineStyle(
        contentState,
        selection,
        inlineStyle
      );
    }

    const newState = EditorState.push(editorState, modifiedContent);
    return onChange(newState);
  }


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

  // Exposed methods.
  const clear = () => {
    const emptyState = ContentState.createFromText("");
    const clearedState = EditorState.push(editorState, emptyState);
    setTexEdits(Map());
    setEditorState(clearedState);
  };

  const getContent = () => {
    const currentContent = getCurrentContent();
    return convertToRaw(currentContent);
  };

  const getPlainText = () => {
    return getCurrentContent().getPlainText();
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
        altControls={altControls}
      />
      <div
        aria-label="Editor container"
        className={className}
        onClick={focus}
        role="textbox"
        tabIndex={0}
      >
        <BaseEditor
          ariaLabel={ariaLabel}
          blockStyleFn={getBlockStyle}
          blockRendererFn={customRenderFn}
          blockRenderMap={extendedBlockRenderMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          ref={containerRef}
          plugins={plugins}
          customStyleMap={styleMap}
          spellCheck={false}
          altEditor={altEditor}
          reference={editorRef}
          readOnly={readOnly}
        />
        {altRenderProps ? altRenderProps.map((p) => {
            const Component = p.component;
            return(<Component {...p.props} />);
          }): null
        }
      </div>
    </div>
  );
};

export default EditorComponent;

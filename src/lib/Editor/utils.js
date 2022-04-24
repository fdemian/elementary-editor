import { EditorState, RichUtils } from "draft-js";
import { CompositeDecorator, convertFromRaw } from "draft-js";
import Spoiler from "./TextElements/Spoiler/SpoilerWrapper";
import Link from "./TextElements/Link/Link";

export const getBlockStyle = (block) => {
  let blockStyle = null;

  switch (block.getType()) {
    case "blockquote":
      blockStyle = "Blockquote";
      break;
    case "code-block":
      blockStyle = "Code";
      break;
    case "kbd":
      blockStyle = "Keyboard"
      break;
    default:
      blockStyle = null;
  }

  return blockStyle;
};

export const findEntities = (contentBlock, callback, contentState, type) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null && contentState.getEntity(entityKey).getType() === type
    );
  }, callback);
};

export const findLinkEntities = (contentBlock, callback, contentState) =>
  findEntities(contentBlock, callback, contentState, "LINK");

export const findSpoilerEntities = (contentBlock, callback, contentState) =>
  findEntities(contentBlock, callback, contentState, "SPOILER");

export const filterStyle = (listToFilter, filter) => {
  return listToFilter.filter((e) => filter.indexOf(e.style) !== -1);
};

export const filterWhiteListedStyles = (styles, allowedStyles) => {
  return {
    BLOCK_TYPES: filterStyle(styles.BLOCK_TYPES, allowedStyles),
    INLINE_STYLES: filterStyle(styles.INLINE_STYLES, allowedStyles),
    CUSTOM_STYLES: filterStyle(styles.CUSTOM_STYLES, allowedStyles),
  };
};

export const createNewImmutableEntity = (editorState, element) => {
  const selection = editorState.getSelection();
  const contentBlock = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  const selectionState = editorState.getSelection();
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();
  const selectedText = contentBlock.getText().slice(start, end);
  const contentState = editorState.getCurrentContent();

  const contentStateEntity = contentState.createEntity(element, "IMMUTABLE", {
    text: selectedText,
  });

  return contentStateEntity;
};

export const insertEntityToState = (editorState, newEntity) => {
  const entityKey = newEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: newEntity,
  });
  const newState = RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey
  );

  return newState;
};

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

export const getInitialStyles = (altEditor, altLabels, props, editorStyles) => {
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

  if(altLabels){
    _editorStyles = {
      BLOCK_TYPES: replaceLabels(altLabels, _editorStyles.BLOCK_TYPES),
      INLINE_STYLES: replaceLabels(altLabels, _editorStyles.INLINE_STYLES),
      CUSTOM_STYLES: replaceLabels(altLabels, _editorStyles.CUSTOM_STYLES)
    }
  }
  return _editorStyles;
}

export const getInitialEditorState = (altEditor, initialState, DEFAULT_DECORATOR) => {
  const decorator = altEditor ? null: DEFAULT_DECORATOR;
  let initialStateEditor;
  if (initialState == null) {
    return EditorState.createEmpty(decorator);
  } else {
    const parsedState = JSON.parse(initialState);
    const contentState = convertFromRaw(parsedState);
    return EditorState.createWithContent(contentState, decorator);
  }
}

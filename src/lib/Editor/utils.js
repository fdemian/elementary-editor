import { EditorState, RichUtils } from "draft-js";

export const getBlockStyle = (block) => {
  let blockStyle = null;

  switch (block.getType()) {
    case "blockquote":
      blockStyle = "Blockquote";
      break;
    case "code-block":
      blockStyle = "Code";
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

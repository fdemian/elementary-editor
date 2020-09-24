"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertEntityToState = exports.createNewImmutableEntity = exports.filterWhiteListedStyles = exports.filterStyle = exports.findSpoilerEntities = exports.findLinkEntities = exports.findEntities = exports.getBlockStyle = void 0;

var _draftJs = require("draft-js");

var getBlockStyle = function getBlockStyle(block) {
  var blockStyle = null;

  switch (block.getType()) {
    case 'blockquote':
      blockStyle = 'Blockquote';
      break;

    case 'code-block':
      blockStyle = 'Code';
      break;

    default:
      blockStyle = null;
  }

  return blockStyle;
};

exports.getBlockStyle = getBlockStyle;

var findEntities = function findEntities(contentBlock, callback, contentState, type) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
  }, callback);
};

exports.findEntities = findEntities;

var findLinkEntities = function findLinkEntities(contentBlock, callback, contentState) {
  return findEntities(contentBlock, callback, contentState, 'LINK');
};

exports.findLinkEntities = findLinkEntities;

var findSpoilerEntities = function findSpoilerEntities(contentBlock, callback, contentState) {
  return findEntities(contentBlock, callback, contentState, 'SPOILER');
};

exports.findSpoilerEntities = findSpoilerEntities;

var filterStyle = function filterStyle(listToFilter, filter) {
  return listToFilter.filter(function (e) {
    return filter.indexOf(e.style) !== -1;
  });
};

exports.filterStyle = filterStyle;

var filterWhiteListedStyles = function filterWhiteListedStyles(styles, allowedStyles) {
  return {
    BLOCK_TYPES: filterStyle(styles.BLOCK_TYPES, allowedStyles),
    INLINE_STYLES: filterStyle(styles.INLINE_STYLES, allowedStyles),
    CUSTOM_STYLES: filterStyle(styles.CUSTOM_STYLES, allowedStyles)
  };
};

exports.filterWhiteListedStyles = filterWhiteListedStyles;

var createNewImmutableEntity = function createNewImmutableEntity(editorState, element) {
  var selection = editorState.getSelection();
  var contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
  var selectionState = editorState.getSelection();
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var selectedText = contentBlock.getText().slice(start, end);
  var contentState = editorState.getCurrentContent();
  var contentStateEntity = contentState.createEntity(element, 'IMMUTABLE', {
    text: selectedText
  });
  return contentStateEntity;
};

exports.createNewImmutableEntity = createNewImmutableEntity;

var insertEntityToState = function insertEntityToState(editorState, newEntity) {
  var entityKey = newEntity.getLastCreatedEntityKey();

  var newEditorState = _draftJs.EditorState.set(editorState, {
    currentContent: newEntity
  });

  var newState = _draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);

  return newState;
};

exports.insertEntityToState = insertEntityToState;
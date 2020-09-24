"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTeXBlock = exports.getTexBlock = exports.defaultContent = void 0;

var _draftJs = require("draft-js");

var defaultContent = {
  content: 'f(x) = ... '
};
exports.defaultContent = defaultContent;

var getTexBlock = function getTexBlock() {
  return {
    type: 'LATEX',
    mutability: 'Immutable',
    content: defaultContent
  };
};

exports.getTexBlock = getTexBlock;

var removeTeXBlock = function removeTeXBlock(editorState, blockKey) {
  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(blockKey);
  var targetRange = new _draftJs.SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength()
  });

  var withoutTeX = _draftJs.Modifier.removeRange(content, targetRange, 'backward');

  var resetBlock = _draftJs.Modifier.setBlockType(withoutTeX, withoutTeX.getSelectionAfter(), 'unstyled');

  var newState = _draftJs.EditorState.push(editorState, resetBlock, 'remove-range');

  var newStateWithoutTex = _draftJs.EditorState.forceSelection(newState, resetBlock.getSelectionAfter());

  return newStateWithoutTex;
};

exports.removeTeXBlock = removeTeXBlock;
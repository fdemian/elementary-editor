"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.removeLink = exports.insertLink = exports.insertMedia = void 0;

var _draftJs = _interopRequireDefault(require("draft-js"));

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Font awesome icons.
var EditorState = _draftJs.default.EditorState,
    RichUtils = _draftJs.default.RichUtils,
    AtomicBlockUtils = _draftJs.default.AtomicBlockUtils;
/* ----------------------------------------- */

var insertMedia = function insertMedia(editorState, type, value) {
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {
    src: value
  });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var mediaBlock = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, type);
  return mediaBlock;
};

exports.insertMedia = insertMedia;

var insertLink = function insertLink(editorState, type, value) {
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url: value
  });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey(); //

  var newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  var newStateSelection = newEditorState.getSelection();
  var linkState = RichUtils.toggleLink(newEditorState, newStateSelection, entityKey);
  return linkState;
};

exports.insertLink = insertLink;

var removeLink = function removeLink(editorState) {
  var selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    return RichUtils.toggleLink(editorState, selection, null);
  }

  return null;
};
/* ------------------- */


exports.removeLink = removeLink;
var BLOCK_TYPES = [{
  label: 'Quote',
  style: 'blockquote',
  icon: _freeSolidSvgIcons.faQuoteLeft
}, {
  label: 'Heading',
  style: 'header-two',
  icon: _freeSolidSvgIcons.faHeading
}, {
  label: 'Unordered List',
  style: 'unordered-list-item',
  icon: _freeSolidSvgIcons.faList
}, {
  label: 'Ordered List',
  style: 'ordered-list-item',
  icon: _freeSolidSvgIcons.faListOl
}, {
  label: 'Code Block',
  style: 'code-block',
  icon: _freeSolidSvgIcons.faCode
}];
var INLINE_STYLES = [{
  label: 'Bold',
  style: 'BOLD',
  icon: _freeSolidSvgIcons.faBold
}, {
  label: 'Italic',
  style: 'ITALIC',
  icon: _freeSolidSvgIcons.faItalic
}, {
  label: 'Underline',
  style: 'UNDERLINE',
  icon: _freeSolidSvgIcons.faUnderline
}, {
  label: 'Strikethrough',
  style: 'STRIKETHROUGH',
  icon: _freeSolidSvgIcons.faStrikethrough
}];
var CUSTOM_STYLES = [{
  label: 'Link',
  style: 'Link',
  toggleFn: insertLink,
  requiresInput: true,
  requiresSelection: true,
  icon: _freeSolidSvgIcons.faLink
}, {
  label: 'Remove Link',
  style: 'LinkRemove',
  toggleFn: removeLink,
  requiresInput: false,
  requiresSelection: false,
  icon: _freeSolidSvgIcons.faUnlink
}, {
  label: 'Image',
  style: 'Image',
  toggleFn: insertMedia,
  requiresInput: true,
  requiresSelection: false,
  icon: _freeSolidSvgIcons.faImage
}, {
  label: 'Spoiler',
  style: 'Spoiler',
  //toggleFn: insertSpoiler,
  requiresInput: false,
  requiresSelection: true,
  icon: _freeSolidSvgIcons.faEye
}, {
  label: 'Video',
  style: 'Video',
  toggleFn: insertMedia,
  requiresInput: true,
  requiresSelection: false,
  icon: _freeSolidSvgIcons.faVideo
}, {
  label: 'Latex',
  style: 'Latex',
  //toggleFn: insertTex,
  requiresInput: false,
  requiresSelection: false,
  icon: _freeSolidSvgIcons.faCalculator
}];
var EditorStyles = {
  BLOCK_TYPES: BLOCK_TYPES,
  INLINE_STYLES: INLINE_STYLES,
  CUSTOM_STYLES: CUSTOM_STYLES
};
var _default = EditorStyles;
exports.default = _default;
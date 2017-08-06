'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMedia = insertMedia;
exports.insertQuote = insertQuote;
exports.insertLink = insertLink;
exports.removeLink = removeLink;
exports.insertSpoiler = insertSpoiler;
exports.insertLaTexBlock = insertLaTexBlock;

var _draftJs = require('draft-js');

var _draftJs2 = _interopRequireDefault(_draftJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorState = _draftJs2.default.EditorState,
    RichUtils = _draftJs2.default.RichUtils,
    AtomicBlockUtils = _draftJs2.default.AtomicBlockUtils;


var BLOCK_TYPES = [{ label: 'Quote', style: 'blockquote', icon: "quote-left" }, { label: 'Heading', style: 'header-two', icon: "header" }, { label: 'Unordered List', style: 'unordered-list-item', icon: "list" }, { label: 'Ordered List', style: 'ordered-list-item', icon: "list-ol" }, { label: 'Code Block', style: 'code-block', icon: "code" }];

var INLINE_STYLES = [{ label: 'Bold', style: 'BOLD', icon: "bold" }, { label: 'Italic', style: 'ITALIC', icon: "italic" }, { label: 'Underline', style: 'UNDERLINE', icon: "underline" }, { label: 'Strikethrough', style: 'STRIKETHROUGH', icon: "strikethrough" }];

var CUSTOM_STYLES = [{ label: 'Link', style: 'Link', toggleFn: insertLink, requiresInput: true, requiresSelection: true, icon: "link" }, { label: 'Remove Link', style: 'LinkRemove', toggleFn: removeLink, requiresInput: false, requiresSelection: false, icon: "unlink" }, { label: 'Image', style: 'Image', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: "picture-o" }, { label: 'Spoiler', style: 'Spoiler', toggleFn: insertSpoiler, requiresInput: false, requiresSelection: true, icon: "eye" }, { label: 'Video', style: 'Video', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: "video-camera" }, { label: 'Latex', style: 'Latex', toggleFn: insertLaTexBlock, requiresInput: false, requiresSelection: false, icon: "calculator" }];

/* ------------------------------------------------------------------------------------------------------ */

// TODO: todo esta implementado como toggleLink, editor state debería llegar por parámetro?
function insertEntity(editor, editorState, newContentState) {
  var entityKey = newContentState.getLastCreatedEntityKey();
  var newEditorState = EditorState.set(editorState, { currentContent: newContentState });
  editor.setState({
    editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
  }, function () {
    setTimeout(function () {
      return editor.refs.editor.focus();
    }, 0);
  });
}

function insertMedia(editor, type, value) {
  var editorState = editor.state.editorState;

  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', { src: value });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  editor.setState({
    editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'media')
  }, function () {
    setTimeout(function () {
      return editor.focus();
    }, 0);
  });
}

function insertQuote(editor, type, value) {
  var editorState = editor.state.editorState;

  var contentState = editorState.getCurrentContent();
  var params = { text: value.text, author: value.author };
  var contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', params);
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  editor.setState({
    editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
  }, function () {
    setTimeout(function () {
      return editor.focus();
    }, 0);
  });
}

function insertLink(editor, type, value) {
  var editorState = editor.state.editorState;

  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: value });
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  var newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  var newStateSelection = newEditorState.getSelection();

  editor.setState({
    editorState: RichUtils.toggleLink(newEditorState, newStateSelection, entityKey)
  }, function () {
    setTimeout(function () {
      return editor.focus();
    }, 0);
  });
}

function removeLink(editor) {
  var editorState = editor.state.editorState;

  var selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    editor.setState({
      editorState: RichUtils.toggleLink(editorState, selection, null)
    });
  }
}

function insertSpoiler(editor) {
  var editorState = editor.state.editorState;

  var selection = editorState.getSelection();
  var contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
  var selectionState = editorState.getSelection();
  var start = selectionState.getStartOffset();
  var end = selectionState.getEndOffset();
  var selectedText = contentBlock.getText().slice(start, end);
  var contentState = editorState.getCurrentContent();

  var contentStateWithEntity = contentState.createEntity('SPOILER', 'IMMUTABLE', { text: selectedText });
  insertEntity(editor, editorState, contentStateWithEntity);
}

function insertLaTexBlock(editor) {
  editor.insertTex();
}

var EditorStyles = { BLOCK_TYPES: BLOCK_TYPES, INLINE_STYLES: INLINE_STYLES, CUSTOM_STYLES: CUSTOM_STYLES };

exports.default = EditorStyles;
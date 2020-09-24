"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseEditor = function BaseEditor(config) {
  var AltEditor = config.altEditor;

  if (AltEditor) {
    return /*#__PURE__*/_react.default.createElement(AltEditor, {
      blockStyleFn: config.getBlockStyle,
      blockRendererFn: config.blockRendererFn,
      blockRenderMap: config.blockRenderMap,
      editorState: config.editorState,
      handleKeyCommand: config.handleKeyCommand,
      onChange: config.onChange,
      ref: config.reference,
      spellCheck: config.spellCheck,
      readOnly: config.readOnly
    });
  }

  return /*#__PURE__*/_react.default.createElement(_draftJs.Editor, {
    blockStyleFn: config.getBlockStyle,
    blockRendererFn: config.blockRendererFn,
    blockRenderMap: config.blockRenderMap,
    editorState: config.editorState,
    handleKeyCommand: config.handleKeyCommand,
    onChange: config.onChange,
    ref: config.reference,
    spellCheck: config.spellCheck,
    readOnly: config.readOnly
  });
};

var _default = BaseEditor;
exports.default = _default;
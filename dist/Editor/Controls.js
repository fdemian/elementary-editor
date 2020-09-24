"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyleButton = _interopRequireDefault(require("./StyleButton"));

var _URLInput = _interopRequireDefault(require("./URLInput"));

require("./css/Controls.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorControls = function EditorControls(props) {
  var editorStyles = props.editorStyles,
      blockIsActive = props.blockIsActive,
      inlineIsActive = props.inlineIsActive,
      customBlockIsActive = props.customBlockIsActive,
      customBlockToggleFn = props.customBlockToggleFn,
      onToggleInline = props.onToggleInline,
      onToggleBlock = props.onToggleBlock,
      confirmInput = props.confirmInput,
      onInputChange = props.onInputChange,
      showInput = props.showInput,
      cancelInput = props.cancelInput,
      inputVisible = props.inputVisible,
      inputType = props.inputType,
      inputValue = props.inputValue;

  if (inputVisible) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "EditorControls"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "RichEditor-controls"
    }, /*#__PURE__*/_react.default.createElement(_URLInput.default, {
      changeFn: onInputChange,
      urlValue: inputValue,
      type: inputType,
      cancelFn: cancelInput,
      confirmFn: confirmInput
    })));
  } // TODO merge stylebutton mappings.


  return /*#__PURE__*/_react.default.createElement("div", {
    className: "EditorControls"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "RichEditor-controls"
  }, editorStyles.INLINE_STYLES.map(function (type) {
    return /*#__PURE__*/_react.default.createElement(_StyleButton.default, {
      key: type.label,
      activeFn: inlineIsActive.bind(type.style),
      label: type.label,
      onToggle: onToggleInline,
      style: type.style,
      icon: type.icon
    });
  }), editorStyles.BLOCK_TYPES.map(function (type) {
    return /*#__PURE__*/_react.default.createElement(_StyleButton.default, {
      key: type.label,
      activeFn: blockIsActive.bind(type.style),
      label: type.label,
      onToggle: onToggleBlock,
      style: type.style,
      icon: type.icon
    });
  }), editorStyles.CUSTOM_STYLES.map(function (type) {
    return /*#__PURE__*/_react.default.createElement(_StyleButton.default, {
      key: type.label,
      activeFn: customBlockIsActive,
      label: type.label,
      onToggle: customBlockToggleFn,
      getInput: showInput,
      style: type.style,
      icon: type.icon
    });
  })));
};

var _default = EditorControls;
exports.default = _default;
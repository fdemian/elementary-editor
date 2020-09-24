"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

require("./css/StyleButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleButton = function StyleButton(props) {
  var onToggle = props.onToggle,
      getInput = props.getInput,
      activeFn = props.activeFn,
      icon = props.icon,
      style = props.style,
      label = props.label;
  var isActive = activeFn(style);
  var iconColor = isActive ? 'black' : 'gainsboro';
  var iconStyle = {
    color: iconColor,
    marginTop: '6px'
  };

  var toggleFn = function toggleFn(e) {
    e.preventDefault();
    onToggle(style);
  };

  return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    placement: "bottom",
    title: label
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "StyleButton",
    onClick: function onClick(blockName) {
      return toggleFn(blockName, getInput);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "lg",
    style: iconStyle,
    icon: icon
  })));
};

var _default = StyleButton;
exports.default = _default;
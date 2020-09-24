"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var URLInput = function URLInput(_ref) {
  var changeFn = _ref.changeFn,
      urlValue = _ref.urlValue,
      confirmFn = _ref.confirmFn,
      cancelFn = _ref.cancelFn,
      type = _ref.type;
  var hintText = "Enter ".concat(type.toLowerCase(), " URL");
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "url-input-container"
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    name: "URL input",
    onChange: changeFn,
    value: urlValue,
    placeholder: hintText,
    style: {
      width: '400px',
      marginLeft: '40px',
      marginTop: '10px'
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginLeft: '8px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: cancelFn,
    style: {
      marginRight: '2px'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faTimes
  })), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: confirmFn
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCheck
  }))));
};

var _default = URLInput;
exports.default = _default;
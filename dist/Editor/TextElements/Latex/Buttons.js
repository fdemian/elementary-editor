"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorButtons = function EditorButtons(_ref) {
  var invalid = _ref.invalid,
      removeFn = _ref.removeFn,
      saveFn = _ref.saveFn;

  if (invalid) {
    return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
      size: "large",
      style: {
        marginLeft: '40%'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      className: "danger-btn",
      type: "danger",
      onClick: removeFn
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      name: _freeSolidSvgIcons.faTimes,
      size: "lg"
    }), "\xA0 Remove"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      disabled: true
    }, "Invalid TeX"));
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    size: "large",
    style: {
      marginLeft: '40%'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "danger",
    onClick: removeFn,
    className: "edit-panel-remove-btn"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faTimes
  }), "\xA0 Remove"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: saveFn,
    className: "edit-panel-ok-btn"
  }, "Done \xA0", /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCheck
  })));
};

var _default = EditorButtons;
exports.default = _default;
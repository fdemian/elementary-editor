"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _Buttons = _interopRequireDefault(require("./Buttons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = _antd.Input.TextArea;
var textAreaStyle = {
  width: '20%',
  marginLeft: '40%'
};

var EditPanel = function EditPanel(props) {
  var editMode = props.editMode,
      onValueChange = props.onValueChange,
      texValue = props.texValue,
      invalidTeX = props.invalidTeX,
      save = props.save,
      remove = props.remove;
  if (!editMode) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "edit-panel-container"
  }, /*#__PURE__*/_react.default.createElement(TextArea, {
    rows: 2,
    style: textAreaStyle,
    onChange: onValueChange,
    value: texValue
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    invalid: invalidTeX,
    removeFn: remove,
    saveFn: save
  })));
};

var _default = EditPanel;
exports.default = _default;
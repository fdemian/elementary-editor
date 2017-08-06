'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css2 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URLInput = function URLInput(_ref) {
  var changeFn = _ref.changeFn,
      urlValue = _ref.urlValue,
      confirmFn = _ref.confirmFn,
      cancelFn = _ref.cancelFn,
      type = _ref.type;


  var hintText = "Enter " + type.toLowerCase() + " URL";

  return _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(_input2.default, {
        name: "URL input",
        onChange: changeFn,
        value: urlValue,
        placeholder: hintText,
        style: { 'width': '400px', 'marginLeft': '40px', 'marginTop': '10px' }
      })
    ),
    _react2.default.createElement(
      'span',
      { style: { 'marginLeft': '8px' } },
      _react2.default.createElement(_button2.default, { type: 'primary', icon: 'close', onClick: cancelFn, style: { 'marginRight': '2px' } }),
      _react2.default.createElement(_button2.default, { type: 'primary', icon: 'check', onClick: confirmFn })
    )
  );
};

exports.default = URLInput;
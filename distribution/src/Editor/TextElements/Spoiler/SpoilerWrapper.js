'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Spoiler = require('./Spoiler');

var _Spoiler2 = _interopRequireDefault(_Spoiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpoilerWrapper = function SpoilerWrapper(_ref) {
  var decoratedText = _ref.decoratedText;


  return _react2.default.createElement(_Spoiler2.default, { text: decoratedText });
};

exports.default = SpoilerWrapper;
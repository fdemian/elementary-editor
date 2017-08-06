'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Spoiler = require('../../Editor/TextElements/Spoiler/Spoiler');

var _Spoiler2 = _interopRequireDefault(_Spoiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');
  var spoilerText = "link";

  _reactDom2.default.render(_react2.default.createElement(_Spoiler2.default, { text: spoilerText }), div);
});
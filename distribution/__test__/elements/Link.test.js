'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RenderLink = require('../../Editor/TextElements/Link/RenderLink');

var _RenderLink2 = _interopRequireDefault(_RenderLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');
  var linkSrc = "http://www.mypage.com";
  var linkText = "link";

  _reactDom2.default.render(_react2.default.createElement(_RenderLink2.default, { src: linkSrc, text: linkText }), div);
});
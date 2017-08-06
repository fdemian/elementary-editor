'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraftRenderer = require('../../../DraftRenderer/DraftRenderer');

var _DraftRenderer2 = _interopRequireDefault(_DraftRenderer);

require('./QuoteBlock.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuoteBlock = function QuoteBlock(_ref) {
  var comment = _ref.comment;


  var rawContent = JSON.parse(comment.content);

  return _react2.default.createElement(
    'blockquote',
    { cite: comment.author },
    _react2.default.createElement(_DraftRenderer2.default, { raw: rawContent })
  );
};

exports.default = QuoteBlock;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuoteBlock = require('./QuoteBlock');

var _QuoteBlock2 = _interopRequireDefault(_QuoteBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuoteBlockWrapper = function QuoteBlockWrapper(props) {

  var entity = props.contentState.getEntity(props.block.getEntityAt(0));

  var comment = entity.getData().props;

  return _react2.default.createElement(_QuoteBlock2.default, { comment: comment });
};

exports.default = QuoteBlockWrapper;
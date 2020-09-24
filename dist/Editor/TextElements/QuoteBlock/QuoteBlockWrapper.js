"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _QuoteBlock = _interopRequireDefault(require("./QuoteBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuoteBlockWrapper = function QuoteBlockWrapper(props) {
  var entity = props.contentState.getEntity(props.block.getEntityAt(0));
  var comment = entity.getData().props;
  return /*#__PURE__*/_react.default.createElement(_QuoteBlock.default, {
    comment: comment
  });
};

var _default = QuoteBlockWrapper;
exports.default = _default;
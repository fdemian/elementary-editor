"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DraftRenderer = _interopRequireDefault(require("../../../DraftRenderer/DraftRenderer"));

require("./QuoteBlock.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuoteBlock = function QuoteBlock(_ref) {
  var comment = _ref.comment;
  var rawContent = JSON.parse(comment.content);
  return /*#__PURE__*/_react.default.createElement("blockquote", {
    cite: comment.author
  }, /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
    raw: rawContent
  }));
};

var _default = QuoteBlock;
exports.default = _default;
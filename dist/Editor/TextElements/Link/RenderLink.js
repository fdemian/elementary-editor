"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderLink = function RenderLink(_ref) {
  var url = _ref.url,
      text = _ref.text;
  return /*#__PURE__*/_react.default.createElement("a", {
    href: url,
    rel: "nofollow"
  }, text);
};

var _default = RenderLink;
exports.default = _default;
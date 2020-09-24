"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Spoiler = _interopRequireDefault(require("./Spoiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpoilerWrapper = function SpoilerWrapper(_ref) {
  var decoratedText = _ref.decoratedText;
  return /*#__PURE__*/_react.default.createElement(_Spoiler.default, {
    text: decoratedText
  });
};

var _default = SpoilerWrapper;
exports.default = _default;
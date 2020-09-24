"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _redraft = _interopRequireDefault(require("redraft"));

var _Renderers = _interopRequireDefault(require("./Renderers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderWarning = function RenderWarning() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "render-warning"
  }, "Nothing to render.");
};

var Renderer = function Renderer(_ref) {
  var raw = _ref.raw;
  if (!raw) return /*#__PURE__*/_react.default.createElement(RenderWarning, null);
  var rendered = (0, _redraft.default)(raw, _Renderers.default);
  if (!rendered) return /*#__PURE__*/_react.default.createElement(RenderWarning, null);
  return /*#__PURE__*/_react.default.createElement("div", null, rendered);
};

var _default = Renderer;
exports.default = _default;
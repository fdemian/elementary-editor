"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RenderLink = _interopRequireDefault(require("./RenderLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(props) {
  var contentState = props.contentState,
      entityKey = props.entityKey;
  var entityInstance = contentState.getEntity(entityKey);

  var _entityInstance$getDa = entityInstance.getData(),
      url = _entityInstance$getDa.url;

  return /*#__PURE__*/_react.default.createElement(_RenderLink.default, {
    url: url,
    text: props.children
  });
};

var _default = Link;
exports.default = _default;
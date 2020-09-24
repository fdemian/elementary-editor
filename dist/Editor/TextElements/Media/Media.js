"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Media = function Media(props) {
  var src;
  var contentState = props.contentState,
      block = props.block;

  if (contentState !== null && contentState !== undefined) {
    var entity = contentState.getEntity(block.getEntityAt(0));
    src = entity.getData().src;
    if (entity.getType() === "Image") return /*#__PURE__*/_react.default.createElement("img", {
      src: src,
      alt: ""
    });
  } else {
    src = props.src;
  }

  return /*#__PURE__*/_react.default.createElement(_reactPlayer.default, {
    url: src,
    playing: false
  });
};

var _default = Media;
exports.default = _default;
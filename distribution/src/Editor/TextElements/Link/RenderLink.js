"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderLink = function RenderLink(_ref) {
   var url = _ref.url,
       text = _ref.text;

   return _react2.default.createElement(
      "a",
      { href: url, rel: "nofollow" },
      text
   );
};

exports.default = RenderLink;
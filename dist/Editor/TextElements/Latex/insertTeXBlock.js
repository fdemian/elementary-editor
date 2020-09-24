"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultContent = {
  content: 'f(x) = ... '
};

var getTexBlock = function getTexBlock() {
  return {
    type: 'LATEX',
    mutability: 'Immutable',
    content: defaultContent
  };
};

var _default = getTexBlock;
exports.default = _default;
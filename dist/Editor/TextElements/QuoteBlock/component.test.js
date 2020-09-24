"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _QuoteBlock = _interopRequireDefault(require("./QuoteBlock"));

var _QuoteBlockWrapper = _interopRequireDefault(require("./QuoteBlockWrapper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentContent = {
  "blocks": [{
    "key": "1bkrq",
    "text": "asdfdsfdasfdsaf",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [{
      "offset": 0,
      "length": 15,
      "style": "BOLD"
    }],
    "entityRanges": [],
    "data": {}
  }],
  "entityMap": {}
};
var commentProps = {
  comment: {
    content: JSON.stringify(commentContent),
    author: "user1"
  }
};
describe("<QuoteBlock />", function () {
  it("<QuoteBlock />", function () {
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_QuoteBlock.default, commentProps));
    expect(component[0].name).toStrictEqual('blockquote');
    expect(component[0].attribs.cite).toStrictEqual("user1");
  });
  it("<QuoteBlockWrapper />", function () {
    var wrapperProps = {
      contentState: {
        getEntity: function getEntity(e) {
          return {
            getData: function getData() {
              return {
                props: commentProps.comment
              };
            }
          };
        }
      },
      block: {
        getEntityAt: function getEntityAt(n) {
          return n;
        }
      }
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_QuoteBlockWrapper.default, wrapperProps));
    expect(component[0].name).toStrictEqual('blockquote');
    expect(component[0].attribs.cite).toStrictEqual("user1");
  });
});
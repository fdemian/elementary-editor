"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _RenderLink = _interopRequireDefault(require("./RenderLink"));

var _Link = _interopRequireDefault(require("./Link"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Link >", function () {
  it("<RenderLink />", function () {
    var props = {
      url: "www.url.com",
      text: "Link Text"
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_RenderLink.default, props));
    var componentAttribs = component[0]['attribs'];
    expect(componentAttribs['rel']).toStrictEqual("nofollow");
    expect(componentAttribs['href']).toStrictEqual("www.url.com");
  });
  it("<Link />", function () {
    var urlprops = {
      url: "www.url.com",
      text: "Link Text"
    };
    var props = {
      children: urlprops.text,
      contentState: {
        getEntity: function getEntity(e) {
          return {
            getData: function getData() {
              return urlprops;
            }
          };
        }
      },
      entityKey: 1
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Link.default, props));
    var componentAttribs = component[0]['attribs'];
    expect(componentAttribs['rel']).toStrictEqual("nofollow");
    expect(componentAttribs['href']).toStrictEqual("www.url.com");
  });
});
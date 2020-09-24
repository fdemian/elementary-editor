"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _Media = _interopRequireDefault(require("./Media"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(function () {
  var React = jest.requireActual('react');

  React.Suspense = function (_ref) {
    var children = _ref.children;
    return children;
  };

  return React;
});
describe("<Media >", function () {
  it("<Img />", function () {
    var imgProps = {
      src: "www.url.com/image.png"
    };
    var props = {
      block: {
        getEntityAt: function getEntityAt(n) {}
      },
      contentState: {
        getEntity: function getEntity(e) {
          return {
            getType: function getType() {
              return "Image";
            },
            getData: function getData() {
              return imgProps;
            }
          };
        }
      },
      entityKey: 1
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Media.default, props));
    var componentAttribs = component[0]['attribs'];
    expect(componentAttribs['src']).toStrictEqual("www.url.com/image.png");
    expect(componentAttribs['alt']).toStrictEqual("");
  });
  it("<Video /> (ReactPlayer)", function () {
    var videoSrc = "www.url.com/video.mp4";
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Media.default, {
      src: videoSrc
    }));
    var player = component.find(_reactPlayer.default);
    expect(player.length).toStrictEqual(1);
    expect(player.props().url).toStrictEqual(videoSrc);
    expect(player.props().playing).toStrictEqual(false);
  });
});
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = require("react-dom/test-utils");

var _enzyme = require("enzyme");

var _Spoiler = _interopRequireDefault(require("./Spoiler"));

var _SpoilerWrapper = _interopRequireDefault(require("./SpoilerWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container;
beforeEach(function () {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(function () {
  document.body.removeChild(container);
  container = null;
});
var spoilerProps = {
  text: "spoiler text"
};
describe("<Spoiler />", function () {
  it("<Spoiler />", function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Spoiler.default, spoilerProps));
    var textSpan = component.find('span');
    var spanProps = textSpan.props();
    expect(spanProps.children).toStrictEqual('spoiler text');
    expect(spanProps.className).toStrictEqual("Spoiler Concealed");
    expect(spanProps.role).toStrictEqual('presentation');
  });
  it("<SpoilerWrapper />", function () {
    var wrapperProps = {
      decoratedText: spoilerProps
    };
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SpoilerWrapper.default, wrapperProps));
    var spoilerComponent = component.find(_Spoiler.default);
    expect(spoilerComponent.length).toStrictEqual(1);
  });
  it('Interaction test (text revealed and hidden)', function () {
    // Test first render and effect
    (0, _testUtils.act)(function () {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Spoiler.default, spoilerProps), container);
    });
    var span = container.querySelector('span');
    expect(span.className).toStrictEqual("Spoiler Concealed"); // Test second render and effect

    (0, _testUtils.act)(function () {
      span.dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
    });
    expect(span.className).toStrictEqual("Spoiler ");
  });
});
"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DraftRenderer = _interopRequireDefault(require("./DraftRenderer"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentStateDesc = {
  "blocks": [{
    "key": "ags7e",
    "text": "Text",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }],
  "entityMap": {}
};
var invalidContentState = {
  "blocsks": [{
    "keyf": "ags7e",
    "text": "Text",
    "type": "unstyled",
    "depath": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }],
  "entityMap": {}
};
describe("<DraftRenderer />", function () {
  beforeEach(function () {
    var React = jest.requireActual('react');

    React.Suspense = function (_ref) {
      var children = _ref.children;
      return children;
    };

    return React;
  });
  it("Correctly render some draft-js state.", function () {
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: contentStateDesc
    }));
    expect(component.length).toStrictEqual(1);
  });
  it("Render inline elements.", function () {
    var componentsToRender = [{
      htmlTag: "strong",
      draftState: {
        "blocks": [{
          "key": "e06sa",
          "text": "Test",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [{
            "offset": 0,
            "length": 4,
            "style": "BOLD"
          }],
          "entityRanges": [],
          "data": {}
        }],
        "entityMap": {}
      }
    }, {
      htmlTag: "em",
      // Italic
      draftState: {
        "blocks": [{
          "key": "e06sa",
          "text": "Italic",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [{
            "offset": 0,
            "length": 6,
            "style": "ITALIC"
          }],
          "entityRanges": [],
          "data": {}
        }],
        "entityMap": {}
      }
    }, {
      htmlTag: "u",
      // underline
      draftState: {
        "blocks": [{
          "key": "e06sa",
          "text": "Underline",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [{
            "offset": 0,
            "length": 9,
            "style": "UNDERLINE"
          }],
          "entityRanges": [],
          "data": {}
        }],
        "entityMap": {}
      }
    }, {
      htmlTag: 'h2',
      draftState: {
        "blocks": [{
          "key": "edmlk",
          "text": "Header Text",
          "type": "header-two",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }],
        "entityMap": {}
      }
    }, {
      htmlTag: 'pre',
      draftState: {
        "blocks": [{
          "key": "edmlk",
          "text": "function()",
          "type": "code-block",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }],
        "entityMap": {}
      }
    }];

    for (var _i = 0, _componentsToRender = componentsToRender; _i < _componentsToRender.length; _i++) {
      var element = _componentsToRender[_i];
      var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
        raw: element.draftState
      }));
      var boldComponent = component.find(element.htmlTag);
      expect(boldComponent[0].name).toStrictEqual(element.htmlTag);
    }
  });
  it("Render blockquote element.", function () {
    var boldQuote = {
      "blocks": [{
        "key": "e06sa",
        "text": "bold quote",
        "type": "blockquote",
        "depth": 0,
        "inlineStyleRanges": [{
          "offset": 0,
          "length": 10,
          "style": "BOLD"
        }],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: boldQuote
    }));
    var blockquote = component.find('blockquote');
    var bold = blockquote.find('strong');
    expect(blockquote.length).toStrictEqual(1);
    expect(bold.length).toStrictEqual(1);
  });
  it("Render unordered list.", function () {
    var ulState = {
      "blocks": [{
        "key": "edmlk",
        "text": "one",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "d7pec",
        "text": "two",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "ocg8",
        "text": "three",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: ulState
    }));
    var ulElement = component.find('ul');
    var listElem = component.find('li');
    expect(ulElement.length).toStrictEqual(1);
    expect(listElem.length).toStrictEqual(3);
  });
  it("Render ordered list.", function () {
    var olState = {
      "blocks": [{
        "key": "edmlk",
        "text": "one",
        "type": "ordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "cgpf",
        "text": "two",
        "type": "ordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "2bkc3",
        "text": "three",
        "type": "ordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: olState
    }));
    var olElement = component.find('ol');
    var listElem = component.find('li');
    expect(olElement.length).toStrictEqual(1);
    expect(listElem.length).toStrictEqual(3);
  });
  it("Render <img> element.", function () {
    var imgUrl = 'https://www.url.com/image.jpg';
    var imgState = {
      "blocks": [{
        "key": "edmlk",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "epdm5",
        "text": "Image",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 5,
          "key": 0
        }],
        "data": {}
      }, {
        "key": "4kijn",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "Image",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "https://www.url.com/image.jpg"
          }
        }
      }
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: imgState
    }));
    var imgElement = component.find('img');
    expect(imgElement.length).toStrictEqual(1);
    expect(imgElement[0]['attribs']['src']).toStrictEqual(imgUrl);
  }); // TODO: find where is the href prop.

  it("Render <Link> element.", function () {
    var linkUrl = "http://www.url.com";
    var linkState = {
      "blocks": [{
        "key": "c7tkv",
        "text": "Link",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 4,
          "key": 0
        }],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "LINK",
          "mutability": "MUTABLE",
          "data": {
            "url": linkUrl
          }
        }
      }
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: linkState
    }));
    var linkElement = component.find('a');
    expect(linkElement.length).toStrictEqual(1);
    expect(linkElement.text()).toStrictEqual('Link');
    expect(linkElement[0]['attribs'].rel).toStrictEqual('nofollow');
  });
  it("Render <Spoiler> element.", function () {
    var spoilerText = "spoiled text";
    var spoilerState = {
      "blocks": [{
        "key": "bgdnj",
        "text": spoilerText,
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 12,
          "key": 0
        }],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "SPOILER",
          "mutability": "IMMUTABLE",
          "data": {
            "text": spoilerText
          }
        }
      }
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: spoilerState
    }));
    var textSpan = component.find('span');
    expect(textSpan.text()).toStrictEqual(spoilerText);
    expect(textSpan[0]['attribs'].class).toStrictEqual("Spoiler Concealed");
    expect(textSpan[0]['attribs'].role).toStrictEqual('presentation');
  });
  it("Render <Latex> element.", function () {
    //const spoilerText = "spoiled text";
    var latexState = {
      "blocks": [{
        "key": "5a36h",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "e6b3g",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 1,
          "key": 0
        }],
        "data": {}
      }, {
        "key": "75dr8",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "LATEX",
          "mutability": "Immutable",
          "data": {
            "content": "f(x) = ... "
          }
        }
      }
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: latexState
    }));
    var span = component.find('span');
    expect(span[0]['attribs'].class).toStrictEqual('latex-block');
  });
  it("Render <Video> element.", function () {
    var videoSrc = "www.url.com/video.mp4";
    var videoState = {
      "blocks": [{
        "key": "1e7ve",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }, {
        "key": "9t06p",
        "text": "Video",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
          "offset": 0,
          "length": 5,
          "key": 0
        }],
        "data": {}
      }, {
        "key": "9q4nr",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {
        "0": {
          "type": "Video",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "www.url.com/video.mp4"
          }
        }
      }
    };
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: videoState
    }));
    var videoElement = component.find('.video-element');
    expect(videoElement.length).toStrictEqual(1);
  });
  it("Rendering null state (show 'nothing to render' warning).", function () {
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: null
    }));
    var componentClass = component[0]['attribs']['class'];
    var componentName = component[0]['name'];
    expect(componentClass).toStrictEqual('render-warning');
    expect(componentName).toStrictEqual('div');
    expect(component.text()).toStrictEqual('Nothing to render.');
  });
  it("Rendering invalid content state (show 'nothing to render' warning).", function () {
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_DraftRenderer.default, {
      raw: invalidContentState
    }));
    var componentClass = component[0]['attribs']['class'];
    var componentName = component[0]['name'];
    expect(componentClass).toStrictEqual('render-warning');
    expect(componentName).toStrictEqual('div');
    expect(component.text()).toStrictEqual('Nothing to render.');
  });
});
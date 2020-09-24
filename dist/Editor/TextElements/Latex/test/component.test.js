"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _antd = require("antd");

var _testUtils = require("react-dom/test-utils");

var _enzyme = require("enzyme");

var _LatexBlock = _interopRequireDefault(require("../LatexBlock"));

var _TeXBlock = _interopRequireDefault(require("../TeXBlock"));

var _Buttons = _interopRequireDefault(require("../Buttons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentStateDesc = {
  "contentState": {
    "entityMap": {},
    "blockMap": {
      "d6790": {
        "key": "d6790",
        "type": "unstyled",
        "text": "",
        "characterList": [],
        "depth": 0,
        "data": {}
      },
      "d2b6a": {
        "key": "d2b6a",
        "type": "atomic",
        "text": " ",
        "characterList": [{
          "style": [],
          "entity": "1"
        }],
        "depth": 0,
        "data": {}
      },
      "1i5ek": {
        "key": "1i5ek",
        "type": "unstyled",
        "text": "",
        "characterList": [],
        "depth": 0,
        "data": {}
      }
    },
    "selectionBefore": {
      "anchorKey": "d6790",
      "anchorOffset": 0,
      "focusKey": "d6790",
      "focusOffset": 0,
      "isBackward": false,
      "hasFocus": false
    },
    "selectionAfter": {
      "anchorKey": "1i5ek",
      "anchorOffset": 0,
      "focusKey": "1i5ek",
      "focusOffset": 0,
      "isBackward": false,
      "hasFocus": true
    }
  },
  "block": {
    "key": "d2b6a",
    "type": "atomic",
    "text": " ",
    "characterList": [{
      "style": [],
      "entity": "1"
    }],
    "depth": 0,
    "data": {}
  },
  "blockProps": {},
  "customStyleMap": {
    "BOLD": {
      "fontWeight": "bold"
    },
    "CODE": {
      "fontFamily": "monospace",
      "wordWrap": "break-word"
    },
    "ITALIC": {
      "fontStyle": "italic"
    },
    "STRIKETHROUGH": {
      "textDecoration": "line-through"
    },
    "UNDERLINE": {
      "textDecoration": "underline"
    }
  },
  "decorator": {
    "_decorators": [{}, {}]
  },
  "direction": "LTR",
  "forceSelection": true,
  "offsetKey": "d2b6a-0-0",
  "selection": {
    "anchorKey": "1i5ek",
    "anchorOffset": 0,
    "focusKey": "1i5ek",
    "focusOffset": 0,
    "isBackward": false,
    "hasFocus": true
  },
  "tree": [{
    "start": 0,
    "end": 1,
    "decoratorKey": null,
    "leaves": [{
      "start": 0,
      "end": 1
    }]
  }]
};
var bProps = JSON.parse(JSON.stringify(contentStateDesc));
var container;
beforeEach(function () {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(function () {
  document.body.removeChild(container);
  container = null;
});
describe("Latex", function () {
  it("<TexBlock />", function () {
    bProps.block.getKey = function () {
      return 0;
    };

    bProps.blockProps.onStartEdit = function (k) {
      return null;
    };

    bProps.block.getEntityAt = function (n) {};

    bProps.contentState.getEntity = function (e) {
      return {
        getData: function getData() {
          return {
            content: 'f(x) = ... '
          };
        }
      };
    };

    (0, _testUtils.act)(function () {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_TeXBlock.default, bProps), container);
    });
    var div = container.querySelector('div');
    var katexOutput = div.querySelector('.katex-output');
    var editPanel = div.querySelector('.edit-panel-container');
    expect(div.className).toStrictEqual('TeXEditor-tex');
    expect(katexOutput).toBeTruthy();
    expect(editPanel).toStrictEqual(null);
    expect(katexOutput.className).toStrictEqual('katex-output'); // Trigger editing mode on KatexBlock.

    (0, _testUtils.act)(function () {
      katexOutput.dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
    });
    editPanel = div.querySelector('.edit-panel-container');
    expect(editPanel).toBeTruthy();
    expect(div.className).toStrictEqual('TeXEditor-tex TeXEditor-activeTeX'); // TODO:
    // Trigger edit update.
    // Trigger remove button.

    /*
    const okButton = editPanel.querySelector('.edit-panel-ok-btn');
        // Ok button. Disable edit.
    act(() => {
      okButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
      //editPanel = div.querySelector('.edit-panel-container');
    //expect(editPanel).toStrictEqual(null);
    */
  });
  it("<LatexBlock />", function () {
    var props = {
      content: 'f(x) = ... '
    };
    (0, _testUtils.act)(function () {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_LatexBlock.default, props), container);
    });
    var span = container.querySelector('span');
    expect(span.className).toStrictEqual('latex-block');
    (0, _testUtils.act)(function () {
      container.dispatchEvent(new Event('timeupdate', {
        bubbles: true
      }));
    }); //span = container.querySelector('span');
  });
  it("<Buttons /> invalid tex", function () {
    var props = {
      invalid: true,
      removeFn: jest.fn(),
      saveFn: jest.fn()
    };
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Buttons.default, props));
    var buttons = component.children();
    expect(buttons[0]['attribs'].class).toStrictEqual('ant-btn danger-btn ant-btn-danger');
    expect(buttons[1]['attribs'].disabled).toStrictEqual("");
    expect(buttons.length).toStrictEqual(2);
  });
});
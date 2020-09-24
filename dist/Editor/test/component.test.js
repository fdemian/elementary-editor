"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = require("react-dom/test-utils");

var _enzyme = require("enzyme");

var _antd = require("antd");

var _immutable = require("immutable");

var _draftJs = require("draft-js");

var _Editor = _interopRequireDefault(require("../Editor"));

var _Controls = _interopRequireDefault(require("../Controls"));

var _EditorStyles = _interopRequireWildcard(require("../EditorStyles"));

var _BaseEditor = _interopRequireDefault(require("../BaseEditor"));

var _StyleButton = _interopRequireDefault(require("../StyleButton"));

var _URLInput = _interopRequireDefault(require("../URLInput"));

var _testingUtils = require("../../testingUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addEmptyBlock = function addEmptyBlock(editorState) {
  var newBlock = new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, _immutable.List)()
  });
  var contentState = editorState.getCurrentContent();
  var newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock);
  return _draftJs.EditorState.push(editorState, _draftJs.ContentState.createFromBlockArray(newBlockMap.toArray()).set('selectionBefore', contentState.getSelectionBefore()).set('selectionAfter', contentState.getSelectionAfter()));
};

var container;
beforeEach(function () {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(function () {
  document.body.removeChild(container);
  container = null;
});
describe("<Editor />", function () {
  it("Render Editor", function () {
    var _state = {
      "blocks": [{
        "key": "ba892",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var initialState = JSON.stringify(_state);
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Editor.default, {
      initialState: null,
      containerRef: null
    }));
    expect(component[0]['attribs'].class).toStrictEqual('em-editor-container');
    var containerDiv = component.find('div');
    var controls = component.find(_Controls.default);
    var baseEditor = component.find(_BaseEditor.default);
    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });
  it("Render Editor with initialState and filtering styles.", function () {
    var _state = {
      "blocks": [{
        "key": "ba892",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var initialState = JSON.stringify(_state);
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Editor.default, {
      initialState: initialState,
      containerRef: null,
      filterStyles: ['blockquote']
    }));
    expect(component[0]['attribs'].class).toStrictEqual('em-editor-container');
    var containerDiv = component.find('div');
    var controls = component.find(_Controls.default);
    var baseEditor = component.find(_BaseEditor.default);
    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });
  it("Render AltEditor.", function () {
    var _state = {
      "blocks": [{
        "key": "ba892",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }],
      "entityMap": {}
    };
    var initialState = JSON.stringify(_state);
    var component = (0, _enzyme.render)( /*#__PURE__*/_react.default.createElement(_Editor.default, {
      initialState: initialState,
      containerRef: null,
      filterStyles: ['blockquote'],
      altEditor: _Editor.default
    }));
    expect(component[0]['attribs'].class).toStrictEqual('em-editor-container');
    var containerDiv = component.find('div');
    var controls = component.find(_Controls.default);
    var baseEditor = component.find(_BaseEditor.default);
    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });
  it("Render Controls with input visible.", function () {
    var props = {
      editorStyles: _EditorStyles.default,
      blockIsActive: jest.fn(),
      inlineIsActive: jest.fn(),
      customBlockIsActive: jest.fn(),
      customBlockToggleFn: jest.fn(),
      onToggleInline: jest.fn(),
      onToggleBlock: jest.fn(),
      confirmInput: jest.fn(),
      onInputChange: jest.fn(),
      showInput: jest.fn(),
      cancelInput: jest.fn(),
      inputVisible: true,
      inputType: "URL",
      inputValue: ""
    };
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Controls.default, props));
    var urlInput = component.find(_URLInput.default); // Expect URL Input to be present.

    expect(urlInput.length).toStrictEqual(1);
  });
  it("<URLInput /> Render", function () {
    var changeFn = jest.fn();
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_URLInput.default, {
      changeFn: changeFn,
      urlValue: "",
      type: "url",
      cancelFn: jest.fn(),
      confirmFn: jest.fn()
    }));
    var input = component.find(_antd.Input);
    var inputProps = input.props();
    expect(inputProps.name).toStrictEqual('URL input');
    expect(inputProps.value).toStrictEqual('');
    expect(inputProps.placeholder).toStrictEqual('Enter url URL');
    expect(inputProps.type).toStrictEqual('text');
  }); //

  it("<StyleButton /> Render", function () {
    var toggleFn = jest.fn();
    var getInputFn = jest.fn();

    var activeFn = function activeFn(s) {
      return true;
    };

    var props = {
      onToggle: toggleFn,
      getInput: getInputFn,
      activeFn: activeFn,
      icon: /*#__PURE__*/_react.default.createElement("i", null),
      style: "",
      label: "button X"
    }; // Test first render and effect

    (0, _testUtils.act)(function () {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_StyleButton.default, props), container);
    });
    var buttonContainer = container.querySelector('.StyleButton'); // Test second render and effect

    (0, _testUtils.act)(function () {
      buttonContainer.dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
    });
    expect(buttonContainer).toBeTruthy();
    expect(toggleFn.mock.calls[0].length).toStrictEqual(1);
  }); // TODO: interaction test for URL Input.
  // Test interaction with editor.

  it("Editor styles > Insert Media", function () {
    var emptyState = _draftJs.EditorState.createEmpty();

    var videoEntity = {
      type: 'Video',
      value: 'https://video.com/video.mp4'
    };
    var stateWithMedia = (0, _EditorStyles.insertMedia)(emptyState, videoEntity.type, videoEntity.value);
    var entities = (0, _testingUtils.getEntities)(stateWithMedia);
    expect(entities.length).toStrictEqual(1);
    expect(entities[0].type).toStrictEqual('Video');
    expect(entities[0].value.src).toStrictEqual(videoEntity.value);
  }); //TODO: find out why this is not working.

  it("Editor styles > Insert Link", function () {
    var contentState = _draftJs.ContentState.createFromText("Text for testing.");

    var initialContentState = _draftJs.EditorState.createWithContent(contentState); //const addedBlockState = addEmptyBlock(initialContentState);


    var blockStateContent = initialContentState.getCurrentContent();
    var anchorKey = blockStateContent.getFirstBlock().getKey();
    var focusKey = blockStateContent.getLastBlock().getKey();
    var focusOffset = blockStateContent.getLastBlock().getText().length;
    var updatedSelection = initialContentState.getSelection().merge({
      anchorKey: anchorKey,
      focusKey: focusKey,
      anchorOffset: 0,
      focusOffset: focusOffset
    });

    var selectedState = _draftJs.EditorState.forceSelection(initialContentState, updatedSelection); //


    var link = {
      type: 'LINK',
      value: 'http://www.link.com'
    };
    var stateWithLink = (0, _EditorStyles.insertLink)(selectedState, link.type, link.value);
    var currentContent = stateWithLink.getCurrentContent();
    var newSelection = stateWithLink.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length
    });

    var newStateWithLink = _draftJs.EditorState.forceSelection(stateWithLink, newSelection);

    expect(_draftJs.RichUtils.currentBlockContainsLink(newStateWithLink)).toStrictEqual(true);
  }); //TODO: find out why this is not working.

  it("Editor styles > Remove Link", function () {
    var contentState = _draftJs.ContentState.createFromText("Text for testing.");

    var initialContentState = _draftJs.EditorState.createWithContent(contentState);

    var blockStateContent = initialContentState.getCurrentContent();
    var anchorKey = blockStateContent.getFirstBlock().getKey();
    var focusKey = blockStateContent.getLastBlock().getKey();
    var focusOffset = blockStateContent.getLastBlock().getText().length; // Remove a link from a collapsed selection. Should be null.

    var notRemoved = (0, _EditorStyles.removeLink)(initialContentState);
    expect(notRemoved).toStrictEqual(null); // Select all text.

    var updatedSelection = initialContentState.getSelection().merge({
      anchorKey: anchorKey,
      focusKey: focusKey,
      anchorOffset: 0,
      focusOffset: focusOffset
    });

    var selectedState = _draftJs.EditorState.forceSelection(initialContentState, updatedSelection); // Insert link


    var link = {
      type: 'LINK',
      value: 'http://www.link.com'
    };
    var stateWithLink = (0, _EditorStyles.insertLink)(selectedState, link.type, link.value); //Select all text, and check that there is a link.

    var currentContent = stateWithLink.getCurrentContent();
    var newSelection = stateWithLink.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length
    });

    var newStateWithLink = _draftJs.EditorState.forceSelection(stateWithLink, newSelection);

    expect(_draftJs.RichUtils.currentBlockContainsLink(newStateWithLink)).toStrictEqual(true); // Remove link.

    var stateWithoutLink = (0, _EditorStyles.removeLink)(newStateWithLink);
    var content = stateWithoutLink.getCurrentContent();
    var selectAll = stateWithoutLink.getSelection().merge({
      anchorKey: content.getFirstBlock().getKey(),
      focusKey: content.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: content.getLastBlock().getText().length
    });

    var newStateWithoutLink = _draftJs.EditorState.forceSelection(stateWithoutLink, selectAll);

    expect(_draftJs.RichUtils.currentBlockContainsLink(newStateWithoutLink)).toStrictEqual(false);
  });
  it("Test editor internal methods.", function () {
    var props = {
      initialState: null,
      containerRef: null
    }; // Test first render and effect

    (0, _testUtils.act)(function () {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Editor.default, props), container);
    });
    var styleButton = container.querySelector('.StyleButton');
    (0, _testUtils.act)(function () {
      styleButton.dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
    });
    var editor = container.querySelector('.em-editor-container'); //expect(controls).toBeTruthy();
    //expect(baseEditor).toBeTruthy();
    //expect(containerDiv).toBeTruthy();
  });
});
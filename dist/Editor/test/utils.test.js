"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _draftJs = require("draft-js");

var _utils = require("../utils");

var _EditorStyles = _interopRequireWildcard(require("../EditorStyles"));

var _testingUtils = require("../../testingUtils.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**/
describe("Editor Utils", function () {
  it("getBlockStyle", function () {
    // Quote block.
    var quoteBlock = {
      getType: function getType() {
        return 'blockquote';
      }
    };
    expect((0, _utils.getBlockStyle)(quoteBlock)).toStrictEqual('Blockquote'); // Code block.

    var codeBlock = {
      getType: function getType() {
        return 'code-block';
      }
    };
    expect((0, _utils.getBlockStyle)(codeBlock)).toStrictEqual('Code'); // Any block. Default to null.

    var emptyBlock = {
      getType: function getType() {
        return '';
      }
    };
    expect((0, _utils.getBlockStyle)(emptyBlock)).toStrictEqual(null);
  });
  it("filter", function () {
    var finalBlackListedStyles = {
      BLOCK_TYPES: [],
      INLINE_STYLES: [],
      CUSTOM_STYLES: [{
        label: 'Latex',
        style: 'Latex',
        requiresInput: false,
        requiresSelection: false,
        icon: []
      }]
    };
    var filteredStyles = (0, _utils.filterWhiteListedStyles)(_EditorStyles.default, ["Latex"]);
    filteredStyles.CUSTOM_STYLES[0].icon = [];
    expect(filteredStyles).toStrictEqual(finalBlackListedStyles);
    var BLOCK_TYPES = _EditorStyles.default.BLOCK_TYPES; // Only allow blockquote style.

    var blockquote = {
      label: 'Quote',
      style: 'blockquote',
      icon: null
    };
    var filtered = (0, _utils.filterStyle)(BLOCK_TYPES, ['blockquote']);
    expect(filtered).toStrictEqual([{
      "icon": {
        "icon": [512, 512, [], "f10d", "M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"],
        "iconName": "quote-left",
        "prefix": "fas"
      },
      "label": "Quote",
      "style": "blockquote"
    }]);
  });
  it("Create and insert immutable entity", function () {
    var editorText = "Test";

    var contentState = _draftJs.ContentState.createFromText(editorText);

    var editorState = _draftJs.EditorState.createWithContent(contentState);

    var currentContent = editorState.getCurrentContent();
    var newSelection = editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length
    });

    var selectedState = _draftJs.EditorState.forceSelection(editorState, newSelection);

    var newEntity = (0, _utils.createNewImmutableEntity)(selectedState, 'SPOILER');
    var newState = (0, _utils.insertEntityToState)(selectedState, newEntity);
    var entities = (0, _testingUtils.getEntities)(newState);
    expect(entities[0].type).toStrictEqual("SPOILER");
    expect(entities[0].value.text).toStrictEqual(editorText);
  });
  it("Find link entities", function () {
    var initialText = "Text for testing.";

    var contentState = _draftJs.ContentState.createFromText(initialText);

    var initialContentState = _draftJs.EditorState.createWithContent(contentState);

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

    var newStateWithLink = _draftJs.EditorState.forceSelection(stateWithLink, newSelection); // Check that there actually are link entities.


    var contentBlock = newStateWithLink.getCurrentContent();
    var foundRanges = [];

    var foundFn = function foundFn(start, end) {
      return foundRanges.push(end - start);
    };

    contentBlock.getBlocksAsArray().forEach(function (block) {
      (0, _utils.findLinkEntities)(block, foundFn, contentBlock);
    });
    expect(foundRanges.length).toStrictEqual(1);
    expect(foundRanges[0]).toStrictEqual(initialText.length);
  });
  it("Find spoiler entities", function () {
    var initialText = "Text for testing.";

    var contentState = _draftJs.ContentState.createFromText(initialText);

    var initialContentState = _draftJs.EditorState.createWithContent(contentState);

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


    var newEntity = (0, _utils.createNewImmutableEntity)(selectedState, 'SPOILER');
    var stateWithSpoiler = (0, _utils.insertEntityToState)(selectedState, newEntity);
    var currentContent = stateWithSpoiler.getCurrentContent();
    var newSelection = stateWithSpoiler.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length
    });

    var newStateWithSpoiler = _draftJs.EditorState.forceSelection(stateWithSpoiler, newSelection); // Check that there actually are link entities.


    var contentBlock = newStateWithSpoiler.getCurrentContent();
    var foundRanges = [];

    var foundFn = function foundFn(start, end) {
      return foundRanges.push(end - start);
    };

    contentBlock.getBlocksAsArray().forEach(function (block) {
      (0, _utils.findSpoilerEntities)(block, foundFn, contentBlock);
    });
    expect(foundRanges.length).toStrictEqual(1);
    expect(foundRanges[0]).toStrictEqual(initialText.length);
  });
});
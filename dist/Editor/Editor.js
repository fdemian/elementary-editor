"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _draftJs = _interopRequireDefault(require("draft-js"));

var _immutable = require("immutable");

var _texUtils = require("./TextElements/Latex/texUtils");

var _TeXBlock = _interopRequireDefault(require("./TextElements/Latex/TeXBlock"));

var _SpoilerWrapper = _interopRequireDefault(require("./TextElements/Spoiler/SpoilerWrapper"));

var _Media = _interopRequireDefault(require("./TextElements/Media/Media"));

var _Link = _interopRequireDefault(require("./TextElements/Link/Link"));

var _EditorStyles = _interopRequireDefault(require("./EditorStyles"));

var _QuoteBlockWrapper = _interopRequireDefault(require("./TextElements/QuoteBlock/QuoteBlockWrapper"));

var _Controls = _interopRequireDefault(require("./Controls"));

var _BaseEditor = _interopRequireDefault(require("./BaseEditor"));

var _utils = require("./utils");

require("katex/dist/katex.css");

require("./css/Draft.css");

require("./css/Editor.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CompositeDecorator = _draftJs.default.CompositeDecorator,
    ContentState = _draftJs.default.ContentState,
    EditorState = _draftJs.default.EditorState,
    RichUtils = _draftJs.default.RichUtils,
    DefaultDraftBlockRenderMap = _draftJs.default.DefaultDraftBlockRenderMap,
    convertToRaw = _draftJs.default.convertToRaw,
    convertFromRaw = _draftJs.default.convertFromRaw,
    AtomicBlockUtils = _draftJs.default.AtomicBlockUtils;
var blockRenderMap = (0, _immutable.Map)({
  SPOILER: {
    element: _SpoilerWrapper.default
  },
  LATEX: {
    element: _TeXBlock.default
  }
});
var extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

var EditorComponent = function EditorComponent(props) {
  var altEditor = props.altEditor,
      initialState = props.initialState,
      containerRef = props.containerRef;
  var decorator = null;
  var initialStateEditor;

  if (!altEditor) {
    decorator = new CompositeDecorator([{
      strategy: function strategy(contentBlock, callback, contentState) {
        return (0, _utils.findLinkEntities)(contentBlock, callback, contentState);
      },
      component: _Link.default
    }, {
      strategy: function strategy(contentBlock, callback, contentState) {
        return (0, _utils.findSpoilerEntities)(contentBlock, callback, contentState);
      },
      component: _SpoilerWrapper.default
    }]);
  }

  var createEmpty = EditorState.createEmpty,
      createWithContent = EditorState.createWithContent;

  if (initialState == null) {
    initialStateEditor = createEmpty(decorator);
  } else {
    var parsedState = JSON.parse(initialState);

    var _contentState = convertFromRaw(parsedState);

    initialStateEditor = createWithContent(_contentState, decorator);
  }

  var editorRef = (0, _react.useRef)(null); // State and refs.

  var _useState = (0, _react.useState)((0, _immutable.Map)()),
      _useState2 = _slicedToArray(_useState, 2),
      texEdits = _useState2[0],
      setTexEdits = _useState2[1];

  var _useState3 = (0, _react.useState)(initialStateEditor),
      _useState4 = _slicedToArray(_useState3, 2),
      editorState = _useState4[0],
      setEditorState = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      inputVisible = _useState6[0],
      setInputVisible = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      inputType = _useState8[0],
      setInputType = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      inputValue = _useState10[0],
      setInputValue = _useState10[1]; // Functions.


  var focus = function focus() {
    return editorRef.current.focus();
  };

  var readOnly = texEdits.count();

  var getCurrentContent = function getCurrentContent() {
    return editorState.getCurrentContent();
  };

  var customBlockIsActive = function customBlockIsActive() {
    return false;
  }; // TODO: revise.


  var _editorStyles = null; // If the user has defined which styles to whitelist, use only those.
  // Otherwise use all of the styles.

  var filterStyles = props.filterStyles === undefined ? null : props.filterStyles;

  if (filterStyles === null) {
    _editorStyles = _EditorStyles.default;
  } else {
    var whiteListed = (0, _utils.filterWhiteListedStyles)(_EditorStyles.default, props.filterStyles);
    _editorStyles = whiteListed;
  }

  var getContent = function getContent() {
    var currentContent = getCurrentContent();
    return convertToRaw(currentContent);
  };

  var getPlainText = function getPlainText() {
    return getCurrentContent().getPlainText();
  };

  var removeTex = function removeTex(blockKey) {
    setTexEdits(texEdits.remove(blockKey));
    setEditorState((0, _texUtils.removeTeXBlock)(editorState, blockKey));
  };

  var insertTex = function insertTex(blockKey, newContentState) {
    var createWithContent = EditorState.createWithContent;
    var texEditState = texEdits.remove(blockKey);
    var editorContent = createWithContent(newContentState);
    setTexEdits(texEditState);
    setEditorState(editorContent);
  };

  var blockIsActive = function blockIsActive(block) {
    var selection = editorState.getSelection();
    var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    return block === blockType;
  };

  var inlineIsActive = function inlineIsActive(style) {
    var currentStyle = editorState.getCurrentInlineStyle();
    if (currentStyle === undefined) return false;
    return currentStyle.has(style);
  };

  var onChange = function onChange(state) {
    setEditorState(state);
    if (props.onChange) props.onChange(getContent());
  };

  var handleKeyCommand = function handleKeyCommand(command) {
    var handleKeyCommand = RichUtils.handleKeyCommand;
    var newState = handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return true;
    }

    return false;
  };

  var customRenderFn = function customRenderFn(contentBlock) {
    var type = contentBlock.getType();
    var text = contentBlock.getText();

    if (text === "media" || text === "Image" || text === "Video") {
      return {
        component: _Media.default,
        editable: false
      };
    }

    if (text === "QuoteBlock") {
      return {
        component: _QuoteBlockWrapper.default,
        editable: false
      };
    }

    if (type === "atomic") {
      return {
        component: _TeXBlock.default,
        editable: false,
        props: {
          onStartEdit: function onStartEdit(blockKey) {
            var texEditState = texEdits.set(blockKey, true);
            setTexEdits(texEditState);
          },
          onFinishEdit: function onFinishEdit(blockKey, newContentState) {
            return insertTex(blockKey, newContentState);
          },
          onRemove: function onRemove(blockKey) {
            return removeTex(blockKey);
          }
        }
      };
    }

    return null;
  };

  var selectionIsCollapsed = function selectionIsCollapsed() {
    return editorState.getSelection().isCollapsed();
  };

  var findStyleObjectByName = function findStyleObjectByName(name) {
    var customStyles = _EditorStyles.default.CUSTOM_STYLES;
    var matches = customStyles.filter(function (style) {
      return style.label === name || style.style === name;
    });
    return matches[0];
  };

  var insertEntity = function insertEntity(entityName) {
    var newEntity = (0, _utils.createNewImmutableEntity)(editorState, entityName);
    var newState = (0, _utils.insertEntityToState)(editorState, newEntity);
    setEditorState(newState, function () {
      setTimeout(function () {
        return focus();
      }, 0);
    });
  };

  var customBlockToggleFn = function customBlockToggleFn(blockName, getInput) {
    var selectionCollapsed = selectionIsCollapsed();
    var styleObject = findStyleObjectByName(blockName);
    var requiresSelection = styleObject.requiresSelection;
    if (styleObject.toggleFn === null) return;
    if (requiresSelection && selectionCollapsed) return;

    if (styleObject.requiresInput) {
      setInputVisible(true);
      setInputType(styleObject.label);
      return;
    }

    toggleCustomStyle(styleObject);
  };

  var confirmInput = function confirmInput(e) {
    e.preventDefault();
    var styleObject = findStyleObjectByName(inputType);
    if (styleObject.toggleFn == null) return;
    var newState = styleObject.toggleFn(editorState, inputType, inputValue); // Reset input fields.

    setInputVisible(false);
    setInputValue("");
    setInputType(""); // Set the new editor state.

    if (newState !== null) setEditorState(newState);
  };

  var onInputChange = function onInputChange(e) {
    setInputValue(e.target.value);
  };

  var cancelInput = function cancelInput() {
    setInputVisible(false);
    setInputValue("");
    setInputType("");
  };

  var showInput = function showInput() {
    return setInputVisible(true);
  };

  var insertCustomBlock = function insertCustomBlock(block) {
    var type = block.type,
        mutability = block.mutability,
        content = block.content;
    var insertAtomicBlock = AtomicBlockUtils.insertAtomicBlock;
    var contentStateWithEntity = contentState.createEntity(type, mutability, content);
    var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    var newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    return insertAtomicBlock(newEditorState, entityKey, " ");
  };

  var toggleCustomStyle = function toggleCustomStyle(styleObject) {
    var newState = null;

    switch (styleObject.style.toUpperCase()) {
      case "SPOILER":
        insertEntity("SPOILER");
        break;

      case "LATEX":
        var texBlock = (0, _texUtils.getTexBlock)();
        newState = insertCustomBlock(texBlock);
        break;

      default:
        break;
    }

    if (newState !== null) setEditorState(newState);
  };

  var toggleBlockType = function toggleBlockType(blockType) {
    var toggleBlockType = RichUtils.toggleBlockType;
    onChange(toggleBlockType(editorState, blockType));
  };

  var toggleInlineStyle = function toggleInlineStyle(inlineStyle) {
    var toggleInlineStyle = RichUtils.toggleInlineStyle;
    onChange(toggleInlineStyle(editorState, inlineStyle));
  }; // TODO: check this out.
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.


  var className = "RichEditor-editor Editor";
  var contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder Editor";
    }
  }

  var clear = function clear() {
    var emptyState = ContentState.createFromText("");
    var clearedState = EditorState.push(editorState, emptyState);
    setTexEdits((0, _immutable.Map)());
    setEditorState(clearedState);
  }; // Exposed methods.


  (0, _react.useImperativeHandle)(containerRef, function () {
    return {
      clear: clear,
      getContent: getContent,
      getPlainText: getPlainText
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "100%"
    },
    ref: containerRef,
    className: "em-editor-container"
  }, /*#__PURE__*/_react.default.createElement(_Controls.default, {
    editorState: editorState,
    editorStyles: _editorStyles,
    onToggleBlock: toggleBlockType,
    onToggleInline: toggleInlineStyle,
    selectionCollapsed: selectionIsCollapsed,
    blockIsActive: blockIsActive,
    inlineIsActive: inlineIsActive,
    customBlockIsActive: customBlockIsActive,
    customBlockToggleFn: customBlockToggleFn,
    editor: containerRef,
    inputType: inputType,
    inputVisible: inputVisible,
    inputValue: inputValue,
    confirmInput: confirmInput,
    onInputChange: onInputChange,
    cancelInput: cancelInput,
    showInput: showInput
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    onClick: focus,
    role: "textbox",
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement(_BaseEditor.default, {
    blockStyleFn: _utils.getBlockStyle,
    blockRendererFn: customRenderFn,
    blockRenderMap: extendedBlockRenderMap,
    editorState: editorState,
    handleKeyCommand: handleKeyCommand,
    onChange: onChange,
    spellCheck: false,
    readOnly: readOnly,
    altEditor: altEditor,
    reference: editorRef
  })));
};

var _default = EditorComponent;
exports.default = _default;
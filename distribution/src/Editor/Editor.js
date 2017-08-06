'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJs2 = _interopRequireDefault(_draftJs);

var _immutable = require('immutable');

var _Controls = require('./Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _TeXBlock = require('./TextElements/Latex/TeXBlock');

var _TeXBlock2 = _interopRequireDefault(_TeXBlock);

var _insertTeXBlock = require('./TextElements/Latex/insertTeXBlock');

var _removeTeXBlock = require('./TextElements/Latex/removeTeXBlock');

var _SpoilerWrapper = require('./TextElements/Spoiler/SpoilerWrapper');

var _SpoilerWrapper2 = _interopRequireDefault(_SpoilerWrapper);

var _Media = require('./TextElements/Media/Media');

var _Media2 = _interopRequireDefault(_Media);

var _Link = require('./TextElements/Link/Link');

var _Link2 = _interopRequireDefault(_Link);

var _QuoteBlockWrapper = require('./TextElements/QuoteBlock/QuoteBlockWrapper');

var _QuoteBlockWrapper2 = _interopRequireDefault(_QuoteBlockWrapper);

var _EditorStyles = require('./EditorStyles');

var _EditorStyles2 = _interopRequireDefault(_EditorStyles);

require('./css/Draft.css');

require('./css/Editor.css');

require('katex/dist/katex.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompositeDecorator = _draftJs2.default.CompositeDecorator,
    ContentState = _draftJs2.default.ContentState,
    Editor = _draftJs2.default.Editor,
    EditorState = _draftJs2.default.EditorState,
    RichUtils = _draftJs2.default.RichUtils,
    AtomicBlockUtils = _draftJs2.default.AtomicBlockUtils,
    DefaultDraftBlockRenderMap = _draftJs2.default.DefaultDraftBlockRenderMap,
    convertToRaw = _draftJs2.default.convertToRaw,
    convertFromRaw = _draftJs2.default.convertFromRaw;


var blockRenderMap = (0, _immutable.Map)({ 'SPOILER': { element: _SpoilerWrapper2.default }, 'Latex': { element: _TeXBlock2.default } });
var extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {

  var blockStyle = null;

  switch (block.getType()) {
    case 'blockquote':
      blockStyle = 'Blockquote';
      break;
    case 'code-block':
      blockStyle = "Code";
      break;
    default:
      blockStyle = null;
  }

  return blockStyle;
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function findSpoilerEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'SPOILER';
  }, callback);
}

var EditorComponent = function (_React$Component) {
  _inherits(EditorComponent, _React$Component);

  function EditorComponent(props) {
    _classCallCheck(this, EditorComponent);

    var _this = _possibleConstructorReturn(this, (EditorComponent.__proto__ || Object.getPrototypeOf(EditorComponent)).call(this, props));

    _this._removeTeX = function (blockKey) {
      var _this$state = _this.state,
          editorState = _this$state.editorState,
          liveTeXEdits = _this$state.liveTeXEdits;

      _this.setState({
        liveTeXEdits: liveTeXEdits.remove(blockKey),
        editorState: (0, _removeTeXBlock.removeTeXBlock)(editorState, blockKey)
      });
    };

    _this._insertTex = function () {
      _this.setState({
        liveTeXEdits: (0, _immutable.Map)(),
        editorState: (0, _insertTeXBlock.insertTeXBlock)(_this.state)
      });
    };

    var decorator = new CompositeDecorator([{
      strategy: function strategy(contentBlock, callback, contentState) {
        return findLinkEntities(contentBlock, callback, contentState);
      },
      component: _Link2.default
    }, {
      strategy: function strategy(contentBlock, callback, contentState) {
        return findSpoilerEntities(contentBlock, callback, contentState);
      },
      component: _SpoilerWrapper2.default
    }]);

    var initialState = _this.props.initialState;


    var _initalEditorState = void 0;

    if (initialState == null) {
      _initalEditorState = EditorState.createEmpty(decorator);
    } else {
      var _contentState = convertFromRaw(JSON.parse(initialState));
      _initalEditorState = EditorState.createWithContent(_contentState, decorator);
    }

    _this.filterStyles = _this.props.filterStyles === undefined ? null : _this.props.filterStyles;
    _this.state = { liveTeXEdits: (0, _immutable.Map)(), editorState: _initalEditorState };
    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (state) {
      return _this._handleChange(state);
    };
    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.spoilerBlockRender = function (style) {
      return _this._spoilerBlockRender(style);
    };
    _this.selectionIsCollapsed = function () {
      return _this._selectionIsCollapsed();
    };
    _this.getRawContentJSON = function (state) {
      return _this._getRawContentJSON(state);
    };
    _this.blockIsActive = function (block) {
      return _this._blockIsActive(block);
    };
    _this.inlineIsActive = function (style) {
      return _this._inlineIsActive(style);
    };
    _this.customBlockIsActive = function (block) {
      return _this._customBlockIsActive(block);
    };
    _this.clear = function () {
      return _this._clear();
    };
    _this.insertQuote = function (comment) {
      return _this._insertQuote(comment);
    };
    _this.insertQuoteBlock = function (type, content, author) {
      return _this._insertQuoteBlock(type, content, author);
    };
    _this.insertTex = function () {
      return _this._insertTex();
    };
    _this.removeTex = function (blockKey) {
      return _this._removeTex(blockKey);
    };

    _this.editorStyles = null;

    // If the user has defined which styles to whitelist, use only those.
    // Otherwise use all of the styles.
    if (_this.filterStyles === null) _this.editorStyles = _EditorStyles2.default;else _this.editorStyles = _this.filterWhiteListedStyles(_EditorStyles2.default, _this.filterStyles);

    return _this;
  }

  _createClass(EditorComponent, [{
    key: 'filterWhiteListedStyles',
    value: function filterWhiteListedStyles(editorStyles, allowedStyles) {

      console.log(editorStyles);
      return editorStyles;
    }
  }, {
    key: '_clear',
    value: function _clear() {
      var editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
      this.setState({ editorState: editorState });
    }
  }, {
    key: '_insertQuote',
    value: function _insertQuote(comment) {
      this.insertQuoteBlock("QuoteBlock", comment);
    }
  }, {
    key: '_insertQuoteBlock',
    value: function _insertQuoteBlock(type, comment) {
      var _this2 = this;

      var editorState = this.state.editorState;

      var contentState = editorState.getCurrentContent();
      var contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', { props: comment });
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
      }, function () {
        setTimeout(function () {
          return _this2.focus();
        }, 0);
      });
    }
  }, {
    key: '_blockIsActive',
    value: function _blockIsActive(block) {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      return block === blockType;
    }
  }, {
    key: '_inlineIsActive',
    value: function _inlineIsActive(style) {
      var currentStyle = this.state.editorState.getCurrentInlineStyle();

      if (currentStyle === undefined) return false;

      return currentStyle.has(style);
    }
  }, {
    key: '_customBlockIsActive',
    value: function _customBlockIsActive(block) {
      return false;
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(state) {
      this.setState({ editorState: state });
    }

    // Get the JSON with the rawContent JS used to generate the editor's content.

  }, {
    key: '_getRawContentJSON',
    value: function _getRawContentJSON(editorState) {
      var contentState = editorState.getCurrentContent();
      var rawContent = convertToRaw(contentState);
      var rawContentJson = JSON.stringify(rawContent);

      return rawContentJson;
    }
  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var editorState = this.state.editorState;

      var newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        this.onChange(newState);
        return true;
      }

      return false;
    }
  }, {
    key: 'customRenderFn',
    value: function customRenderFn(contentBlock) {
      var _this3 = this;

      var type = contentBlock.getType();
      var text = contentBlock.getText();

      if (text === 'media') {
        return {
          component: _Media2.default,
          editable: false
        };
      }

      if (text === 'QuoteBlock') {
        return {
          component: _QuoteBlockWrapper2.default,
          editable: false
        };
      }

      if (type === 'atomic') {
        return {
          component: _TeXBlock2.default,
          editable: false,
          props: {
            onStartEdit: function onStartEdit(blockKey) {
              var liveTeXEdits = _this3.state.liveTeXEdits;

              _this3.setState({ liveTeXEdits: liveTeXEdits.set(blockKey, true) });
            },
            onFinishEdit: function onFinishEdit(blockKey, newContentState) {
              var liveTeXEdits = _this3.state.liveTeXEdits;

              _this3.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey),
                editorState: EditorState.createWithContent(newContentState)
              });
            },
            onRemove: function onRemove(blockKey) {
              return _this3._removeTeX(blockKey);
            }
          }
        };
      }

      return null;
    }
  }, {
    key: '_selectionIsCollapsed',
    value: function _selectionIsCollapsed() {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      return selection.isCollapsed();
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.

      var className = 'RichEditor-editor Editor';
      var contentState = editorState.getCurrentContent();

      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder Editor';
        }
      }

      return _react2.default.createElement(
        'div',
        { style: { 'height': '100%' } },
        _react2.default.createElement(_Controls2.default, {
          editorState: editorState,
          editorStyles: this.editorStyles,
          onToggleBlock: this.toggleBlockType,
          onToggleInline: this.toggleInlineStyle,
          selectionCollapsed: this.selectionIsCollapsed,
          blockIsActive: this.blockIsActive,
          inlineIsActive: this.inlineIsActive,
          customBlockIsActive: this.customBlockIsActive,
          editor: this
        }),
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus },
          _react2.default.createElement(Editor, {
            blockStyleFn: getBlockStyle,
            blockRendererFn: this.customRenderFn.bind(this),
            blockRenderMap: extendedBlockRenderMap,
            editorState: editorState,
            handleKeyCommand: this.handleKeyCommand,
            onChange: this.onChange,
            ref: 'editor',
            spellCheck: false,
            readOnly: this.state.liveTeXEdits.count()
          })
        )
      );
    }
  }]);

  return EditorComponent;
}(_react2.default.Component);

exports.default = EditorComponent;
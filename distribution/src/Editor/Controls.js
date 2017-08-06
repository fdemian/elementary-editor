'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _URLInput = require('./URLInput');

var _URLInput2 = _interopRequireDefault(_URLInput);

require('./css/Controls.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorControls = function (_Component) {
    _inherits(EditorControls, _Component);

    function EditorControls(props) {
        _classCallCheck(this, EditorControls);

        var _this = _possibleConstructorReturn(this, (EditorControls.__proto__ || Object.getPrototypeOf(EditorControls)).call(this, props));

        var editorState = props.editorState;

        var _currentStyle = editorState.getCurrentInlineStyle();
        var selection = editorState.getSelection();
        var _blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

        _this.state = {
            currentStyle: _currentStyle,
            blockType: _blockType,
            showURLInput: false,
            urlValue: '',
            urlType: '',
            showColorPicker: false,
            colorValue: ''
        };

        _this.sendPost = _this.props.sendPost;
        _this.editor = _this.props.editor;
        _this.editorStyles = _this.props.editorStyles;
        _this.confirmUrl = _this._confirmUrl.bind(_this);
        _this.cancelUrlFn = _this._cancelUrl.bind(_this);
        _this.selectionIsCollapsed = _this.props.selectionCollapsed;
        _this.onURLChange = function (e) {
            return _this._onUrlChange(e);
        };
        _this.blockIsActive = _this.props.blockIsActive;
        _this.inlineIsActive = _this.props.inlineIsActive;
        _this.customBlockIsActive = _this.props.customBlockIsActive;
        _this.customBlockToggleFn = _this._customBlockToggleFn.bind(_this);
        _this.getInput = _this._getInput.bind(_this);
        _this.findStyleObjectByName = _this._findStyleObjectByName.bind(_this);
        return _this;
    }

    _createClass(EditorControls, [{
        key: '_onUrlChange',
        value: function _onUrlChange(event, newState) {
            this.setState({ urlValue: event.target.value });
        }
    }, {
        key: '_findStyleObjectByName',
        value: function _findStyleObjectByName(name) {
            var customStyles = this.editorStyles.CUSTOM_STYLES;
            var matches = customStyles.filter(function (style) {
                return style.label === name || style.style === name;
            });
            return matches[0];
        }
    }, {
        key: '_customBlockToggleFn',
        value: function _customBlockToggleFn(blockName) {

            var styleObject = this.findStyleObjectByName(blockName);

            if (styleObject.toggleFn === null) return;

            if (styleObject.requiresSelection && this.editor.selectionIsCollapsed()) return;

            if (styleObject.requiresInput) {
                this.getInput(styleObject.label);
                return;
            }

            styleObject.toggleFn(this.editor);
        }
    }, {
        key: '_cancelUrl',
        value: function _cancelUrl() {
            this.setState({ showURLInput: false, urlValue: '', urlType: '' });
        }
    }, {
        key: '_confirmUrl',
        value: function _confirmUrl(e) {
            e.preventDefault();

            var styleObject = this.findStyleObjectByName(this.state.urlType);

            if (styleObject.toggleFn == null) return;

            styleObject.toggleFn(this.editor, this.state.urlType, this.state.urlValue);
            this.setState({ showURLInput: false, urlValue: '', urlType: '' });
        }
    }, {
        key: '_getInput',
        value: function _getInput(type) {
            this.setState({ showURLInput: true, urlType: type });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.state.showURLInput) return _react2.default.createElement(
                'div',
                { className: 'EditorControls' },
                _react2.default.createElement(
                    'div',
                    { className: 'RichEditor-controls' },
                    _react2.default.createElement(_URLInput2.default, {
                        changeFn: this.onURLChange,
                        urlValue: this.state.urlValue,
                        cancelFn: this.cancelUrlFn,
                        confirmFn: this.confirmUrl,
                        type: this.state.urlType
                    })
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'EditorControls' },
                _react2.default.createElement(
                    'div',
                    { className: 'RichEditor-controls' },
                    this.editorStyles.INLINE_STYLES.map(function (type) {
                        return _react2.default.createElement(_StyleButton2.default, {
                            key: type.label,
                            activeFn: _this2.inlineIsActive.bind(type.style),
                            label: type.label,
                            onToggle: _this2.props.onToggleInline,
                            style: type.style,
                            icon: type.icon
                        });
                    }),
                    this.editorStyles.BLOCK_TYPES.map(function (type) {
                        return _react2.default.createElement(_StyleButton2.default, {
                            key: type.label,
                            activeFn: _this2.blockIsActive.bind(type.style),
                            label: type.label,
                            onToggle: _this2.props.onToggleBlock,
                            style: type.style,
                            icon: type.icon
                        });
                    }),
                    this.editorStyles.CUSTOM_STYLES.map(function (type) {
                        return _react2.default.createElement(_StyleButton2.default, {
                            key: type.label,
                            activeFn: _this2.customBlockIsActive,
                            label: type.label,
                            onToggle: _this2.customBlockToggleFn,
                            style: type.style,
                            icon: type.icon
                        });
                    })
                )
            );
        }
    }]);

    return EditorControls;
}(_react.Component);

;

exports.default = EditorControls;
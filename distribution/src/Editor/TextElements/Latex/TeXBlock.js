'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css2 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFa = require('react-fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file provided by Facebook is for non-commercial testing and evaluation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * purposes only. Facebook reserves all rights not expressly granted.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TextArea = _input2.default.TextArea;


var EditorButtons = function EditorButtons(_ref) {
  var invalid = _ref.invalid,
      removeFn = _ref.removeFn,
      saveFn = _ref.saveFn;


  if (invalid) return _react2.default.createElement(
    _button2.default.Group,
    { size: 'large', style: { marginLeft: '40%' } },
    _react2.default.createElement(
      _button2.default,
      { type: 'danger', onClick: removeFn },
      _react2.default.createElement(_reactFa.Icon, { name: 'close', size: 'lg' }),
      '\xA0 Remove'
    ),
    _react2.default.createElement(
      _button2.default,
      { disabled: true },
      'Invalid TeX'
    )
  );else return _react2.default.createElement(
    _button2.default.Group,
    { size: 'large', style: { marginLeft: '40%' } },
    _react2.default.createElement(
      _button2.default,
      { type: 'danger', onClick: removeFn },
      _react2.default.createElement(_reactFa.Icon, { name: 'close', size: 'lg' }),
      '\xA0 Remove'
    ),
    _react2.default.createElement(
      _button2.default,
      { type: 'primary', onClick: saveFn },
      'Done \xA0',
      _react2.default.createElement(_reactFa.Icon, { name: 'check', size: 'lg' })
    )
  );
};

var KatexOutput = function (_React$Component) {
  _inherits(KatexOutput, _React$Component);

  function KatexOutput(props) {
    _classCallCheck(this, KatexOutput);

    var _this = _possibleConstructorReturn(this, (KatexOutput.__proto__ || Object.getPrototypeOf(KatexOutput)).call(this, props));

    _this._timer = null;
    return _this;
  }

  _createClass(KatexOutput, [{
    key: '_update',
    value: function _update() {
      var _this2 = this;

      if (this._timer) {
        clearTimeout(this._timer);
      }

      this._timer = setTimeout(function () {
        console.log(_this2.refs.container);
        _katex2.default.render(_this2.props.content, _this2.refs.container, { displayMode: true });
      }, 0);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._update();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.content !== this.props.content) {
        this._update();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { ref: 'container', onClick: this.props.onClick });
    }
  }]);

  return KatexOutput;
}(_react2.default.Component);

var TeXBlock = function (_React$Component2) {
  _inherits(TeXBlock, _React$Component2);

  function TeXBlock(props) {
    _classCallCheck(this, TeXBlock);

    var _this3 = _possibleConstructorReturn(this, (TeXBlock.__proto__ || Object.getPrototypeOf(TeXBlock)).call(this, props));

    _this3.state = { editMode: false };

    _this3._onClick = function () {
      if (_this3.state.editMode) {
        return;
      }

      _this3.setState({
        editMode: true,
        texValue: _this3._getValue()
      }, function () {
        _this3._startEdit();
      });
    };

    _this3._onValueChange = function (evt) {
      var value = evt.target.value;
      var invalid = false;
      try {
        _katex2.default.__parse(value);
      } catch (e) {
        invalid = true;
      } finally {
        _this3.setState({
          invalidTeX: invalid,
          texValue: value
        });
      }
    };

    _this3._save = function () {
      var entityKey = _this3.props.block.getEntityAt(0);
      var newContentState = _this3.props.contentState.mergeEntityData(entityKey, { content: _this3.state.texValue });
      _this3.setState({
        invalidTeX: false,
        editMode: false,
        texValue: null
      }, _this3._finishEdit.bind(_this3, newContentState));
    };

    _this3._remove = function () {
      _this3.props.blockProps.onRemove(_this3.props.block.getKey());
    };
    _this3._startEdit = function () {
      _this3.props.blockProps.onStartEdit(_this3.props.block.getKey());
    };
    _this3._finishEdit = function (newContentState) {
      _this3.props.blockProps.onFinishEdit(_this3.props.block.getKey(), newContentState);
    };
    return _this3;
  }

  _createClass(TeXBlock, [{
    key: '_getValue',
    value: function _getValue() {
      return this.props.contentState.getEntity(this.props.block.getEntityAt(0)).getData()['content'];
    }
  }, {
    key: 'render',
    value: function render() {

      var texContent = null;

      if (this.state.editMode) texContent = this.state.invalidTeX ? '' : this.state.texValue;else texContent = this._getValue();

      var className = 'TeXEditor-tex';
      if (this.state.editMode) {
        className += ' TeXEditor-activeTeX';
      }

      var editPanel = null;
      if (this.state.editMode) {

        editPanel = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(TextArea, {
            rows: 2,
            style: { width: '20%', marginLeft: '40%' },
            onChange: this._onValueChange,
            value: this.state.texValue
          }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(EditorButtons, {
              invalid: this.state.invalidTeX,
              removeFn: this._remove,
              saveFn: this._save
            })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(KatexOutput, { content: texContent, onClick: this._onClick }),
        editPanel
      );
    }
  }]);

  return TeXBlock;
}(_react2.default.Component);

exports.default = TeXBlock;
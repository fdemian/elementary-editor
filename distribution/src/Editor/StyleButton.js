'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/tooltip/style/css');

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFa = require('react-fa');

require('./css/StyleButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleButton = function (_Component) {
  _inherits(StyleButton, _Component);

  function StyleButton(props) {
    _classCallCheck(this, StyleButton);

    var _this = _possibleConstructorReturn(this, (StyleButton.__proto__ || Object.getPrototypeOf(StyleButton)).call(this, props));

    _this.onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };

    _this.activeFn = _this.props.activeFn;
    return _this;
  }

  _createClass(StyleButton, [{
    key: 'render',
    value: function render() {

      var isActive = this.activeFn(this.props.style);
      var iconColor = isActive ? 'black' : 'gainsboro';
      var iconType = this.props.icon;

      return _react2.default.createElement(
        _tooltip2.default,
        { placement: 'bottom', title: this.props.label },
        _react2.default.createElement(
          'button',
          { className: 'StyleButton', onClick: this.onToggle },
          _react2.default.createElement(_reactFa.Icon, { name: iconType, size: 'lg', style: { 'color': iconColor, 'marginTop': '6px' } })
        )
      );
    }
  }]);

  return StyleButton;
}(_react.Component);

exports.default = StyleButton;
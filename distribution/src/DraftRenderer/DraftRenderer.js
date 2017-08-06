'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redraft = require('redraft');

var _redraft2 = _interopRequireDefault(_redraft);

var _Renderers = require('./Renderers');

var _Renderers2 = _interopRequireDefault(_Renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderWarning = function RenderWarning() {
    return _react2.default.createElement(
        'div',
        null,
        'Nothing to render.'
    );
};

var Renderer = function Renderer(_ref) {
    var raw = _ref.raw;


    if (!raw) return _react2.default.createElement(RenderWarning, null);

    var rendered = (0, _redraft2.default)(raw, _Renderers2.default);

    if (!rendered) {
        return _react2.default.createElement(RenderWarning, null);
    }

    return _react2.default.createElement(
        'div',
        null,
        rendered
    );
};

exports.default = Renderer;
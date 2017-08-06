'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RenderLink = require('./RenderLink');

var _RenderLink2 = _interopRequireDefault(_RenderLink);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(props) {
   var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData(),
       url = _Entity$get$getData.url;

   return _react2.default.createElement(_RenderLink2.default, { url: url, text: props.children });
};

exports.default = Link;
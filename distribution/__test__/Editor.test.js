'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Editor = require('../Editor/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _EditorStyles = require('../Editor/EditorStyles');

var _EditorStyles2 = _interopRequireDefault(_EditorStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
		var div = document.createElement('div');
		var editor = _react2.default.createElement(_Editor2.default, {
				onEditorChange: function onEditorChange(rawState) {},
				setClearEditorFn: function setClearEditorFn(clearFn) {},
				setInsertFn: function setInsertFn(insertQuoteFn) {},
				initialState: null,
				editorStyles: _EditorStyles2.default });

		_reactDom2.default.render(editor, div);
});
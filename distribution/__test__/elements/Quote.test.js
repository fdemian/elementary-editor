'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _QuoteBlock = require('../../Editor/TextElements/QuoteBlock/QuoteBlock');

var _QuoteBlock2 = _interopRequireDefault(_QuoteBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = "{\"entityMap\":{},\"blocks\":[{\"key\":\"2in19\",\"text\":\" REACT \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":1,\"length\":1,\"style\":\"BOLD\"},{\"offset\":4,\"length\":1,\"style\":\"BOLD\"},{\"offset\":7,\"length\":1,\"style\":\"BOLD\"},{\"offset\":10,\"length\":1,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fqepc\",\"text\":\" Rastartl.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}";

it('renders empty quote without crashing', function () {
  var div = document.createElement('div');
  var comment = { content: null };
  _reactDom2.default.render(_react2.default.createElement(_QuoteBlock2.default, { comment: comment }), div);
});

it('renders with content without crashing', function () {
  var div = document.createElement('div');
  var comment = { content: content };
  _reactDom2.default.render(_react2.default.createElement(_QuoteBlock2.default, { comment: comment }), div);
});
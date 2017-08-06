'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Spoiler = require('../Editor/TextElements/Spoiler/Spoiler');

var _Spoiler2 = _interopRequireDefault(_Spoiler);

var _EmbededVideo = require('../Editor/TextElements/Media/EmbededVideo');

var _EmbededVideo2 = _interopRequireDefault(_EmbededVideo);

var _QuoteBlock2 = require('../Editor/TextElements/QuoteBlock/QuoteBlock');

var _QuoteBlock3 = _interopRequireDefault(_QuoteBlock2);

var _RenderLink = require('../Editor/TextElements/Link/RenderLink');

var _RenderLink2 = _interopRequireDefault(_RenderLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Style callbacks */
var styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20
  },
  listItem: {
    float: 'none'
  }
};

// Adds a <br /> after a block.
var addBreaklines = function addBreaklines(children) {
  return children.map(function (child) {
    return [child, _react2.default.createElement('br', null)];
  });
};

var renderers = {

  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    BOLD: function BOLD(children) {
      return _react2.default.createElement(
        'strong',
        null,
        children
      );
    },
    ITALIC: function ITALIC(children) {
      return _react2.default.createElement(
        'em',
        null,
        children
      );
    },
    UNDERLINE: function UNDERLINE(children) {
      return _react2.default.createElement(
        'u',
        null,
        children
      );
    },
    CODE: function CODE(children) {
      return _react2.default.createElement(
        'span',
        { style: styles.code },
        children
      );
    }
  },

  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    unstyled: function unstyled(children) {
      return children.map(function (child) {
        return _react2.default.createElement(
          'p',
          null,
          child
        );
      });
    },
    blockquote: function blockquote(children) {
      return _react2.default.createElement(
        'blockquote',
        { key: 1 },
        addBreaklines(children)
      );
    },
    'header-one': function headerOne(children) {
      return children.map(function (child) {
        return _react2.default.createElement(
          'h1',
          null,
          child
        );
      });
    },
    'header-two': function headerTwo(children) {
      return children.map(function (child) {
        return _react2.default.createElement(
          'h2',
          null,
          child
        );
      });
    },
    'code-block': function codeBlock(children) {
      return _react2.default.createElement(
        'pre',
        { style: styles.codeBlock },
        addBreaklines(children)
      );
    },
    'unordered-list-item': function unorderedListItem(children, depth) {
      return _react2.default.createElement(
        'ul',
        null,
        children.map(function (child) {
          return _react2.default.createElement(
            'li',
            { style: styles.listItem },
            child
          );
        })
      );
    },
    'ordered-list-item': function orderedListItem(children, depth) {
      return _react2.default.createElement(
        'ol',
        null,
        children.map(function (child) {
          return _react2.default.createElement(
            'li',
            { style: styles.listItem },
            child
          );
        })
      );
    }
  },

  /* Entities receive children and the entity data */
  entities: {
    Image: function Image(children, data) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: data.src, alt: '' })
      );
    },
    LINK: function LINK(children, data) {
      return _react2.default.createElement(_RenderLink2.default, { src: data.url, text: children });
    },
    SPOILER: function SPOILER(children, data) {
      return _react2.default.createElement(_Spoiler2.default, { text: children[0] });
    },
    Video: function Video(children, data) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_EmbededVideo2.default, { src: data.src })
      );
    },
    QuoteBlock: function QuoteBlock(children, data) {
      return _react2.default.createElement(_QuoteBlock3.default, { comment: data.props });
    }
  }

};

exports.default = renderers;
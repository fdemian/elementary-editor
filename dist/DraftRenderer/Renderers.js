"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Spoiler = _interopRequireDefault(require("../Editor/TextElements/Spoiler/Spoiler"));

var _LatexBlock = _interopRequireDefault(require("../Editor/TextElements/Latex/LatexBlock"));

var _Media = _interopRequireDefault(require("../Editor/TextElements/Media/Media"));

var _RenderLink = _interopRequireDefault(require("../Editor/TextElements/Link/RenderLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import QuoteBlock from '../Editor/TextElements/QuoteBlock/QuoteBlock'

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
}; // Adds a <br /> after a block.

var addBreaklines = function addBreaklines(children) {
  return children.map(function (child) {
    return [child, /*#__PURE__*/_react.default.createElement("br", null)];
  });
};

var renderers = {
  /* Inline Styles */
  inline: {
    BOLD: function BOLD(children) {
      return /*#__PURE__*/_react.default.createElement("strong", null, children);
    },
    ITALIC: function ITALIC(children) {
      return /*#__PURE__*/_react.default.createElement("em", null, children);
    },
    UNDERLINE: function UNDERLINE(children) {
      return /*#__PURE__*/_react.default.createElement("u", null, children);
    }
  },

  /* Block Styles */
  blocks: {
    unstyled: function unstyled(children) {
      return children.map(function (child) {
        return /*#__PURE__*/_react.default.createElement("p", null, child);
      });
    },
    blockquote: function blockquote(children) {
      return /*#__PURE__*/_react.default.createElement("blockquote", {
        key: 1
      }, addBreaklines(children));
    },
    'header-two': function headerTwo(children) {
      return children.map(function (child) {
        return /*#__PURE__*/_react.default.createElement("h2", null, child);
      });
    },
    'code-block': function codeBlock(children) {
      return /*#__PURE__*/_react.default.createElement("pre", {
        style: styles.codeBlock
      }, addBreaklines(children));
    },
    'unordered-list-item': function unorderedListItem(children) {
      return /*#__PURE__*/_react.default.createElement("ul", null, children.map(function (child) {
        return /*#__PURE__*/_react.default.createElement("li", {
          style: styles.listItem
        }, child);
      }));
    },
    'ordered-list-item': function orderedListItem(children) {
      return /*#__PURE__*/_react.default.createElement("ol", null, children.map(function (child) {
        return /*#__PURE__*/_react.default.createElement("li", {
          style: styles.listItem
        }, child);
      }));
    }
  },

  /* Entities */
  entities: {
    Image: function Image(children, data) {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
        src: data.src,
        alt: ""
      }));
    },
    LINK: function LINK(children, data) {
      return /*#__PURE__*/_react.default.createElement(_RenderLink.default, {
        src: data.url,
        text: children
      });
    },
    LATEX: function LATEX(children, data) {
      return /*#__PURE__*/_react.default.createElement(_LatexBlock.default, {
        content: data.content
      });
    },
    SPOILER: function SPOILER(children) {
      return /*#__PURE__*/_react.default.createElement(_Spoiler.default, {
        text: children[0]
      });
    },
    Video: function Video(children, data) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "video-element"
      }, /*#__PURE__*/_react.default.createElement(_Media.default, {
        src: data.src
      }));
    }
    /*QuoteBlock: (children, data) => <QuoteBlock comment={data.props} />*/

  }
};
var _default = renderers;
exports.default = _default;
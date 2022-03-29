var Editor = require("./lib/Editor/Editor");
var DefaultRenderer = require("./lib/DraftRenderer/DraftRenderer");

var elementaryEditor = {
  Editor: Editor.default,
  DefaultRenderer: DefaultRenderer.default,
};

module.exports = elementaryEditor;

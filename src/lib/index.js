var Editor = require('./Editor/Editor');	
var DefaultRenderer = require('./DraftRenderer/DraftRenderer');

var elementaryEditor = {
  Editor: Editor.default,
  DefaultRenderer: DefaultRenderer.default
};

module.exports = elementaryEditor;

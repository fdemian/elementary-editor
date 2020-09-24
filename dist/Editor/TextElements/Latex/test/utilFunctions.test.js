"use strict";

var _draftJs = require("draft-js");

var _texUtils = require("../texUtils");

// TODO: import from editor or editor utils.
var insertCustomBlock = function insertCustomBlock(block, editorState) {
  var type = block.type,
      mutability = block.mutability,
      content = block.content;
  var insertAtomicBlock = _draftJs.AtomicBlockUtils.insertAtomicBlock;
  var contentState = editorState.getCurrentContent();
  var contentStateWithEntity = contentState.createEntity(type, mutability, content);
  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  var newEditorState = _draftJs.EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });

  var insertedBlock = insertAtomicBlock(newEditorState, entityKey, '');
  return insertedBlock;
}; // Todo: move to testing utils.


var getEntities = function getEntities(editorState) {
  var entityType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var content = editorState.getCurrentContent();
  var entities = [];
  content.getBlocksAsArray().forEach(function (block) {
    var blockType = block.getType();
    if (blockType == 'atomic') entities.push(block);
  });
  return entities;
};

describe("Latex Block / Utils", function () {
  it("getTexBlock (insert tex block)", function () {
    var texBlock = (0, _texUtils.getTexBlock)();
    expect(texBlock).toStrictEqual({
      type: 'LATEX',
      mutability: 'Immutable',
      content: {
        content: 'f(x) = ... '
      }
    });
  });
  it("removeTeXBlock", function () {
    var emptyState = _draftJs.EditorState.createEmpty();

    var texBlock = (0, _texUtils.getTexBlock)();
    var newState = insertCustomBlock(texBlock, emptyState);
    var entities = getEntities(newState);
    var insertedBlock = entities[0];
    var key = insertedBlock.getKey();
    var removedState = (0, _texUtils.removeTeXBlock)(newState, key);
    var entitiesWithoutBlock = getEntities(removedState);
    expect(entitiesWithoutBlock.length).toStrictEqual(entities.length - 1);
  });
});
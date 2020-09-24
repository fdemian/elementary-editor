"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntities = void 0;

var getEntities = function getEntities(editorState) {
  var entityType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var content = editorState.getCurrentContent();
  var entities = [];
  content.getBlocksAsArray().forEach(function (block) {
    block.findEntityRanges(function (character) {
      if (character.getEntity() !== null) {
        var entity = content.getEntity(character.getEntity());
        var entityResult = {
          type: entity.getType(),
          value: entity.getData()
        };
        entities.push(entityResult);
      }
    });
  });
  return entities;
};

exports.getEntities = getEntities;
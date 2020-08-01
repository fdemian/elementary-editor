export const getEntities = (editorState, entityType = null) => {
  const content = editorState.getCurrentContent();
  const entities = [];
  content.getBlocksAsArray().forEach((block) => {
    block.findEntityRanges((character) => {
      if (character.getEntity() !== null) {
        const entity = content.getEntity(character.getEntity());
        const entityResult = {
          type: entity.getType(),
          value: entity.getData(),
        };
        entities.push(entityResult);
      }
    });
  });

  return entities;
};

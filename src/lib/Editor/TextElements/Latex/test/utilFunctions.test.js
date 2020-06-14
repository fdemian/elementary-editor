import { EditorState, ContentState, AtomicBlockUtils } from "draft-js";
import { getTexBlock, removeTeXBlock } from "../texUtils";

// TODO: import from editor or editor utils.
const insertCustomBlock = (block, editorState) => {
  const { type, mutability, content } = block;

  const { insertAtomicBlock } = AtomicBlockUtils;
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    type,
    mutability,
    content
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  const insertedBlock = insertAtomicBlock(newEditorState, entityKey, "");

  return insertedBlock;
};

// Todo: move to testing utils.
const getEntities = (editorState, entityType = null) => {
  const content = editorState.getCurrentContent();
  const entities = [];
  content.getBlocksAsArray().forEach((block) => {
    const blockType = block.getType();
    if (blockType == "atomic") entities.push(block);
  });

  return entities;
};

describe("Latex Block / Utils", () => {
  it("getTexBlock (insert tex block)", () => {
    const texBlock = getTexBlock();

    expect(texBlock).toStrictEqual({
      type: "LATEX",
      mutability: "Immutable",
      content: {
        content: "f(x) = ... ",
      },
    });
  });

  it("removeTeXBlock", () => {
    const emptyState = EditorState.createEmpty();
    const texBlock = getTexBlock();
    const newState = insertCustomBlock(texBlock, emptyState);

    const entities = getEntities(newState);
    const insertedBlock = entities[0];
    const key = insertedBlock.getKey();
    const removedState = removeTeXBlock(newState, key);
    const entitiesWithoutBlock = getEntities(removedState);

    expect(entitiesWithoutBlock.length).toStrictEqual(entities.length - 1);
  });
});

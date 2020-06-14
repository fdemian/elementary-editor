import { EditorState, Modifier, SelectionState } from "draft-js";

export const defaultContent = { content: "f(x) = ... " };

export const getTexBlock = () => {
  return {
    type: "LATEX",
    mutability: "Immutable",
    content: defaultContent,
  };
};

export const removeTeXBlock = (editorState, blockKey) => {
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(blockKey);

  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: block.getLength(),
  });

  const withoutTeX = Modifier.removeRange(content, targetRange, "backward");
  const resetBlock = Modifier.setBlockType(
    withoutTeX,
    withoutTeX.getSelectionAfter(),
    "unstyled"
  );

  const newState = EditorState.push(editorState, resetBlock, "remove-range");
  const newStateWithoutTex = EditorState.forceSelection(
    newState,
    resetBlock.getSelectionAfter()
  );

  return newStateWithoutTex;
};

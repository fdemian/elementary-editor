import { EditorState, ContentState, AtomicBlockUtils } from 'draft-js';
import { getTexBlock, removeTeXBlock } from '../texUtils';

// TODO: import from editor or editor utils.
const insertCustomBlock = (block, editorState) => {

  const { type, mutability, content } = block;

  const { insertAtomicBlock } = AtomicBlockUtils;
  const contentState  = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, mutability, content);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(
    editorState,
    { currentContent: contentStateWithEntity }
  );

  const insertedBlock = insertAtomicBlock(newEditorState, entityKey, '');

  return insertedBlock;
}


const getEntities = (editorState, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities = [];
    let bCount = 0;
    content.getBlocksAsArray().forEach((block) => {
        bCount = bCount+1;
        console.log(bCount);
        block.findEntityRanges(
           (character) => {
            console.log("''''''''");
            console.log(character);
            if (character.getEntity() !== null) {
              const entity = content.getEntity(character.getEntity());
              console.log(entity);
              console.log("/////////////");
            }
        },
        (start, end) => console.log(".")
      )
    });
};

describe("Latex Block / Utils", () => {

  it("getTexBlock (insert tex block)", () => {

    const texBlock = getTexBlock();

    expect(texBlock).toStrictEqual({
      type:'LATEX' ,
      mutability:'Immutable',
      content: {
       content: 'f(x) = ... '
      }
    });

  })


  it("removeTeXBlock", () => {
    const emptyState = EditorState.createEmpty();
    const texBlock = getTexBlock();
    const newState = insertCustomBlock(texBlock, emptyState);

    getEntities(newState);
    //
    //const key = newState.getSelection().getStartKey();
    //const removedState = removeTeXBlock(newState, key);

    //console.log(removedState);
    //console.log(":============");

    //expect(JSON.stringify(newState)).toStrictEqual(JSON.stringify(withoutTex));

  })

})

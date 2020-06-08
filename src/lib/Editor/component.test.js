import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { shallow, render} from 'enzyme';
import Editor from './Editor';
import EditorControls from './Controls';
import BaseEditor from './BaseEditor';
import URLInput from './URLInput';
import { Input } from 'antd';
import {
  insertMedia,
  insertLink,
  removeLink
} from './EditorStyles';
import { List } from 'immutable';
import { EditorState, ContentBlock, ContentState,
    RichUtils,
   genKey } from 'draft-js';

// Todo: move to testing utils.
const getEntities = (editorState, entityType = null) => {
  const content = editorState.getCurrentContent();
  const entities = [];
  content.getBlocksAsArray().forEach((block) => {
    block.findEntityRanges(
      (character) => {
         if (character.getEntity() !== null) {
            const entity = content.getEntity(character.getEntity());
            const entityResult = {
              type: entity.getType(),
              value: entity.getData()
            };
            entities.push(entityResult);
         }
       })
  });

  return entities;
};

const addEmptyBlock = (editorState) => {
  const newBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
    characterList: List()
  })

  const contentState = editorState.getCurrentContent()
  const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock)

  return EditorState.push(
    editorState,
    ContentState
      .createFromBlockArray(newBlockMap.toArray())
      .set('selectionBefore', contentState.getSelectionBefore())
      .set('selectionAfter', contentState.getSelectionAfter())
  )
}

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<Editor />", () => {

  it("Render Editor", () => {

   const component = render(
    <Editor
      initialState={null}
      containerRef={null}
    />
    );

    expect(component[0]['attribs'].class)
    .toStrictEqual('em-editor-container');

    const containerDiv = component.find('div');
    const controls = component.find(EditorControls);
    const baseEditor = component.find(BaseEditor);

    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();

  })

  it("<URLInput /> Render", () => {

    const changeFn = jest.fn();

    const component = shallow(
      <URLInput
        changeFn={changeFn}
        urlValue={""}
        type={"url"}
        cancelFn={jest.fn()}
        confirmFn={jest.fn()}
      />
     );

     const input = component.find(Input);
     const inputProps = input.props();

     expect(inputProps.name).toStrictEqual('URL input');
     expect(inputProps.value).toStrictEqual('');
     expect(inputProps.placeholder).toStrictEqual('Enter url URL');
     expect(inputProps.type).toStrictEqual('text');
  });

  // TODO: interaction test for URL Input.
  // Test interaction with editor.

  it("Editory styles > Insert Media", () => {

      const emptyState = EditorState.createEmpty();
      const videoEntity = {
        type: 'Video',
        value: 'https://video.com/video.mp4',
      };

      const stateWithMedia = insertMedia(emptyState, videoEntity.type, videoEntity.value);
      const entities = getEntities(stateWithMedia);

      expect(entities.length).toStrictEqual(1);
      expect(entities[0].type).toStrictEqual('Video');
      expect(entities[0].value.src).toStrictEqual(videoEntity.value);
  });

  //TODO: find out why this is not working.
  /*
  it("Editory styles > Insert Link", () => {

      const contentState = ContentState.createFromText("Text for testing.");
      const initialContentState = EditorState.createWithContent(contentState);
      const addedBlockState = addEmptyBlock(initialContentState);

      let selection = undefined;
      let currentContent = addedBlockState.getCurrentContent();
      selection = addedBlockState.getSelection().merge({
        anchorKey: currentContent.getFirstBlock().getKey(),
        anchorOffset: 0,
        focusOffset: currentContent.getLastBlock().getText().length,
        focusKey: currentContent.getLastBlock().getKey(),
      });

      //
      const link = { type: 'LINK', value: 'http://www.link.com' };
      const stateWithLink = insertLink(addedBlockState, link.type, link.value);

      console.log("???????????");
      const doesIt = RichUtils.currentBlockContainsLink(stateWithLink);
      console.log(doesIt);

      //expect(entities.length).toStrictEqual(1);
      //expect(entities[0].type).toStrictEqual('Video');
      //expect(entities[0].value.src).toStrictEqual(videoEntity.value);
  });
  */

 //Remove Link


})

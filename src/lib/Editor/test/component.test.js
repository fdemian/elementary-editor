import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, render, mount } from "enzyme";
import { Input, Tooltip } from "antd";
import { List } from "immutable";
import {
  EditorState,
  ContentBlock,
  ContentState,
  RichUtils,
  genKey,
} from "draft-js";

import Editor from "../Editor";
import EditorControls from "../Controls";
import EditorStyles from "../EditorStyles";
import BaseEditor from "../BaseEditor";
import StyleButton from "../StyleButton";
import URLInput from "../URLInput";
import { insertMedia, insertLink, removeLink } from "../EditorStyles";
import { getEntities } from "../../testingUtils.js";

const addEmptyBlock = (editorState) => {
  const newBlock = new ContentBlock({
    key: genKey(),
    type: "unstyled",
    text: "",
    characterList: List(),
  });

  const contentState = editorState.getCurrentContent();
  const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock);

  return EditorState.push(
    editorState,
    ContentState.createFromBlockArray(newBlockMap.toArray())
      .set("selectionBefore", contentState.getSelectionBefore())
      .set("selectionAfter", contentState.getSelectionAfter())
  );
};

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("<Editor />", () => {
  it("Render Editor", () => {
    const _state = {
      blocks: [
        {
          key: "ba892",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const initialState = JSON.stringify(_state);

    const component = render(
      <Editor initialState={null} containerRef={null} />
    );

    expect(component[0]["attribs"].class).toStrictEqual("em-editor-container");

    const containerDiv = component.find("div");
    const controls = component.find(EditorControls);
    const baseEditor = component.find(BaseEditor);

    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });

  it("Render Editor with initialState and filtering styles.", () => {
    const _state = {
      blocks: [
        {
          key: "ba892",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const initialState = JSON.stringify(_state);

    const component = render(
      <Editor
        initialState={initialState}
        containerRef={null}
        filterStyles={["blockquote"]}
      />
    );

    expect(component[0]["attribs"].class).toStrictEqual("em-editor-container");

    const containerDiv = component.find("div");
    const controls = component.find(EditorControls);
    const baseEditor = component.find(BaseEditor);

    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });

  it("Render AltEditor.", () => {
    const _state = {
      blocks: [
        {
          key: "ba892",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const initialState = JSON.stringify(_state);

    const component = render(
      <Editor
        initialState={initialState}
        containerRef={null}
        filterStyles={["blockquote"]}
        altEditor={Editor}
      />
    );

    expect(component[0]["attribs"].class).toStrictEqual("em-editor-container");

    const containerDiv = component.find("div");
    const controls = component.find(EditorControls);
    const baseEditor = component.find(BaseEditor);

    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();
  });

  it("Render Controls with input visible.", () => {
    const props = {
      editorStyles: EditorStyles,
      blockIsActive: jest.fn(),
      inlineIsActive: jest.fn(),
      customBlockIsActive: jest.fn(),
      customBlockToggleFn: jest.fn(),
      onToggleInline: jest.fn(),
      onToggleBlock: jest.fn(),
      confirmInput: jest.fn(),
      onInputChange: jest.fn(),
      showInput: jest.fn(),
      cancelInput: jest.fn(),
      inputVisible: true,
      inputType: "URL",
      inputValue: "",
    };

    const component = shallow(<EditorControls {...props} />);
    const urlInput = component.find(URLInput);

    // Expect URL Input to be present.
    expect(urlInput.length).toStrictEqual(1);
  });

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

    expect(inputProps.name).toStrictEqual("URL input");
    expect(inputProps.value).toStrictEqual("");
    expect(inputProps.placeholder).toStrictEqual("Enter url URL");
    expect(inputProps.type).toStrictEqual("text");
  });

  //
  it("<StyleButton /> Render", () => {
    const toggleFn = jest.fn();
    const getInputFn = jest.fn();
    const activeFn = (s) => true;
    const props = {
      onToggle: toggleFn,
      getInput: getInputFn,
      activeFn: activeFn,
      icon: <i></i>,
      style: "",
      label: "button X",
    };

    // Test first render and effect
    act(() => {
      ReactDOM.render(<StyleButton {...props} />, container);
    });

    const buttonContainer = container.querySelector(".StyleButton");

    // Test second render and effect
    act(() => {
      buttonContainer.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonContainer).toBeTruthy();
    expect(toggleFn.mock.calls[0].length).toStrictEqual(1);
  });

  // TODO: interaction test for URL Input.
  // Test interaction with editor.

  it("Editor styles > Insert Media", () => {
    const emptyState = EditorState.createEmpty();
    const videoEntity = {
      type: "Video",
      value: "https://video.com/video.mp4",
    };

    const stateWithMedia = insertMedia(
      emptyState,
      videoEntity.type,
      videoEntity.value
    );
    const entities = getEntities(stateWithMedia);

    expect(entities.length).toStrictEqual(1);
    expect(entities[0].type).toStrictEqual("Video");
    expect(entities[0].value.src).toStrictEqual(videoEntity.value);
  });

  //TODO: find out why this is not working.
  it("Editor styles > Insert Link", () => {
    const contentState = ContentState.createFromText("Text for testing.");
    const initialContentState = EditorState.createWithContent(contentState);
    //const addedBlockState = addEmptyBlock(initialContentState);

    const blockStateContent = initialContentState.getCurrentContent();
    const anchorKey = blockStateContent.getFirstBlock().getKey();
    const focusKey = blockStateContent.getLastBlock().getKey();
    const focusOffset = blockStateContent.getLastBlock().getText().length;

    let updatedSelection = initialContentState.getSelection().merge({
      anchorKey: anchorKey,
      focusKey: focusKey,
      anchorOffset: 0,
      focusOffset: focusOffset,
    });
    const selectedState = EditorState.forceSelection(
      initialContentState,
      updatedSelection
    );

    //
    const link = { type: "LINK", value: "http://www.link.com" };
    const stateWithLink = insertLink(selectedState, link.type, link.value);

    const currentContent = stateWithLink.getCurrentContent();
    let newSelection = stateWithLink.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length,
    });
    let newStateWithLink = EditorState.forceSelection(
      stateWithLink,
      newSelection
    );

    expect(RichUtils.currentBlockContainsLink(newStateWithLink)).toStrictEqual(
      true
    );
  });

  //TODO: find out why this is not working.
  it("Editor styles > Remove Link", () => {
    const contentState = ContentState.createFromText("Text for testing.");
    const initialContentState = EditorState.createWithContent(contentState);
    const blockStateContent = initialContentState.getCurrentContent();
    const anchorKey = blockStateContent.getFirstBlock().getKey();
    const focusKey = blockStateContent.getLastBlock().getKey();
    const focusOffset = blockStateContent.getLastBlock().getText().length;

    // Remove a link from a collapsed selection. Should be null.
    const notRemoved = removeLink(initialContentState);
    expect(notRemoved).toStrictEqual(null);

    // Select all text.
    let updatedSelection = initialContentState.getSelection().merge({
      anchorKey: anchorKey,
      focusKey: focusKey,
      anchorOffset: 0,
      focusOffset: focusOffset,
    });
    const selectedState = EditorState.forceSelection(
      initialContentState,
      updatedSelection
    );

    // Insert link
    const link = { type: "LINK", value: "http://www.link.com" };
    const stateWithLink = insertLink(selectedState, link.type, link.value);

    //Select all text, and check that there is a link.
    const currentContent = stateWithLink.getCurrentContent();
    let newSelection = stateWithLink.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length,
    });
    let newStateWithLink = EditorState.forceSelection(
      stateWithLink,
      newSelection
    );

    expect(RichUtils.currentBlockContainsLink(newStateWithLink)).toStrictEqual(
      true
    );

    // Remove link.
    const stateWithoutLink = removeLink(newStateWithLink);

    const content = stateWithoutLink.getCurrentContent();
    let selectAll = stateWithoutLink.getSelection().merge({
      anchorKey: content.getFirstBlock().getKey(),
      focusKey: content.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: content.getLastBlock().getText().length,
    });
    let newStateWithoutLink = EditorState.forceSelection(
      stateWithoutLink,
      selectAll
    );

    expect(
      RichUtils.currentBlockContainsLink(newStateWithoutLink)
    ).toStrictEqual(false);
  });

  it("Test editor internal methods.", () => {
    const props = {
      initialState: null,
      containerRef: null,
    };

    // Test first render and effect
    act(() => {
      ReactDOM.render(<Editor {...props} />, container);
    });

    const styleButton = container.querySelector(".StyleButton");

    act(() => {
      styleButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    let editor = container.querySelector(".em-editor-container");
    //expect(controls).toBeTruthy();
    //expect(baseEditor).toBeTruthy();
    //expect(containerDiv).toBeTruthy();
  });
});

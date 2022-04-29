import React, { useRef } from "react";
import ReactDOM from "react-dom";
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

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

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

    render(<Editor initialState={null} containerRef={null} />);

    const textBoxes = screen.getAllByRole("textbox");
    const buttons = screen.getAllByRole("button");

    expect(textBoxes[1]).toBeInTheDocument();
    expect(textBoxes[1]).toHaveAttribute("spellCheck", "false");
    expect(textBoxes[1]).toHaveAttribute("contenteditable", "true");

    // The default editor has exactly 15 buttons.
    expect(buttons.length).toStrictEqual(16);
  });

  it("Render Editor with initialState and filtering styles.", () => {
    const _state = {
      blocks: [
        {
          key: "ba892",
          text: "peccorino",
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

    render(
      <Editor
        initialState={initialState}
        containerRef={null}
        filterStyles={["blockquote"]}
      />
    );

    const buttons = screen.getAllByRole("button");
    const textNode = screen.getByText("peccorino");

    expect(buttons.length).toStrictEqual(1);
    expect(textNode).toBeInTheDocument();
  });


  /*
  it("Insert Latex element (internal method)", () => {

    render(
      <Editor
        initialState={null}
        containerRef={null}
        filterStyles={["blockquote"]}
      />
    );

    screen.debug(undefined, 300000)
  });*/

  it("Render AltEditor.", () => {

    const AltEditor = () => (
    <textarea
      id="alteditor"
      aria-label="Alt Editor"
      name="alteditor"
      rows="4"
      cols="50"
    ></textarea>
    );


    render(
      <Editor
        initialState={null}
        containerRef={null}
        altEditor={AltEditor}
      />
    );

    expect(screen.getByRole("textbox", { name: "Alt Editor"})).toBeInTheDocument();
  });

  it("Render Controls with input visible.", async () => {
    const user = userEvent.setup()

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
      inputType: "image",
      inputValue: "",
    };

    render(<EditorControls {...props} />);

    const _input = screen.getByRole('input', { name: 'URL Input'});
    const urlToType = "www.url.com";

    expect(_input).toBeInTheDocument();
    expect(_input).toHaveAttribute("placeholder", "Enter URL (image)");
    expect(_input).toHaveAttribute('name', "URL Input");
    expect(_input.value).toStrictEqual("");

    await user.type(screen.getByRole('input', { name: 'URL Input'}), urlToType);

    expect(props.onInputChange).toHaveBeenCalled();
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

  /*
  it("Test editor internal methods.", () => {
    const props = {
      initialState: null,
      containerRef: null,
      filterStyles: ["Video"]
    };

    const { getByRole, getByTestId } = render(<Editor {...props} />);

    // Accept and cancel input.

    // Change input.
    fireEvent.click(getByRole('button'));

    const input = getByRole('input');
    fireEvent.change(input, { target: { value: "www.url.com" }});

    expect(input.value).toStrictEqual("www.url.com");
    fireEvent.click(getByTestId("confirm-url-button"));

    // Cancel input.
    fireEvent.click(getByRole('button'));
    expect(getByRole('input').value).toStrictEqual("");
    fireEvent.click(getByTestId("cancel-url-button"));

    const textbox = getByTestId("draft-editor");
    fireEvent.change(textbox, { target: { value: "Lorem Ipsum" }});

    //expect(getByText("Lorem Ipsum")).toBeInTheDocument();
    //fireEvent.click(getByTestId("cancel-url-button"));
    //const input2 = getByRole('textbox');


    //let editor = container.querySelector(".em-editor-container");
    //expect(controls).toBeTruthy();
    //expect(baseEditor).toBeTruthy();
    //expect(containerDiv).toBeTruthy();
  });
  */

});

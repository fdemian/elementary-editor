import { EditorState, ContentBlock, ContentState } from "draft-js";

import {
  getBlockStyle,
  findEntities,
  findLinkEntities,
  findSpoilerEntities,
  filterStyle,
  filterWhiteListedStyles,
  createNewImmutableEntity,
  insertEntityToState,
} from "../utils";

import EditorStyles, { insertLink } from "../EditorStyles";
import { getEntities } from "../../testingUtils.js";

/**/
describe("Editor Utils", () => {
  it("getBlockStyle", () => {
    // Quote block.
    const quoteBlock = { getType: () => "blockquote" };
    expect(getBlockStyle(quoteBlock)).toStrictEqual("Blockquote");

    // Code block.
    const codeBlock = { getType: () => "code-block" };
    expect(getBlockStyle(codeBlock)).toStrictEqual("Code");

    // Any block. Default to null.
    const emptyBlock = { getType: () => "" };
    expect(getBlockStyle(emptyBlock)).toStrictEqual(null);
  });

  it("filter", () => {
    const finalBlackListedStyles = {
      BLOCK_TYPES: [],
      INLINE_STYLES: [],
      CUSTOM_STYLES: [
        {
          label: "Latex",
          style: "Latex",
          requiresInput: false,
          requiresSelection: false,
          icon: [],
        },
      ],
    };

    const filteredStyles = filterWhiteListedStyles(EditorStyles, ["Latex"]);
    filteredStyles.CUSTOM_STYLES[0].icon = [];

    expect(filteredStyles).toStrictEqual(finalBlackListedStyles);

    const { BLOCK_TYPES } = EditorStyles;

    // Only allow blockquote style.
    const blockquote = { label: "Quote", style: "blockquote", icon: null };
    const filtered = filterStyle(BLOCK_TYPES, ["blockquote"]);
    expect(filtered).toStrictEqual([
      {
        icon: {
          icon: [
            448,
            512,
            [
              8220,
              "quote-left-alt",
            ],
            "f10d",
            "M96 224C84.72 224 74.05 226.3 64 229.9V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32S145.7 96 128 96C57.42 96 0 153.4 0 224v96c0 53.02 42.98 96 96 96s96-42.98 96-96S149 224 96 224zM352 224c-11.28 0-21.95 2.305-32 5.879V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32s-14.33-32-32-32c-70.58 0-128 57.42-128 128v96c0 53.02 42.98 96 96 96s96-42.98 96-96S405 224 352 224z",
          ],
          iconName: "quote-left",
          prefix: "fas",
        },
        label: "Quote",
        style: "blockquote",
      },
    ]);
  });

  it("Create and insert immutable entity", () => {
    const editorText = "Test";
    const contentState = ContentState.createFromText(editorText);
    const editorState = EditorState.createWithContent(contentState);
    const currentContent = editorState.getCurrentContent();
    let newSelection = editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length,
    });
    let selectedState = EditorState.forceSelection(editorState, newSelection);

    const newEntity = createNewImmutableEntity(selectedState, "SPOILER");
    const newState = insertEntityToState(selectedState, newEntity);
    const entities = getEntities(newState);

    expect(entities[0].type).toStrictEqual("SPOILER");
    expect(entities[0].value.text).toStrictEqual(editorText);
  });

  it("Find link entities", () => {
    const initialText = "Text for testing.";
    const contentState = ContentState.createFromText(initialText);
    const initialContentState = EditorState.createWithContent(contentState);

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

    // Check that there actually are link entities.
    const contentBlock = newStateWithLink.getCurrentContent();
    const foundRanges = [];
    const foundFn = (start, end) => foundRanges.push(end - start);
    contentBlock.getBlocksAsArray().forEach((block) => {
      findLinkEntities(block, foundFn, contentBlock);
    });

    expect(foundRanges.length).toStrictEqual(1);
    expect(foundRanges[0]).toStrictEqual(initialText.length);
  });

  it("Find spoiler entities", () => {
    const initialText = "Text for testing.";
    const contentState = ContentState.createFromText(initialText);
    const initialContentState = EditorState.createWithContent(contentState);

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
    const newEntity = createNewImmutableEntity(selectedState, "SPOILER");
    const stateWithSpoiler = insertEntityToState(selectedState, newEntity);

    const currentContent = stateWithSpoiler.getCurrentContent();
    let newSelection = stateWithSpoiler.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length,
    });
    let newStateWithSpoiler = EditorState.forceSelection(
      stateWithSpoiler,
      newSelection
    );

    // Check that there actually are link entities.
    const contentBlock = newStateWithSpoiler.getCurrentContent();
    const foundRanges = [];
    const foundFn = (start, end) => foundRanges.push(end - start);
    contentBlock.getBlocksAsArray().forEach((block) => {
      findSpoilerEntities(block, foundFn, contentBlock);
    });

    expect(foundRanges.length).toStrictEqual(1);
    expect(foundRanges[0]).toStrictEqual(initialText.length);
  });
});

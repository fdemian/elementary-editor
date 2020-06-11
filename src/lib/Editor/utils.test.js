import {
  getBlockStyle,
  findEntities,
  findLinkEntities,
  findSpoilerEntities,
  filterStyle,
  filterWhiteListedStyles,
  createNewImmutableEntity,
  insertEntityToState,
} from './utils';

import { getEntities } from '../testingUtils.js';

import {
 EditorState,
 ContentBlock,
 ContentState,
} from 'draft-js';

/**/

const BLOCK_TYPES =
[
  { label: 'Quote', style: 'blockquote', icon: null },
  { label: 'Heading', style: 'header-two', icon: null },
  { label: 'Unordered List', style: 'unordered-list-item', icon: null },
  { label: 'Ordered List', style: 'ordered-list-item', icon: null },
  { label: 'Code Block', style: 'code-block', icon: null }
]

const INLINE_STYLES =
[
  { label: 'Bold', style: 'BOLD', icon: null },
  { label: 'Italic', style: 'ITALIC', icon: null },
  { label: 'Underline', style: 'UNDERLINE', icon: null },
  { label: 'Strikethrough', style: 'STRIKETHROUGH', icon: null }
]

const CUSTOM_STYLES =
[
  {
    label: 'Link',
    style: 'Link',
    toggleFn: null,
    requiresInput: true,
    requiresSelection: true,
    icon: null
  },
  {
    label: 'Spoiler',
    style: 'Spoiler',
    //toggleFn: insertSpoiler,
    requiresInput: false,
    requiresSelection: true,
    icon: null
  }
];

const EditorStyles = { BLOCK_TYPES, INLINE_STYLES, CUSTOM_STYLES };

/**/
describe("Editor Utils", () => {

  it("getBlockStyle", () => {

    // Quote block.
    const quoteBlock = {getType: () => 'blockquote' };
    expect(getBlockStyle(quoteBlock)).toStrictEqual('Blockquote')

    // Code block.
    const codeBlock = { getType: () => 'code-block' };
    expect(getBlockStyle(codeBlock)).toStrictEqual('Code');

    // Any block. Default to null.
    const emptyBlock = { getType: () => '' };
    expect(getBlockStyle(emptyBlock)).toStrictEqual(null);
  })

  it("filter", () => {
    // Do not allow any style.
    const filteredEmpty = filterStyle(BLOCK_TYPES, []);
    expect(filteredEmpty).toStrictEqual([]);

    // Only allow blockquote style.
    const blockquote = { label: 'Quote', style: 'blockquote', icon: null };
    const filtered = filterStyle(BLOCK_TYPES, ['blockquote']);
    expect(filtered).toStrictEqual([blockquote]);
  })

  it("Create and insert immutable entity", () => {
    const editorText = "Test";
    const contentState = ContentState.createFromText(editorText);
    const editorState = EditorState.createWithContent(contentState);
    const currentContent = editorState.getCurrentContent();
    let newSelection = editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      focusKey: currentContent.getLastBlock().getKey(),
      anchorOffset: 0,
      focusOffset: currentContent.getLastBlock().getText().length
    });
    let selectedState = EditorState.forceSelection(editorState, newSelection);

    const newEntity = createNewImmutableEntity(selectedState, 'SPOILER');
    const newState = insertEntityToState(selectedState, newEntity);
    const entities = getEntities(newState);

    expect(entities[0].type).toStrictEqual("SPOILER");
    expect(entities[0].value.text).toStrictEqual(editorText);
  })

})

import Draft from 'draft-js';

// Font awesome icons.
import {
  faQuoteLeft,
  faHeading,
  faList,
  faListOl,
  faCode,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faLink,
  faUnlink,
  faImage,
  faEye,
  faVideo,
  faCalculator
} from '@fortawesome/fontawesome-free-solid';

const {
  EditorState,
  RichUtils,
  AtomicBlockUtils
} = Draft;


/* ----------------------------------------- */

// TODO: this has been implemented using toggleLink.
// Should editorState be a parameter or not?
function insertEntity(editor, editorState, newContentState) {
  const entityKey = newContentState.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
  editor.setState({
    editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
  }, () => { setTimeout(() => editor.editor.focus(), 0); });
}

export function insertMedia(editor, type, value) {
  const { editorState } = editor.state;
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', { src: value });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  editor.setState({
    editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'media')
  }, () => { setTimeout(() => editor.focus(), 0); });
}

export function insertQuote(editor, type, value) {
  const { editorState } = editor.state;
  const contentState = editorState.getCurrentContent();
  const params = { text: value.text, author: value.author };
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', params);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  editor.setState(
    {
      editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
    },
    () => { setTimeout(() => editor.focus(), 0); }
  );
}

export function insertLink(editor, type, value) {
  const { editorState } = editor.state;
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: value });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  const newStateSelection = newEditorState.getSelection();

  editor.setState(
    {
      editorState: RichUtils.toggleLink(newEditorState, newStateSelection, entityKey)
    },
    () => {
      setTimeout(() => editor.focus(), 0);
    }
  );
}

export function removeLink(editor) {
  const { editorState } = editor.state;
  const selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    editor.setState({
      editorState: RichUtils.toggleLink(editorState, selection, null)
    });
  }
}

export function insertSpoiler(editor) {
  const { editorState } = editor.state;
  const selection = editorState.getSelection();
  const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
  const selectionState = editorState.getSelection();
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();
  const selectedText = contentBlock.getText().slice(start, end);
  const contentState = editorState.getCurrentContent();

  const contentStateWithEntity = contentState.createEntity('SPOILER', 'IMMUTABLE', { text: selectedText });
  insertEntity(editor, editorState, contentStateWithEntity);
}

export function insertLaTexBlock(editor) {
  editor.insertTex();
}

/* ------------------- */

const BLOCK_TYPES =
[
  { label: 'Quote', style: 'blockquote', icon: faQuoteLeft },
  { label: 'Heading', style: 'header-two', icon: faHeading },
  { label: 'Unordered List', style: 'unordered-list-item', icon: faList },
  { label: 'Ordered List', style: 'ordered-list-item', icon: faListOl },
  { label: 'Code Block', style: 'code-block', icon: faCode }
];

const INLINE_STYLES =
[
  { label: 'Bold', style: 'BOLD', icon: faBold },
  { label: 'Italic', style: 'ITALIC', icon: faItalic },
  { label: 'Underline', style: 'UNDERLINE', icon: faUnderline },
  { label: 'Strikethrough', style: 'STRIKETHROUGH', icon: faStrikethrough }
];

const CUSTOM_STYLES =
[
  {
    label: 'Link', style: 'Link', toggleFn: insertLink, requiresInput: true, requiresSelection: true, icon: faLink
  },
  {
    label: 'Remove Link', style: 'LinkRemove', toggleFn: removeLink, requiresInput: false, requiresSelection: false, icon: faUnlink
  },
  {
    label: 'Image', style: 'Image', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: faImage
  },
  {
    label: 'Spoiler', style: 'Spoiler', toggleFn: insertSpoiler, requiresInput: false, requiresSelection: true, icon: faEye
  },
  {
    label: 'Video', style: 'Video', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: faVideo
  },
  {
    label: 'Latex', style: 'Latex', toggleFn: insertLaTexBlock, requiresInput: false, requiresSelection: false, icon: faCalculator
  }
];


const EditorStyles = { BLOCK_TYPES, INLINE_STYLES, CUSTOM_STYLES };

export default EditorStyles;

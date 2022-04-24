import Draft from "draft-js";

// Font awesome icons.
import {
  faKeyboard,
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
} from "@fortawesome/free-solid-svg-icons";

const { EditorState, RichUtils, AtomicBlockUtils } = Draft;

/* ----------------------------------------- */

export const insertMedia = (editorState, type, value) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, "IMMUTABLE", {
    src: value,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const mediaBlock = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    type
  );

  return mediaBlock;
};

export const insertLink = (editorState, type, value) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url: value,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  //
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  const newStateSelection = newEditorState.getSelection();
  const linkState = RichUtils.toggleLink(
    newEditorState,
    newStateSelection,
    entityKey
  );

  return linkState;
};

export const removeLink = (editorState) => {
  const selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    return RichUtils.toggleLink(editorState, selection, null);
  }

  return null;
};

export const insertKeyboard = (editorState) => {
  const selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    return RichUtils.toggleInlineStyle(editorState, 'Keyboard');
  }

  return null;
}

/* ------------------- */

const BLOCK_TYPES = [
  { label: "Quote", style: "blockquote", icon: faQuoteLeft },
  { label: "Heading", style: "header-two", icon: faHeading },
  { label: "Unordered List", style: "unordered-list-item", icon: faList },
  { label: "Ordered List", style: "ordered-list-item", icon: faListOl },
  { label: "Code Block", style: "code-block", icon: faCode }
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: faBold },
  { label: "Italic", style: "ITALIC", icon: faItalic },
  { label: "Underline", style: "UNDERLINE", icon: faUnderline },
  { label: "Strikethrough", style: "STRIKETHROUGH", icon: faStrikethrough },
  { label: "Keyboard", style: "KEYBOARD", icon: faKeyboard },
  { label: "Spoiler", style: "SPOILER", icon: faEye }
];

const CUSTOM_STYLES = [
  {
    label: "Link",
    style: "Link",
    toggleFn: insertLink,
    requiresInput: true,
    requiresSelection: true,
    icon: faLink
  },
  {
    label: "Remove Link",
    style: "LinkRemove",
    toggleFn: removeLink,
    requiresInput: false,
    requiresSelection: true,
    icon: faUnlink
  },
  {
    label: "Image",
    style: "Image",
    toggleFn: insertMedia,
    requiresInput: true,
    requiresSelection: false,
    icon: faImage
  },
  {
    label: "Video",
    style: "Video",
    toggleFn: insertMedia,
    requiresInput: true,
    requiresSelection: false,
    icon: faVideo
  },
  {
    label: "Latex",
    style: "Latex",
    requiresInput: false,
    requiresSelection: false,
    icon: faCalculator
  },
];

const EditorStyles = { BLOCK_TYPES, INLINE_STYLES, CUSTOM_STYLES };

export default EditorStyles;

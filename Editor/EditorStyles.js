import Draft from 'draft-js';

const {
 EditorState,
 RichUtils,
 AtomicBlockUtils
} = Draft;

const BLOCK_TYPES =
[
  {label: 'Quote', style: 'blockquote', icon: "quote-left" },
  {label: 'Heading', style: 'header-two', icon: "header"},
  {label: 'Unordered List', style: 'unordered-list-item', icon: "list"},
  {label: 'Ordered List', style: 'ordered-list-item', icon: "list-ol"},
  {label: 'Code Block', style: 'code-block', icon: "code" }
];

const INLINE_STYLES =
[
  {label: 'Bold', style: 'BOLD', icon: "bold"},
  {label: 'Italic', style: 'ITALIC', icon: "italic"},
  {label: 'Underline', style: 'UNDERLINE', icon: "underline"},
  {label: 'Strikethrough', style: 'STRIKETHROUGH', icon: "strikethrough"}
];

const CUSTOM_STYLES =
[
  {label: 'Link', style: 'Link', toggleFn: insertLink, requiresInput: true, requiresSelection: true, icon: "link" },
  {label: 'Remove Link', style: 'LinkRemove', toggleFn: removeLink, requiresInput: false, requiresSelection: false, icon: "unlink" },
  {label: 'Image', style: 'Image', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: "picture-o"},
  {label: 'Spoiler', style: 'Spoiler', toggleFn: insertSpoiler, requiresInput: false, requiresSelection: true, icon: "eye"},
  {label: 'Video', style: 'Video', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: "video-camera" },
  {label: 'Latex', style: 'Latex', toggleFn: insertLaTexBlock, requiresInput: false, requiresSelection: false, icon: "calculator" }
];

/* ------------------------------------------------------------------------------------------------------ */

// TODO: todo esta implementado como toggleLink, editor state debería llegar por parámetro?
function insertEntity(editor, editorState, newContentState)
{
   const entityKey = newContentState.getLastCreatedEntityKey();
   const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
   editor.setState({
	   editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
   },() => {setTimeout(() => editor.refs.editor.focus(), 0); });
}

export function insertMedia(editor, type, value)
 {
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();
   const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {src: value});
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   editor.setState({
     editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'media')
   }, () => {setTimeout(() => editor.focus(), 0); });
 }

 export function insertQuote(editor, type, value)
 {
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();
   const params = {text: value.text, author: value.author};
   const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', params);
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   editor.setState({
     editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
     },
     () => {setTimeout(() => editor.focus(), 0); });
 }

 export function insertLink(editor, type, value)
 {
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();
   const contentStateWithEntity = contentState.createEntity('LINK','MUTABLE', {url: value});
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
   const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity });
   const newStateSelection = newEditorState.getSelection();

   editor.setState({
     editorState: RichUtils.toggleLink(newEditorState, newStateSelection, entityKey)
   },
   () => {
       setTimeout(() => editor.focus(), 0);
   });
 }

 export function removeLink(editor)
 {
    const {editorState} = editor.state;
    const selection = editorState.getSelection();

    if(!selection.isCollapsed()) {
       editor.setState({
         editorState: RichUtils.toggleLink(editorState, selection, null)
       });
    }
 }

 export function insertSpoiler(editor)
 {
   const {editorState} = editor.state;
   const selection = editorState.getSelection();
   const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
   const selectionState = editorState.getSelection();
   const start = selectionState.getStartOffset();
   const end = selectionState.getEndOffset();
   const selectedText = contentBlock.getText().slice(start, end);
   const contentState = editorState.getCurrentContent();

   const contentStateWithEntity = contentState.createEntity('SPOILER', 'IMMUTABLE', {text: selectedText});
   insertEntity(editor, editorState, contentStateWithEntity);
 }

 export function insertLaTexBlock(editor){
   editor.insertTex();
 }

 const EditorStyles = { BLOCK_TYPES, INLINE_STYLES, CUSTOM_STYLES };

 export default EditorStyles;

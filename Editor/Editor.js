import React from 'react';
import Draft from 'draft-js';
import {Map} from 'immutable';
import EditorControls from './Controls';
import TeXBlock from './TextElements/Latex/TeXBlock';
import {insertTeXBlock} from './TextElements/Latex/insertTeXBlock';
import {removeTeXBlock} from './TextElements/Latex/removeTeXBlock';
import Spoiler from './TextElements/Spoiler/SpoilerWrapper';
import Media from './TextElements/Media/Media';
import Link from  './TextElements/Link/Link';
import QuoteBlockWrapper from './TextElements/QuoteBlock/QuoteBlockWrapper';
import editorStyles from './EditorStyles';

import './css/Draft.css';
import './css/Editor.css';
import 'katex/dist/katex.css';

const {
 CompositeDecorator,
 ContentState,
 Editor,
 EditorState,
 RichUtils,
 AtomicBlockUtils,
 DefaultDraftBlockRenderMap,
 convertToRaw,
 convertFromRaw
} = Draft;

const blockRenderMap = Map({'SPOILER':{ element: Spoiler },'Latex':{ element: TeXBlock }});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {

	let blockStyle = null;

	switch (block.getType())
	{
	  case 'blockquote':
        blockStyle = 'Blockquote';
		break;
	  case 'code-block':
	    blockStyle = "Code";
		break;
	  default:
	    blockStyle = null;
	}

	return blockStyle;
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
     (character) => {
        const entityKey = character.getEntity();
        return (
           entityKey !== null &&
           contentState.getEntity(entityKey).getType() === 'LINK'
        );
     },
     callback
  );
}


function findSpoilerEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
     (character) => {
        const entityKey = character.getEntity();
        return (
           entityKey !== null &&
           contentState.getEntity(entityKey).getType() === 'SPOILER'
        );
     },
     callback
  );
}


class EditorComponent extends React.Component {

 constructor(props) {

   super(props);

   const decorator = new CompositeDecorator([
      {
        strategy: (contentBlock, callback, contentState) => findLinkEntities(contentBlock, callback, contentState),
        component: Link,
      },
      {
        strategy: (contentBlock, callback, contentState) => findSpoilerEntities(contentBlock, callback, contentState),
        component: Spoiler,
      },
   ]);

   const {initialState} = this.props;

   let _initalEditorState;

   if(initialState == null)
   {
	 _initalEditorState = EditorState.createEmpty(decorator);
   }
   else
   {
     const _contentState = convertFromRaw(JSON.parse(initialState));
     _initalEditorState = EditorState.createWithContent(_contentState, decorator);
   }

   this.filterStyles = this.props.filterStyles === undefined ? null: this.props.filterStyles;
   this.state = {liveTeXEdits: Map(), editorState: _initalEditorState};
   this.focus = () => this.refs.editor.focus();
   this.onChange = (state) => this._handleChange(state);
   this.handleKeyCommand = (command) => this._handleKeyCommand(command);
   this.toggleBlockType = (type) => this._toggleBlockType(type);
   this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
   this.spoilerBlockRender = (style) => this._spoilerBlockRender(style);
   this.selectionIsCollapsed = () => this._selectionIsCollapsed();
   this.getCurrentContent = () => this.state.editorState.getCurrentContent();
   this.getContent = () => this._getContent();
   this.blockIsActive = (block) => this._blockIsActive(block);
   this.inlineIsActive = (style) => this._inlineIsActive(style);
   this.customBlockIsActive = (block) => this._customBlockIsActive(block);
   this.clear = () => this._clear();
   this.insertQuote = (comment) => this._insertQuote(comment);
   this.insertQuoteBlock = (type, content, author) => this._insertQuoteBlock(type, content, author);
   this.insertTex = () => this._insertTex();
   this.removeTex = (blockKey) => this._removeTex(blockKey);

   this.editorStyles = null;

   // If the user has defined which styles to whitelist, use only those.
   // Otherwise use all of the styles.
   if(this.filterStyles === null)
     this.editorStyles = editorStyles;
   else
     this.editorStyles = this.filterWhiteListedStyles(editorStyles, this.filterStyles);

 }

 filterWhiteListedStyles(editorStyles, allowedStyles) {

	console.log(editorStyles);
	return editorStyles;
 }
 
 _getContent = () => {	
    const currentContent = this.getCurrentContent();
	return convertToRaw(currentContent);	 
 }

 _removeTeX = (blockKey) => {
   var {editorState, liveTeXEdits} = this.state;
    this.setState({
      liveTeXEdits: liveTeXEdits.remove(blockKey),
      editorState: removeTeXBlock(editorState, blockKey),
    });
 };

 _insertTex = () => {
   this.setState({
     liveTeXEdits: Map(),
     editorState: insertTeXBlock(this.state),
   });
 };

 _clear()
 {
   const emptyState = ContentState.createFromText('');
   const editorState = EditorState.push(this.state.editorState, emptyState);
   this.setState({liveTeXEdits: Map(), editorState: editorState});
 }

 _insertQuote(comment)
 {
   this.insertQuoteBlock("QuoteBlock", comment);
 }

 _insertQuoteBlock(type, comment)
 {
   const {editorState} = this.state;
   const contentState = editorState.getCurrentContent();
   const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {props: comment });
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   this.setState({
     editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
     },
     () => {setTimeout(() => this.focus(), 0); });
 }

 _blockIsActive(block)
 {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

	return block === blockType;
 }

 _inlineIsActive(style)
 {
    const currentStyle = this.state.editorState.getCurrentInlineStyle();

    if(currentStyle === undefined)
	  return false;

    return currentStyle.has(style);
 }

 _customBlockIsActive(block)
 {
    return false;
 }

 _handleChange(state)
 {
	this.setState({editorState: state});
 }

 // Get the JSON with the rawContent JS used to generate the editor's content.
 _getRawContentJSON(editorState)
 {
	//this.state.editorState.toJS();
	/*console.log(editorState);
    const contentState = editorState.getCurrentContent();
	const rawContent = convertToRaw(contentState);
	const rawContentJson = JSON.stringify(rawContent);

    return rawContentJson;*/
 }

 _handleKeyCommand(command)
 {
   const {editorState} = this.state;
   const newState = RichUtils.handleKeyCommand(editorState, command);

   if (newState)
   {
		this.onChange(newState);
		return true;
    }

   return false;
 }

 customRenderFn(contentBlock)
 {
	const type = contentBlock.getType();
    const text = contentBlock.getText();

	if (text === 'media') {
     return {
       component: Media,
       editable: false,
     };
    }

    if (text === 'QuoteBlock') {
     return {
       component: QuoteBlockWrapper,
       editable: false,
     };
    }

    if (type === 'atomic') {
      return {
         component: TeXBlock,
         editable: false,
         props: {
           onStartEdit: (blockKey) => {
              var {liveTeXEdits} = this.state;
              this.setState({liveTeXEdits: liveTeXEdits.set(blockKey, true)});
           },
           onFinishEdit: (blockKey, newContentState) => {
              var {liveTeXEdits} = this.state;
              this.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey),
                editorState:EditorState.createWithContent(newContentState),
              });
           },
           onRemove: (blockKey) => this._removeTeX(blockKey),
         },
      };
    }

    return null;
 }

 _selectionIsCollapsed()
 {
   const {editorState} = this.state;
   const selection = editorState.getSelection();
   return selection.isCollapsed();
 }

 _toggleBlockType(blockType)
 {
   this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
 }

 _toggleInlineStyle(inlineStyle)
 {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,inlineStyle));
 }

 render() {

  const {editorState} = this.state;

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor Editor';
  const contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
	if (contentState.getBlockMap().first().getType() !== 'unstyled') {
	  className += ' RichEditor-hidePlaceholder Editor';
    }
  }

  return (
  <div style={{'height': '100%'}}>
    <EditorControls
	 editorState={editorState}
	 editorStyles={this.editorStyles}
	 onToggleBlock={this.toggleBlockType}
	 onToggleInline={this.toggleInlineStyle}
     selectionCollapsed={this.selectionIsCollapsed}
	 blockIsActive={this.blockIsActive}
     inlineIsActive={this.inlineIsActive}
     customBlockIsActive={this.customBlockIsActive}
     editor={this}
	/>
	<div className={className} onClick={this.focus}>
	   <Editor
		   blockStyleFn={getBlockStyle}
		   blockRendererFn={this.customRenderFn.bind(this)}
		   blockRenderMap={extendedBlockRenderMap}
		   editorState={editorState}
		   handleKeyCommand={this.handleKeyCommand}
		   onChange={this.onChange}
		   ref="editor"
		   spellCheck={false}
		   readOnly={this.state.liveTeXEdits.count()}
	   />
	</div>

  </div>
  );
 }
}

export default EditorComponent;

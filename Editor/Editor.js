import React from 'react';
import Draft from 'draft-js';
import { Map } from 'immutable';
import 'katex/dist/katex.css';
import insertTeXBlock from './TextElements/Latex/insertTeXBlock';
import removeTeXBlock from './TextElements/Latex/removeTeXBlock';
import TeXBlock from './TextElements/Latex/TeXBlock';
import Spoiler from './TextElements/Spoiler/SpoilerWrapper';
import Media from './TextElements/Media/Media';
import Link from './TextElements/Link/Link';
import editorStyles from './EditorStyles';
import QuoteBlockWrapper from './TextElements/QuoteBlock/QuoteBlockWrapper';
import EditorControls from './Controls';

import './css/Draft.css';
import './css/Editor.css';

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

const blockRenderMap = Map({ SPOILER: { element: Spoiler }, Latex: { element: TeXBlock } });
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {

  let blockStyle = null;

  switch (block.getType()) {
    case 'blockquote':
      blockStyle = 'Blockquote';
      break;
    case 'code-block':
      blockStyle = 'Code';
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

  static filterStyle(listToFilter, filter) {
    const filtered = listToFilter.filter(e =>
      filter.indexOf(e.style) !== -1);

    return filtered;
  }

  constructor(props) {

    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: (contentBlock, callback, contentState) =>
          findLinkEntities(contentBlock, callback, contentState),
        component: Link,
      },
      {
        strategy: (contentBlock, callback, contentState) =>
          findSpoilerEntities(contentBlock, callback, contentState),
        component: Spoiler,
      },
    ]);

    const { initialState } = this.props;

    let initalStateEditor;

    if (initialState == null) {
      initalStateEditor = EditorState.createEmpty(decorator);
    } else {
      const contentState = convertFromRaw(JSON.parse(initialState));
      initalStateEditor = EditorState.createWithContent(contentState, decorator);
    }

    this.filterStyles = this.props.filterStyles === undefined ? null : this.props.filterStyles;
    this.state = { liveTeXEdits: Map(), editorState: initalStateEditor };
    this.focus = () => this.editor.focus();
    this.onChange = state => this.handleChangeFn(state);
    this.handleKeyCommand = command => this.handleKeyCommandFn(command);
    this.toggleBlockType = type => this.toggleBlockTypeFn(type);
    this.toggleInlineStyle = style => this.toggleInlineStyleFn(style);
    this.selectionIsCollapsed = () => this.selectionIsCollapsedFn();
    this.getCurrentContent = () => this.state.editorState.getCurrentContent();
    this.getContent = () => this.getContentFn();
    this.blockIsActive = block => this.blockIsActiveFn(block);
    this.inlineIsActive = style => this.inlineIsActiveFn(style);
    this.customBlockIsActive = false;
    this.clear = () => this.clearFn();
    this.insertQuote = comment => this.insertQuoteFn(comment);
    this.insertQuoteBlock = (type, content, author) => this
      .insertQuoteFnBlock(type, content, author);
    this.insertTex = () => this.insertTexFn();
    this.removeTex = blockKey => this.removeTeXFn(blockKey);

    this.editorStyles = null;

    // If the user has defined which styles to whitelist, use only those.
    // Otherwise use all of the styles.
    if (this.filterStyles === null) {
      this.editorStyles = editorStyles;
    } else {
      this.editorStyles = this.filterWhiteListedStyles(editorStyles, this.filterStyles);
    }

  }

  getContentFn = () => {
    const currentContent = this.getCurrentContent();
    return convertToRaw(currentContent);
  }

  filterWhiteListedStyles(editorStyles, allowedStyles) {
    const filteredStyles = {
      BLOCK_TYPES: this.filterStyle(editorStyles.BLOCK_TYPES, allowedStyles),
      INLINE_STYLES: this.filterStyle(editorStyles.INLINE_STYLES, allowedStyles),
      CUSTOM_STYLES: this.filterStyle(editorStyles.CUSTOM_STYLES, allowedStyles)
    }

    return filteredStyles;
  }

  removeTeXFn = (blockKey) => {
    const { editorState, liveTeXEdits } = this.state;
    this.setState({
      liveTeXEdits: liveTeXEdits.remove(blockKey),
      editorState: removeTeXBlock(editorState, blockKey),
    });
  };

  insertTexFn = () => {
    this.setState({
      liveTeXEdits: Map(),
      editorState: insertTeXBlock(this.state),
    });
  };

  clearFn() {
    const emptyState = ContentState.createFromText('');
    const editorState = EditorState.push(this.state.editorState, emptyState);
    this.setState({ liveTeXEdits: Map(), editorState });
  }

  insertQuoteFn(comment) {
    this.insertQuoteBlock('QuoteBlock', comment);
  }

  insertQuoteFnBlock(type, comment) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', { props: comment });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
      },
      () => { setTimeout(() => this.focus(), 0); }
    );
  }

  blockIsActiveFn(block) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return block === blockType;
  }

  inlineIsActiveFn(style) {
    const currentStyle = this.state.editorState.getCurrentInlineStyle();

    if (currentStyle === undefined) { return false; }

    return currentStyle.has(style);
  }

  /*
  static customBlockIsActiveFn(block) {
    return false;
  } */

  handleChangeFn(state) {
    this.setState({ editorState: state });
  }

  handleKeyCommandFn(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return true;
    }

    return false;
  }

  customRenderFn(contentBlock) {
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
            const { liveTeXEdits } = this.state;
            this.setState({ liveTeXEdits: liveTeXEdits.set(blockKey, true) });
          },
          onFinishEdit: (blockKey, newContentState) => {
            const { liveTeXEdits } = this.state;
            this.setState({
              liveTeXEdits: liveTeXEdits.remove(blockKey),
              editorState: EditorState.createWithContent(newContentState),
            });
          },
          onRemove: blockKey => this.removeTeXFn(blockKey),
        },
      };
    }

    return null;
  }

  selectionIsCollapsedFn() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    return selection.isCollapsed();
  }

  toggleBlockTypeFn(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyleFn(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {

    const { editorState } = this.state;

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
      <div style={{ height: '100%' }}>
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
            ref={(e) => { this.editor = e; }}
            spellCheck={false}
            readOnly={this.state.liveTeXEdits.count()}
          />
        </div>

      </div>
    );
  }
}

export default EditorComponent;

import React, { Component } from 'react';
import StyleButton from './StyleButton';
import URLInput from './URLInput';
import './css/Controls.css';

class EditorControls extends Component {

  constructor(props) {

    super(props);

    /*
  const { editorState } = props;
  const currentEditorStyle = editorState.getCurrentInlineStyle();
      const selection = editorState.getSelection();
      const blockTypeEditor = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    */

    this.state = {
      showURLInput: false,
      urlValue: '',
      urlType: ''/* ,
  currentStyle: currentEditorStyle,
      showColorPicker: false,
      colorValue: ''
  blockType: blockTypeEditor, */
    };

    this.sendPost = this.props.sendPost;
    this.editor = this.props.editor;
    this.editorStyles = this.props.editorStyles;
    this.confirmUrl = this.confirmUrlFn.bind(this);
    this.cancelUrlFn = this.cancelUrlFn.bind(this);
    this.selectionIsCollapsed = this.props.selectionCollapsed;
    this.onURLChange = e => this.onUrlChange(e);
    this.blockIsActive = this.props.blockIsActive;
    this.inlineIsActive = this.props.inlineIsActive;
    this.customBlockIsActive = this.props.customBlockIsActive;
    this.customBlockToggleFn = this.customBlockToggleFn.bind(this);
    this.getInput = this.getInput.bind(this);
    this.findStyleObjectByName = this.findStyleObjectByName.bind(this);
  }

  onUrlChange(event) {
    this.setState({ urlValue: event.target.value });
  }

  getInput(type) {
    this.setState({ showURLInput: true, urlType: type });
  }

  confirmUrlFn(e) {
    e.preventDefault();

    const styleObject = this.findStyleObjectByName(this.state.urlType);

    if (styleObject.toggleFn == null) { return; }

    styleObject.toggleFn(this.editor, this.state.urlType, this.state.urlValue);
    this.setState({ showURLInput: false, urlValue: '', urlType: '' });
  }

  cancelUrlFn() {
    this.setState({ showURLInput: false, urlValue: '', urlType: '' });
  }

  customBlockToggleFn(blockName) {

    const styleObject = this.findStyleObjectByName(blockName);

    if (styleObject.toggleFn === null) { return; }

    if (styleObject.requiresSelection && this.editor.selectionIsCollapsed()) { return; }

    if (styleObject.requiresInput) {
      this.getInput(styleObject.label);
      return;
    }

    styleObject.toggleFn(this.editor);
  }

  findStyleObjectByName(name) {
    const customStyles = this.editorStyles.CUSTOM_STYLES;
    const matches = customStyles.filter(style => (style.label === name || style.style === name));
    return matches[0];
  }

  render() {

    if (this.state.showURLInput) {
      return (
        <div className="EditorControls">
          <div className="RichEditor-controls">
            <URLInput
              changeFn={this.onURLChange}
              urlValue={this.state.urlValue}
              cancelFn={this.cancelUrlFn}
              confirmFn={this.confirmUrl}
              type={this.state.urlType}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="EditorControls">

        <div className="RichEditor-controls">
          {this.editorStyles.INLINE_STYLES.map(type =>
            (<StyleButton
              key={type.label}
              activeFn={this.inlineIsActive.bind(type.style)}
              label={type.label}
              onToggle={this.props.onToggleInline}
              style={type.style}
              icon={type.icon}
            />))}
          {this.editorStyles.BLOCK_TYPES.map(type =>
            (<StyleButton
              key={type.label}
              activeFn={this.blockIsActive.bind(type.style)}
              label={type.label}
              onToggle={this.props.onToggleBlock}
              style={type.style}
              icon={type.icon}
            />))}
          {this.editorStyles.CUSTOM_STYLES.map(type =>
            (<StyleButton
              key={type.label}
              activeFn={this.customBlockIsActive}
              label={type.label}
              onToggle={this.customBlockToggleFn}
              style={type.style}
              icon={type.icon}
            />))}
        </div>
      </div>
    );
  }
};

export default EditorControls;

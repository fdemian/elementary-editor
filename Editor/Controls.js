import React, { Component } from 'react';
import StyleButton from './StyleButton';
import URLInput from './URLInput';
import './css/Controls.css';

class EditorControls extends Component {

  constructor(props) {

    super(props);

    const { editorState } = props;
    const _currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const _blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    this.state = {
      currentStyle: _currentStyle,
      blockType: _blockType,
      showURLInput: false,
      urlValue: '',
      urlType: '',
      showColorPicker: false,
      colorValue: ''
    };

    this.sendPost = this.props.sendPost;
    this.editor = this.props.editor;
    this.editorStyles = this.props.editorStyles;
    this.confirmUrl = this._confirmUrl.bind(this);
    this.cancelUrlFn = this._cancelUrl.bind(this);
    this.selectionIsCollapsed = this.props.selectionCollapsed;
    this.onURLChange = e => this._onUrlChange(e);
    this.blockIsActive = this.props.blockIsActive;
    this.inlineIsActive = this.props.inlineIsActive;
    this.customBlockIsActive = this.props.customBlockIsActive;
    this.customBlockToggleFn = this._customBlockToggleFn.bind(this);
    this.getInput = this._getInput.bind(this);
    this.findStyleObjectByName = this._findStyleObjectByName.bind(this);
  }


  _onUrlChange(event, newState) {
    this.setState({ urlValue: event.target.value });
  }

  _findStyleObjectByName(name) {
    const customStyles = this.editorStyles.CUSTOM_STYLES;
    const matches = customStyles.filter(style => (style.label === name || style.style === name));
    return matches[0];
  }

  _customBlockToggleFn(blockName) {

    const styleObject = this.findStyleObjectByName(blockName);

    if (styleObject.toggleFn === null) { return; }

    if (styleObject.requiresSelection && this.editor.selectionIsCollapsed()) { return; }

    if (styleObject.requiresInput) {
      this.getInput(styleObject.label);
      return;
    }

    styleObject.toggleFn(this.editor);
  }

  _cancelUrl() {
    this.setState({ showURLInput: false, urlValue: '', urlType: '' });
  }

  _confirmUrl(e) {
    e.preventDefault();

    const styleObject = this.findStyleObjectByName(this.state.urlType);

    if (styleObject.toggleFn == null) { return; }

    styleObject.toggleFn(this.editor, this.state.urlType, this.state.urlValue);
    this.setState({ showURLInput: false, urlValue: '', urlType: '' });
  }

  _getInput(type) {
    this.setState({ showURLInput: true, urlType: type });
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

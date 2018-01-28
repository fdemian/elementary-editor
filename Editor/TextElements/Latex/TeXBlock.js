/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import katex from 'katex';
import React from 'react';
import { Button, Input } from 'antd';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck
} from '@fortawesome/fontawesome-free-solid';

const { TextArea } = Input;

const EditorButtons = ({ invalid, removeFn, saveFn }) => {

  if (invalid) {
    return (
      <Button.Group size="large" style={{ marginLeft: '40%' }}>
        <Button type="danger" onClick={removeFn}>
          <FontAwesomeIcon name={faTimes} size="lg" />
          &nbsp; Remove
        </Button>
        <Button disabled>
          Invalid TeX
        </Button>
      </Button.Group>
    );
  }
  return (
    <Button.Group size="large" style={{ marginLeft: '40%' }}>
      <Button type="danger" onClick={removeFn}>
        <FontAwesomeIcon icon={faTimes} />
        &nbsp; Remove
      </Button>
      <Button type="primary" onClick={saveFn}>
        Done &nbsp;
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </Button.Group>
  );
}

class KatexOutput extends React.Component {

  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  update() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      katex.render(
        this.props.content,
        this.refs.container,
        { displayMode: true }
      );
    }, 0);
  }

  render() {
    return <div ref="container" onClick={this.props.onClick} />;
  }
}

export default class TeXBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };

    this.onClick = () => {
      if (this.state.editMode) {
        return;
      }

      this.setState({
        editMode: true,
        texValue: this.getValue(),
      }, () => {
        this.startEdit();
      });
    };

    this.onValueChange = (evt) => {
      const { value } = evt.target;
      let invalid = false;
      try {
		/* eslint-disable */
        katex.__parse(value);
		/* eslint-enable */
      } catch (e) {
        invalid = true;
      } finally {
        this.setState({
          invalidTeX: invalid,
          texValue: value,
        });
      }
    };

    this.save = () => {
      const entityKey = this.props.block.getEntityAt(0);
	  const { contentState } = this.props;
      const newContentState = contentState.mergeEntityData(entityKey,
            { content: this.state.texValue }
	  );
      this.setState({
        invalidTeX: false,
        editMode: false,
        texValue: null,
      }, this.finishEdit.bind(this, newContentState));
    };

    this.remove = () => {
      this.props.blockProps.onRemove(this.props.block.getKey());
    };
    this.startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this.finishEdit = (newContentState) => {
      this.props.blockProps.onFinishEdit(this.props.block.getKey(), newContentState);
    };
  }

  getValue() {
    return this.props.contentState
      .getEntity(this.props.block.getEntityAt(0))
      .getData().content;
  }

  render() {

    let texContent = null;

    if (this.state.editMode) {
      texContent = (this.state.invalidTeX ? '' : this.state.texValue);
    } else {
      texContent = this.getValue();
    }

    let className = 'TeXEditor-tex';
    if (this.state.editMode) {
      className += ' TeXEditor-activeTeX';
    }

    let editPanel = null;
    if (this.state.editMode) {

      editPanel =
        (<div>

          <TextArea
            rows={2}
            style={{ width: '20%', marginLeft: '40%' }}
            onChange={this.onValueChange}
            value={this.state.texValue}
          />

          <div>
            <EditorButtons
              invalid={this.state.invalidTeX}
              removeFn={this.remove}
              saveFn={this.save}
            />
          </div>

         </div>);
    }

    return (
      <div className={className}>
        <KatexOutput content={texContent} onClick={this.onClick} />
        {editPanel}
      </div>
    );
  }
}

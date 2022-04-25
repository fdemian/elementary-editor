import React from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import './css/Editor.css';

const DEFAULT_PLACEHOLDER = "Enter URL";

const URLInput = (props) => {

  const {
    changeFn,
    urlValue,
    confirmFn,
    cancelFn,
    type,
    placeHolderText
  } = props;

  const placeholderStr = placeHolderText ? placeHolderText : DEFAULT_PLACEHOLDER;

  return (
  <>
    <span className="url-input-container">
      <Input
        className="url-input-editor"
        type="text"
        role="input"
        name='URL Input'
        aria-label="URL Input"
        onChange={changeFn}
        value={urlValue}
        placeholder={`${placeholderStr} (${type})`}
      />
    </span>

      <span className="url-input-buttons-container">
        <Button
          type="primary"
          onClick={cancelFn}
          className="cancel-url-button"
          data-testid="cancel-url-button"
        >
          <FontAwesomeIcon icon={faTimes} />
      </Button>
      <Button
        type='primary'
        onClick={confirmFn}
        data-testid="confirm-url-button"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </span>
  </>
  )
}

export default URLInput;

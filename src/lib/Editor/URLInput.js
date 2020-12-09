import React from 'react';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

const URLInput = ({ changeFn, urlValue, confirmFn, cancelFn, type }) => {
  const hintText = `Enter ${type.toLowerCase()} URL`;

  return (
  <>
    <span className="url-input-container">
      <Input
        type="text"
        role="input"
        name='URL input'
        onChange={changeFn}
        value={urlValue}
        placeholder={hintText}
        style={{ width: '400px', marginLeft: '40px', marginTop: '10px' }}
      />
    </span>

      <span style={{ marginLeft: "8px" }}>
        <Button
          type="primary"
          onClick={cancelFn}
          style={{ marginRight: "2px" }}
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

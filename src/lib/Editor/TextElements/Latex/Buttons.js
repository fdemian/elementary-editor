import React, {
  Suspense
} from 'react';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

const EditorButtons = ({ invalid, removeFn, saveFn }) => {
  if (invalid) {
    return (
    <Suspense fallback={<Spin />}>
      <Button.Group size='large' style={{ marginLeft: '40%' }}>
        <Button className="danger-btn" type='danger' onClick={removeFn}>
          <FontAwesomeIcon name={faTimes} size='lg' />
          &nbsp; Remove
        </Button>
        <Button disabled>
          Invalid TeX
        </Button>
      </Button.Group>
    </Suspense>
    )
  }

  return (
  <Suspense fallback={<Spin />}>
    <Button.Group
      size='large'
      style={{ marginLeft: '40%' }}
    >
      <Button
        type='danger'
        onClick={removeFn}
        className="edit-panel-remove-btn"
      >
        <FontAwesomeIcon icon={faTimes} />
        &nbsp; Remove
      </Button>
      <Button
        type='primary'
        onClick={saveFn}
        className="edit-panel-ok-btn"
      >
        Done &nbsp;
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </Button.Group>
  </Suspense>
  )
}

export default EditorButtons;

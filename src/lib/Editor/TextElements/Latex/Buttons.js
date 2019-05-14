import React from 'react'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

const EditorButtons = ({ invalid, removeFn, saveFn }) => {
  if (invalid) {
    return (
      <Button.Group size='large' style={{ marginLeft: '40%' }}>
        <Button type='danger' onClick={removeFn}>
          <FontAwesomeIcon name={faTimes} size='lg' />
          &nbsp; Remove
        </Button>
        <Button disabled>
          Invalid TeX
        </Button>
      </Button.Group>
    )
  }

  return (
    <Button.Group size='large' style={{ marginLeft: '40%' }}>
      <Button type='danger' onClick={removeFn}>
        <FontAwesomeIcon icon={faTimes} />
        &nbsp; Remove
      </Button>
      <Button type='primary' onClick={saveFn}>
        Done &nbsp;
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </Button.Group>
  )
}

export default EditorButtons

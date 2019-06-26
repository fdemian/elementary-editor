import React from 'react'
import { Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './css/StyleButton.css'

const StyleButton = (props) => {
  
  const {
   onToggle,
   activeFn,
   icon,
   style,
   label
  } = props

  const isActive = activeFn(style);
  const iconColor = isActive ? 'black' : 'gainsboro';
  const iconStyle = { color: iconColor, marginTop: '6px' };

  const toggleFn = (e) => {
   e.preventDefault();
   onToggle(style);
  }

  return (
  <Tooltip placement='bottom' title={label} >
    <button
      className='StyleButton'
      onClick={toggleFn}
     >
      <FontAwesomeIcon
        size='lg'
        style={iconStyle}
        icon={icon}
      />
    </button>
  </Tooltip>
  )
}

export default StyleButton

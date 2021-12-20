import React from 'react';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/StyleButton.css'

const StyleButton = (props) => {
  const { onToggle, getInput, activeFn, icon, style, label, editorState } = props;

  const isActive = activeFn(style);
  const iconColor = isActive ? "black" : "gainsboro";
  const iconStyle = { color: iconColor, marginTop: "6px" };

  const toggleFn = (e) => {
    e.preventDefault();
    onToggle(style, editorState);
  };

  return (
    <Tooltip placement="bottom" title={label}>
      <button
        className="StyleButton"
        onClick={(blockName) => toggleFn(blockName, getInput)}
      >
        <FontAwesomeIcon size="lg" style={iconStyle} icon={icon} />
      </button>
    </Tooltip>
  );
};

export default StyleButton;

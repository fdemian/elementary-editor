import React from 'react';
import './Link.css';

const RenderLink = (props) => {
  const { src, text } = props;

  return(
  <a href={src} rel="nofollow">
    {text}
  </a>
  );
};

export default RenderLink;

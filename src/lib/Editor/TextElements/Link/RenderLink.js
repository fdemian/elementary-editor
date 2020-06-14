import React from "react";

const RenderLink = ({ url, text }) => (
  <a href={url} rel="nofollow">
    {text}
  </a>
);

export default RenderLink;

import React from "react";
import RenderLink from "./RenderLink";

const Link = (props) => {
  const { contentState, entityKey } = props;
  const entityInstance = contentState.getEntity(entityKey);
  const { url } = entityInstance.getData();

  return <RenderLink url={url} text={props.children} />;
};

export default Link;

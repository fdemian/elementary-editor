import React from "react";
import QuoteBlock from "./QuoteBlock";

const QuoteBlockWrapper = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const entityData = entity.getData();
  const comment = entityData.props ? entityData.props : entityData;
  return <QuoteBlock comment={comment} />;
};

export default QuoteBlockWrapper;

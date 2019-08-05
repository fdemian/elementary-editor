import React from 'react';
import ReactPlayer from 'react-player';

const Media = (props) => {

  let src;
  const { contentState, block } = props;

  if(contentState !== null && contentState !== undefined) {
    const entity = contentState.getEntity(block.getEntityAt(0))
    src = entity.getData().src;

    if(entity.getType() === "Image")
      return <img src={src} />;    
  }
  else {
    src = props.src;
  }

  return(<ReactPlayer url={src} playing={false} />);
}

export default Media;

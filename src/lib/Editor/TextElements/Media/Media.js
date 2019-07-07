import React from 'react';
import ReactPlayer from 'react-player';

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()

  return(<ReactPlayer url={src} playing={false} />);
}

export default Media;

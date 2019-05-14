import React from 'react'
import EmbededVideo from './EmbededVideo'

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()

  let media

  if (type === 'Audio') {
    media = <Audio src={src} />
  } else if (type === 'Image') {
    media = <Image src={src} alt='' />
  } else if (type === 'Video') {
    media = <EmbededVideo src={src} />
  }

  return media
}

// TODO: add caption tracks to the elements.
/* eslint-disable */
const Audio = props => <audio controls src={props.src} />;
const Image = props => <img src={props.src} alt="" />;
/* eslint-enable */

export default Media

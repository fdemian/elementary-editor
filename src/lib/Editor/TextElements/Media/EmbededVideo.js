import React from 'react'
import VideoProviders from './EmbedVideoProviders'

function getEmbededURL (url) {
  let embededURL = ''

  const provider = VideoProviders.find(p => url.indexOf(p.name) !== -1)

  if (provider !== undefined && provider !== null) { embededURL = provider.convertURL(url) }

  return embededURL
}

/* eslint-disable */
const HTML5Video = ({ source }) => <video width="420" height="345" controls src={source} />;
/* eslint-enable */

const EmbededVideo = ({ src }) => {
  if (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg')) { return <HTML5Video source={src} /> }

  const embedURL = getEmbededURL(src)

  return (
    <iframe
      title={embedURL}
      src={embedURL}
      width='420'
      height='345'
      frameBorder='0'
      allowFullScreen
    />
  )
}

export default EmbededVideo

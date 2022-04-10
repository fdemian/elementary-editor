import React from "react";
import Media from "../lib/Editor/TextElements/Media/Media";
//import video from './video.mp4';

const video = "https://www.youtube.com/watch?v=tCO4i2t-Aso";

const videoProps = { src: video };
const props = {
  src: video,
  block: {
    getEntityAt: (n) => {},
  },
  contentState: {
    getEntity: (e) => {
      return {
        getType: () => "Video",
        getData: () => videoProps,
      };
    },
  },
  entityKey: 1,
};


export const VideoMedia = () => {
  return <Media {...props} />;
}

export default {
  title: 'Elements/Video',
  component: VideoMedia,
  argTypes: {},
};

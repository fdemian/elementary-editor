import React from "react";
import Media from "../lib/Editor/TextElements/Media/Media";
import plato from "./plato.jpg";

const imgProps = { src: plato };
const props = {
  block: {
    getEntityAt: (n) => {}
  },
  contentState: {
    getEntity: (e) => {
      return {
        getType: () => "Image",
        getData: () => imgProps
      };
    }
  },
  entityKey: 1
};

export const ImageMedia = () => {
  return <Media {...props} />;
};

export default {
  title: "Elements/Image",
  component: ImageMedia,
  argTypes: {}
};

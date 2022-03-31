import React, { useRef, useState } from "react";
import Link from "../lib/Editor/TextElements/Link/RenderLink";

export const LinkStory = () => {
  return <Link src="www.url.com" text="A link" />;
}

export default {
  title: 'Elements/Link',
  component: LinkStory,
  argTypes: {},
};

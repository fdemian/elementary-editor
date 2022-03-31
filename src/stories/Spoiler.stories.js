import React, { useRef, useState } from "react";
import Spoiler from "../lib/Editor/TextElements/Spoiler/Spoiler";

export const SpoilerStory = () => {
  return <Spoiler text="Spoiled text." />;
}

export default {
  title: 'Elements/Spoiler',
  component: SpoilerStory,
  argTypes: {},
};

import React from "react";
import LatexBlock from "../lib/Editor/TextElements/Latex/LatexBlock";

const content = 'f(x)';
export const LatexContent = () => <LatexBlock content={content} />;

export default {
  title: 'Elements/Latex',
  component: LatexContent,
  argTypes: {},
};

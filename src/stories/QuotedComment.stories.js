import React, { useRef, useState } from "react";
import QuoteBlock from "../lib/Editor/TextElements/QuoteBlock/QuoteBlock";

const commentContent = {
  blocks: [
    {
      key: "1bkrq",
      text: "asdfdsfdasfdsaf",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 15, style: "BOLD" }],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const comment = {
  content: JSON.stringify(commentContent),
  author: "@user1",
  authorLink: "/users/1/user1",
  cite: "#comment-1"
};


export const QuotedComment= () => <QuoteBlock comment={comment} />;

export default {
  title: 'Elements/QuoteBlock',
  component: QuotedComment,
  argTypes: {},
};

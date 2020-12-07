import React from "react";
import QuoteBlock from "./QuoteBlock";
import QuoteBlockWrapper from "./QuoteBlockWrapper";

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

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
const commentProps = {
  comment: {
    content: JSON.stringify(commentContent),
    author: "user1",
  },
};

describe("<QuoteBlock />", () => {

  it("<QuoteBlock />", () => {
    const { getByText, getByTestId } = render(<QuoteBlock {...commentProps} />);

    const textContents = getByText(commentContent.blocks[0].text);
    const blockquoteElement = getByTestId("blockquote-element");

    expect(textContents).toBeInTheDocument();
    expect(blockquoteElement).toHaveAttribute("cite", commentProps.author);
  });

  it("<QuoteBlockWrapper />", () => {
    const wrapperProps = {
      contentState: {
        getEntity: (e) => {
          return {
            getData: () => {
              return { props: commentProps.comment };
            },
          };
        },
      },
      block: {
        getEntityAt: (n) => n,
      },
    };

    const { getByText, getByTestId } = render(<QuoteBlockWrapper {...wrapperProps} />);

    const textContents = getByText(commentContent.blocks[0].text);
    const blockquoteElement = getByTestId("blockquote-element");

    expect(textContents).toBeInTheDocument();
    expect(blockquoteElement).toHaveAttribute("cite", commentProps.author);
  });

});

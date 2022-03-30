import React from "react";
import QuoteBlock from "./QuoteBlock";
import QuoteBlockWrapper from "./QuoteBlockWrapper";

import { render, screen } from '@testing-library/react';
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

const comment = {
  content: JSON.stringify(commentContent),
  author: "user1",
  authorLink: "/users/1/user1",
  cite: "#comment-1"
};

describe("<QuoteBlock />", () => {

  it("<QuoteBlock />", () => {
    render(<QuoteBlock comment={comment} />);
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByTestId("blockquote-element")).toHaveAttribute("cite", comment.cite);
    expect(screen.getByRole("link", { name: comment.author })).toHaveAttribute('href', comment.authorLink);
    expect(screen.getByText(commentContent.blocks[0].text)).toBeInTheDocument();
  });

  it("<QuoteBlockWrapper />", () => {
    const wrapperProps = {
      contentState: {
        getEntity: (e) => {
          return {
            getData: () => {
              return { props: comment };
            },
          };
        },
      },
      block: {
        getEntityAt: (n) => n,
      },
    };

    render(<QuoteBlockWrapper {...wrapperProps} />);

    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByTestId("blockquote-element")).toHaveAttribute("cite", comment.cite);
    expect(screen.getByRole("link", { name: comment.author })).toHaveAttribute('href', comment.authorLink);
    expect(screen.getByText(commentContent.blocks[0].text)).toBeInTheDocument();
  });

});

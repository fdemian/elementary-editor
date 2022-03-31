import React from "react";
import DraftRenderer from "./DraftRenderer";
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const contentStateDesc = {
  blocks: [
    {
      key: "ags7e",
      text: "Text",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const invalidContentState = {
  blocsks: [
    {
      keyf: "ags7e",
      text: "Text",
      type: "unstyled",
      depath: 0,
      inlineStyleRanges: null,
      entityRanges: null,
      data: {},
    },
  ],
  entityMap: {},
};

describe("<DraftRenderer />", () => {

  it("Correctly render some draft-js state.", () => {
    render(<DraftRenderer raw={contentStateDesc} />);
    const textElement = screen.getByText(contentStateDesc.blocks[0].text);
    expect(textElement).toBeInTheDocument();
  });

  it("Render invalid state.", () => {
    render(<DraftRenderer raw={invalidContentState} />);
    const textInvalidRender = screen.getByText("Nothing to render.");
    expect(textInvalidRender).toBeInTheDocument();
  });

  it("Render state without raw data.", () => {
    render(<DraftRenderer raw={null} />);
    const textInvalidRender = screen.getByText("Nothing to render.");
    expect(textInvalidRender).toBeInTheDocument();
  });

 /*
  *  Renders inline elements and blocks.
  */
  it("Render inline elements and blocks.", () => {
    const componentsToRender = [
      {
        htmlTag: "strong",
        draftState: {
          blocks: [
            {
              key: "e06sa",
              text: "Test",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [{ offset: 0, length: 4, style: "BOLD" }],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "em", // Italic
        draftState: {
          blocks: [
            {
              key: "e06sa",
              text: "Italic",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [{ offset: 0, length: 6, style: "ITALIC" }],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "u", // underline
        draftState: {
          blocks: [
            {
              key: "e06sa",
              text: "Underline",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [{ offset: 0, length: 9, style: "UNDERLINE" }],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "h2",
        draftState: {
          blocks: [
            {
              key: "edmlk",
              text: "Header Text",
              type: "header-two",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "pre",
        draftState: {
          blocks: [
            {
              key: "edmlk",
              text: "function()",
              type: "code-block",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "blockquote",
        draftState: {
          blocks: [
            {
              key: "edmlk",
              text: "Quoted text",
              type: "blockquote",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "ul",
        draftState: {
          blocks: [
            {
              key: "edmlk",
              text: "one",
              type: "unordered-list-item",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: "e7pb8",
              text: "two",
              type: "unordered-list-item",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            }
          ],
          entityMap: {},
        },
      },
      {
        htmlTag: "ol",
        draftState: {
          blocks: [
            {
              key: "edmlk",
              text: "one",
              type: "ordered-list-item",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: "e7pb8",
              text: "two",
              type: "ordered-list-item",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            }
          ],
          entityMap: {},
        },
      }
    ];

    for (const element of componentsToRender) {
      const { container } = render(<DraftRenderer raw={element.draftState} />);
      const expectedElement = container.querySelector(element.htmlTag);
      expect(expectedElement).toBeInTheDocument();
    }
  });

  it("Render <img> element.", () => {
    const imgUrl = "https://www.url.com/image.jpg";
    const imgState = {
      blocks: [
        {
          key: "edmlk",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "epdm5",
          text: "Image",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 5, key: 0 }],
          data: {},
        },
        {
          key: "4kijn",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        "0": {
          type: "Image",
          mutability: "IMMUTABLE",
          data: { src: imgUrl }
        }
      }
    };
    const { container } = render(<DraftRenderer raw={imgState} />);
    const imgElement = container.querySelector("img");

    expect(imgElement.src).toStrictEqual(imgUrl);
  });

  it("Render Latex element.", () => {
    const latexState = {
      blocks: [
        {
          key: "edmlk",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "epdm5",
          text: "LATEX",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 5, key: 0 }],
          data: {},
        },
        {
          key: "4kijn",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        "0": {
          type: "LATEX",
          mutability: "IMMUTABLE",
          data: { content: "f(x) = ... " }
        },
      },
    };

    const { getByTestId } = render(<DraftRenderer raw={latexState} />);
    const textElem = getByTestId('latex-block');

    expect(textElem).toBeInTheDocument();
  });


  // TODO: find where is the href prop.
  it("Render <Link> element.", () => {
    const linkUrl = "http://www.url.com";
    const linkState = {
      blocks: [
        {
          key: "c7tkv",
          text: "Link",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 4, key: 0 }],
          data: {},
        },
      ],
      entityMap: {
        "0": { type: "LINK", mutability: "MUTABLE", data: { url: linkUrl } },
      },
    };

    const { getByText ,  } = render(<DraftRenderer raw={linkState} />);

    const linkElement = getByText("Link");
    expect(linkElement).toHaveAttribute("rel", "nofollow");
  });

  it("Render <Spoiler> element.", () => {
    const spoilerText = "Spoiled text.";
    const spoilerState = {
      blocks: [
        {
          key: "9tq7j",
          text: spoilerText,
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [{
            offset: 0,
            length: 13,
            style: "SPOILER"
          }],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    };

    render(<DraftRenderer raw={spoilerState} />);

    expect(screen.getByText(spoilerText)).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveClass("Spoiler Concealed");
  });

  it("Render <Video> element.", async () => {
    const videoSrc = "www.url.com/video.mp4";
    const videoState = {
      blocks: [
        {
          key: "1e7ve",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "9t06p",
          text: "Video",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 5, key: 0 }],
          data: {},
        },
        {
          key: "9q4nr",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        "0": {
          type: "Video",
          mutability: "IMMUTABLE",
          data: { src: "www.url.com/video.mp4" },
        },
      },
    };
    render(<DraftRenderer raw={videoState} />);

    await waitFor(() => {
      const rpl = screen.getByTestId("react-player");
      expect(rpl).toBeInTheDocument();
    });

  })


});

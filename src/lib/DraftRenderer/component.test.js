import React from "react";
import { shallow, render } from "enzyme";
import DraftRenderer from "./DraftRenderer";
import ReactPlayer from "react-player";

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
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

describe("<DraftRenderer />", () => {
  beforeEach(() => {
    const React = jest.requireActual("react");
    React.Suspense = ({ children }) => children;
    return React;
  });

  it("Correctly render some draft-js state.", () => {
    const component = render(<DraftRenderer raw={contentStateDesc} />);
    expect(component.length).toStrictEqual(1);
  });

  it("Render inline elements.", () => {
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
    ];

    for (const element of componentsToRender) {
      const component = render(<DraftRenderer raw={element.draftState} />);
      const boldComponent = component.find(element.htmlTag);
      expect(boldComponent[0].name).toStrictEqual(element.htmlTag);
    }
  });

  it("Render blockquote element.", () => {
    const boldQuote = {
      blocks: [
        {
          key: "e06sa",
          text: "bold quote",
          type: "blockquote",
          depth: 0,
          inlineStyleRanges: [{ offset: 0, length: 10, style: "BOLD" }],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };

    const component = render(<DraftRenderer raw={boldQuote} />);
    const blockquote = component.find("blockquote");
    const bold = blockquote.find("strong");

    expect(blockquote.length).toStrictEqual(1);
    expect(bold.length).toStrictEqual(1);
  });

  it("Render unordered list.", () => {
    const ulState = {
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
          key: "d7pec",
          text: "two",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "ocg8",
          text: "three",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const component = render(<DraftRenderer raw={ulState} />);

    const ulElement = component.find("ul");
    const listElem = component.find("li");

    expect(ulElement.length).toStrictEqual(1);
    expect(listElem.length).toStrictEqual(3);
  });

  it("Render ordered list.", () => {
    const olState = {
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
          key: "cgpf",
          text: "two",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "2bkc3",
          text: "three",
          type: "ordered-list-item",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const component = render(<DraftRenderer raw={olState} />);

    const olElement = component.find("ol");
    const listElem = component.find("li");

    expect(olElement.length).toStrictEqual(1);
    expect(listElem.length).toStrictEqual(3);
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
          data: { src: "https://www.url.com/image.jpg" },
        },
      },
    };
    const component = render(<DraftRenderer raw={imgState} />);
    const imgElement = component.find("img");

    expect(imgElement.length).toStrictEqual(1);
    expect(imgElement[0]["attribs"]["src"]).toStrictEqual(imgUrl);
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
    const component = render(<DraftRenderer raw={linkState} />);
    const linkElement = component.find("a");

    expect(linkElement.length).toStrictEqual(1);
    expect(linkElement.text()).toStrictEqual("Link");
    expect(linkElement[0]["attribs"].rel).toStrictEqual("nofollow");
  });

  it("Render <Spoiler> element.", () => {
    const spoilerText = "spoiled text";
    const spoilerState = {
      blocks: [
        {
          key: "bgdnj",
          text: spoilerText,
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 12, key: 0 }],
          data: {},
        },
      ],
      entityMap: {
        "0": {
          type: "SPOILER",
          mutability: "IMMUTABLE",
          data: { text: spoilerText },
        },
      },
    };
    const component = render(<DraftRenderer raw={spoilerState} />);
    const textSpan = component.find("span");

    expect(textSpan.text()).toStrictEqual(spoilerText);
    expect(textSpan[0]["attribs"].class).toStrictEqual(`Spoiler Concealed`);
    expect(textSpan[0]["attribs"].role).toStrictEqual("presentation");
  });

  it("Render <Latex> element.", () => {
    //const spoilerText = "spoiled text";
    const latexState = {
      blocks: [
        {
          key: "5a36h",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "e6b3g",
          text: " ",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{ offset: 0, length: 1, key: 0 }],
          data: {},
        },
        {
          key: "75dr8",
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
          mutability: "Immutable",
          data: { content: "f(x) = ... " },
        },
      },
    };
    const component = render(<DraftRenderer raw={latexState} />);
    let span = component.find("span");

    expect(span[0]["attribs"].class).toStrictEqual("latex-block");
  });

  it("Render <Video> element.", () => {
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
    const component = shallow(<DraftRenderer raw={videoState} />);
    const videoElement = component.find(".video-element");

    expect(videoElement.length).toStrictEqual(1);
  });

  it("Rendering null state (show 'nothing to render' warning).", () => {
    const component = render(<DraftRenderer raw={null} />);
    const componentClass = component[0]["attribs"]["class"];
    const componentName = component[0]["name"];

    expect(componentClass).toStrictEqual("render-warning");
    expect(componentName).toStrictEqual("div");
    expect(component.text()).toStrictEqual("Nothing to render.");
  });

  it("Rendering invalid content state (show 'nothing to render' warning).", () => {
    const component = render(<DraftRenderer raw={invalidContentState} />);
    const componentClass = component[0]["attribs"]["class"];
    const componentName = component[0]["name"];

    expect(componentClass).toStrictEqual("render-warning");
    expect(componentName).toStrictEqual("div");
    expect(component.text()).toStrictEqual("Nothing to render.");
  });
});

import React from "react";
import Spoiler from "../Editor/TextElements/Spoiler/Spoiler";
import LatexBlock from "../Editor/TextElements/Latex/LatexBlock";
import Media from "../Editor/TextElements/Media/Media";
//import QuoteBlock from '../Editor/TextElements/QuoteBlock/QuoteBlock'
import RenderLink from "../Editor/TextElements/Link/RenderLink";

/* Style callbacks */
const styles = {
  code: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
  listItem: {
    float: "none",
  },
};

// Adds a <br /> after a block.
const addBreaklines = (children) => children.map((child) => [child, <br />]);

const renderers = {
  /* Inline Styles */
  inline: {
    BOLD: (children) => <strong>{children}</strong>,
    ITALIC: (children) => <em>{children}</em>,
    UNDERLINE: (children) => <u>{children}</u>,
  },

  /* Block Styles */
  blocks: {
    unstyled: (children) => children.map((child) => <p>{child}</p>),
    blockquote: (children) => (
      <blockquote key={1}>{addBreaklines(children)}</blockquote>
    ),
    "header-two": (children) => children.map((child) => <h2>{child}</h2>),
    "code-block": (children) => (
      <pre style={styles.codeBlock}>{addBreaklines(children)}</pre>
    ),
    "unordered-list-item": (children) => (
      <ul>
        {children.map((child) => (
          <li style={styles.listItem}>{child}</li>
        ))}
      </ul>
    ),
    "ordered-list-item": (children) => (
      <ol>
        {children.map((child) => (
          <li style={styles.listItem}>{child}</li>
        ))}
      </ol>
    ),
  },

  /* Entities */
  entities: {
    Image: (children, data) => (
      <div>
        <img src={data.src} alt="" />
      </div>
    ),
    LINK: (children, data) => <RenderLink src={data.url} text={children} />,
    LATEX: (children, data) => <LatexBlock content={data.content} />,
    SPOILER: (children) => <Spoiler text={children[0]} />,
    Video: (children, data) => (
      <div className="video-element">
        <Media src={data.src} />
      </div>
    ),
    /*QuoteBlock: (children, data) => <QuoteBlock comment={data.props} />*/
  },
};

export default renderers;

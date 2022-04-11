import React from "react";
import Renderer from "../../../DraftRenderer/DraftRenderer";
import "./QuoteBlock.css";

const QuoteBlock = ({ comment, altRenderers }) => {
  const commentProps = comment.author !== undefined ? comment: comment.content;
  const { content, author, authorLink, cite } = commentProps;

  const rawContent = JSON.parse(content);
  return(
  <figure>
    <figcaption>
      <a href={authorLink}>{author}</a>
      <cite><a href={cite}> says</a></cite>
    </figcaption>
    <blockquote
       cite={cite}
       data-testid="blockquote-element"
     >
       <Renderer
          raw={rawContent.content ?? rawContent}
          altRenderers={altRenderers ? altRenderers : null}
        />
    </blockquote>
  </figure>
  );

};

export default QuoteBlock;

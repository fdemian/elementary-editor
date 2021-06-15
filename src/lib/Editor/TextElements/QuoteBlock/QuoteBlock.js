import React from "react";
import Renderer from "../../../DraftRenderer/DraftRenderer";
import "./QuoteBlock.css";

const QuoteBlock = ({ comment }) => {
  const { content, author, authorLink, cite } = comment.content;
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
       <Renderer raw={rawContent.content ?? rawContent} />
    </blockquote>
  </figure>
  );

};

export default QuoteBlock;

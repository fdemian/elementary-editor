import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHighlighter = ({ children }) => {

  const fullText = children.map(e => e === undefined ? "" : e[1][0]).join("\n");

  return (
  <SyntaxHighlighter style={docco}>
    {fullText}
  </SyntaxHighlighter>
  );
}


export default CodeHighlighter;

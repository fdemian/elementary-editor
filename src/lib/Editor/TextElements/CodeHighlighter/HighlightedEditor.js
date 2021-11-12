import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHighlighter = ({ children }) => {
  const { contentState } = children.props;
  const plainText = contentState.getPlainText();
  return (
  <SyntaxHighlighter style={docco}>
    {plainText}
  </SyntaxHighlighter>
  );
}


export default CodeHighlighter;

import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const CodeBlock = ({children}) => {
  return <Paragraph code>{(children)}</Paragraph>;
}

export default CodeBlock;

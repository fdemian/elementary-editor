import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const CodeBlock = ({children}) => {
  return <Text code>{(children)}</Text>;
}

export default CodeBlock;

import React from 'react'
import redraft from 'redraft'
import renderers from './Renderers'

const RenderWarning = () => <div>Nothing to render.</div>;

const Renderer = ({ raw }) => {
  if (!raw) { return <RenderWarning /> }

  const rendered = redraft(raw, renderers);

  if (!rendered)
    return <RenderWarning />;

  return <div>{rendered}</div>;
}

export default Renderer;

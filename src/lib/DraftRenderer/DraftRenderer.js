import React from 'react';
import redraft from 'redraft';
import defaultRenderers from './Renderers';

const RenderWarning = () => (
  <div className="render-warning">Nothing to render.</div>
);

const Renderer = ({ raw, altRenderers }) => {
  if (!raw) return <RenderWarning />;

  let renderers = altRenderers ? altRenderers : defaultRenderers;
  const rendered = redraft(raw, renderers);

  if (!rendered) return <RenderWarning />;

  return <div>{rendered}</div>;
};

export default Renderer;

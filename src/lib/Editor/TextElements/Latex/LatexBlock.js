import React, {useEffect, useRef} from 'react';
import katex from 'katex';

const LatexBlock = (props) => {

  const timerRef = useRef();
  const latexRef = useRef();

  const update = () => {
    if(timerRef.current)
     clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      katex.render(
        props.content,
        latexRef.current,
        { displayMode: true }
      );
    }, 0)
  }

  useEffect(() => {
    update();

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  });

  return <span ref={latexRef} />;
}

export default LatexBlock

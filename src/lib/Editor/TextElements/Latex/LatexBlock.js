import React, {useEffect, useRef} from 'react';
import katex from 'katex';

const LatexBlock = (props) => {

  let timer = null;
  const latexRef = useRef();

  const update = () => {

    if(timer)
     clearTimeout(timer);

    timer = setTimeout(() => {
      katex.render(
        props.content,
        latexRef.current,
        { displayMode: true }
      );
    }, 0)
  }

  useEffect(() => {
    update()

    return () => {
      clearTimeout(timer);
      timer = null;
    }
  }, [props]);

  return <span ref={latexRef} />;
}

export default LatexBlock

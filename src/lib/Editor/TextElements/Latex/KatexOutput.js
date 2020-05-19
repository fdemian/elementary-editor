import React, {useEffect, useRef} from 'react';
import katex from 'katex';

const KatexOutput = (props) => {

  let timer = null;
  const outputRef = useRef();

  const update = () => {
    if(timer)
     clearTimeout(timer);

    timer = setTimeout(() => {
      katex.render(
       props.content,
       outputRef.current,
       { displayMode: true }
      )
    }, 0)
  }

  useEffect(() => {
    update()

    return () => {
      clearTimeout(timer);
      timer = null;
    }
  }, [props]);

  return (
  <div
    role='presentation'
    ref={outputRef}
    onClick={props.onClick}
  />
  );

}

export default KatexOutput;

import React, {useEffect, useRef} from 'react';
import katex from 'katex';

const KatexOutput = (props) => {

  const timerRef = useRef();
  const outputRef = useRef();

  const update = () => {

    if(timerRef.current)
     clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
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
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  });

  return (
  <div
    role='presentation'
    ref={outputRef}
    onClick={props.onClick}
  />
  );

}

export default KatexOutput;

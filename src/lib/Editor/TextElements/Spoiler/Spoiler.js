import React, {useState} from 'react';
import './Spoiler.css';

const Spoiler = (props) => {

  const [textStatus, setTextStatus] = useState('Concealed');
  const cssClass = `Spoiler ${textStatus}`;

  const changeStatus = () => {
   const newStatus = textStatus === '' ? 'Concealed' : ''
   setTextStatus({newStatus});
  };

  return (
  <span
    className={cssClass}
    onClick={changeStatus}
    role='presentation'
  >
    {props.text}
  </span>
  );
}

export default Spoiler

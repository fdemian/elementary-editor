import React from 'react';
import ReactDOM from 'react-dom';
import Spoiler from '../../Editor/TextElements/Spoiler/Spoiler';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const spoilerText = "link";
  
  ReactDOM.render(<Spoiler text={spoilerText} />, div);
});
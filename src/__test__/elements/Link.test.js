import React from 'react';
import ReactDOM from 'react-dom';
import Link from '../../Editor/TextElements/Link/RenderLink';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const linkSrc = "http://www.mypage.com"; 
  const linkText = "link";
   
  ReactDOM.render(<Link src={linkSrc} text={linkText} />, div);
});


/*
it('renders correctly', () => {
  const div = document.createElement('div');
  const linkSrc = "http://www.mypage.com"; 
  const linkText = "link";
  const link = <Link src={linkSrc} text={linkText} />;
  
});*/
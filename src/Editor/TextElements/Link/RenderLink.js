import React from 'react';

const RenderLink = ({url, text}) => {     
   return (
   <a href={url} rel="nofollow">
	{text}
   </a>
   );
};

export default RenderLink;
import React from 'react';
import {Entity} from 'draft-js';

const Link = (props) => {
   
   const {url} = Entity.get(props.entityKey).getData();
      
   return (
     <a href={url}>{props.children}</a>
   );
};

export default Link;
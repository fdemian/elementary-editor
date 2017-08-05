import React from 'react';
import RenderLink from './RenderLink';
import {Entity} from 'draft-js';

const Link = (props) => {   
   const {url} = Entity.get(props.entityKey).getData();
   
   return <RenderLink url={url} text={props.children} />;
};

export default Link;
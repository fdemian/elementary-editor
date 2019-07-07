import React from 'react'
import { Entity } from 'draft-js'
import RenderLink from './RenderLink'

const Link = (props) => {  
  const { url } = Entity.get(props.entityKey).getData()

  return <RenderLink url={url} text={props.children} />
}

export default Link

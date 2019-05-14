import React from 'react'
import Renderer from '../../../DraftRenderer/DraftRenderer'
import './QuoteBlock.css'

const QuoteBlock = ({ comment }) => {
  const rawContent = JSON.parse(comment.content)

  return (
    <blockquote cite={comment.author}>
      <Renderer raw={rawContent} />
    </blockquote>
  )
}

export default QuoteBlock

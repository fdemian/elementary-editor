export const getBlockStyle = (block) => {
  let blockStyle = null

  switch (block.getType()) {
    case 'blockquote':
      blockStyle = 'Blockquote'
      break
    case 'code-block':
      blockStyle = 'Code'
      break
    default:
      blockStyle = null
  }

  return blockStyle;

}

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
           contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

export const findSpoilerEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
  (character) => {
    const entityKey = character.getEntity()
    return (
    entityKey !== null &&
    contentState.getEntity(entityKey).getType() === 'SPOILER'
    )
  },
  callback
)
}

export const filterStyle = (listToFilter, filter) => {
  return listToFilter.filter(e =>filter.indexOf(e.style) !== -1);
}

export const filterWhiteListedStyles = (styles, allowedStyles) => {
  return {
    BLOCK_TYPES: filterStyle(styles.BLOCK_TYPES, allowedStyles),
    INLINE_STYLES: filterStyle(styles.INLINE_STYLES, allowedStyles),
    CUSTOM_STYLES: filterStyle(styles.CUSTOM_STYLES, allowedStyles)
  };
}


// element ==== "SPOILER"
export function getImmutableSelectionBlock(editorState, element) {
  const selection = editorState.getSelection()
  const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey())
  const selectionState = editorState.getSelection()
  const start = selectionState.getStartOffset()
  const end = selectionState.getEndOffset()
  const selectedText = contentBlock.getText().slice(start, end)
  const contentState = editorState.getCurrentContent()

  const contentStateWithEntity = contentState.createEntity(element, 'IMMUTABLE', { text: selectedText })

  return {
    editorState: editorState,
    newContentState: contentStateWithEntity
  };

}

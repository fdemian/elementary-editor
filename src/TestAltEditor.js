import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions /*, EmojiSelect */} = emojiPlugin;
const plugins = [emojiPlugin];

const EmojiEditor = (config) => {
	
	return (
    <div>
	 <div>
      <Editor
         blockStyleFn={config.getBlockStyle}
         blockRendererFn={config.blockRendererFn}
         blockRenderMap={config.blockRenderMap}
         editorState={config.editorState}
         onChange={config.onChange}
         handleKeyCommand={config.handleKeyCommand}
		 spellCheck={config.spellCheck}
         readOnly={config.readOnly}         
		 ref={(e) => { config.refFn(e); }}
         plugins={plugins}        
      />
	 </div>
	 <div>
        <EmojiSuggestions />      
	 </div>
   </div>
   );
   
}

export default EmojiEditor;
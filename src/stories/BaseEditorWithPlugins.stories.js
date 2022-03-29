import React, { useRef, useState } from "react";
import Editor from "../lib/Editor/Editor";
import DefaultRenderer from "../lib/DraftRenderer/DraftRenderer";
import { Button, Card, Menu, Table } from "antd";

import AltEditor, { composeDecorators } from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import { faImage } from "@fortawesome/free-solid-svg-icons";

import "./BaseEditor.css";

import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css'

const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions } = emojiPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });


const plugins = [
  emojiPlugin,
  hashtagPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
];

const ButtonGroup = Button.Group;


const sampleContent = {
  blocks: [
    {
      key: "1bkrq",
      text: "asdfdsfdasfdsaf",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 15, style: "BOLD" }],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const FILTERED_STYLES = [
  "blockquote",
  "header-two",
  "unordered-list-item",
  "ordered-list-item",
  "code-block",
  "BOLD",
  "ITALIC",
  "UNDERLINE",
  "STRIKETHROUGH",
  "KEYBOARD",
  "SPOILER",
  "Link",
  "LinkRemove",
  "Video",
  "Latex"
];


export const BaseEditorPlugins = () => {

    const [editorState, setEditorState] = useState(null);
    const containerRef = useRef(null);

    const clearEditor = () => {
      containerRef.current.clear();
    };

    const logState = () => {
      const currentState = containerRef.current.getContent();
      const jsonState = JSON.stringify(currentState);
      setEditorState(jsonState);
    };

    const getPlainText = () => {
      const plaintext = containerRef.current.getPlainText();
      setEditorState(plaintext);
    };

    const addContentState = () => {
      const { addNewEntity } = containerRef.current;
      addNewEntity('blockquote', 'blockquote', {
        content: JSON.stringify(sampleContent),
        author: "rulo",
        authorLink: "#",
        cite: "/comments/1"
      });
    }

    const altRenderProps = [
      { component:  EmojiSuggestions, props: {} }
    ];
    const altControls = [{
      label: "Image",
      style: "Image",
      toggleFn: (editorState, type, value) => {
        return imagePlugin.addImage(editorState, value);
      },
      requiresInput: true,
      requiresSelection: false,
      icon: faImage
    }];

    return(
    <>
      <span className="EditorContainer">
        <Editor
          initialState={null}
          filterStyles={FILTERED_STYLES}
          onChange={(state) => console.log(state) /*setEditorState(state)*/}
          containerRef={containerRef}
          plugins={plugins}
          altEditor={AltEditor}
          altControls={altControls}
          altRenderProps={altRenderProps}
        />
      </span>
      <div>
        <ButtonGroup className="LogStateButton">
          <Button type="primary" onClick={clearEditor}>
            Clear editor
          </Button>
          <Button type="primary" onClick={logState}>
            Log State
          </Button>
          <Button type="primary" onClick={getPlainText}>
            Log plain text
          </Button>
          <Button type="primary" onClick={addContentState}>
            Add content
          </Button>
        </ButtonGroup>
      </div>
      <div className="LogStateResult">
        <Card>
          <p>
            {editorState != null
              ? editorState
              : "Press 'Log state' to log the current state."}
          </p>
        </Card>
      </div>
    </>
    );
}


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Editor/Plugins',
  component: BaseEditorPlugins,
  argTypes: {
    /*backgroundColor: { control: 'color' },*/
  }
};

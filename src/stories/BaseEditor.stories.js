import React, { useRef, useState } from "react";
import Editor from "../lib/Editor/Editor";
import DefaultRenderer from "../lib/DraftRenderer/DraftRenderer";
import { Button, Card } from "antd";
import "./BaseEditor.css";

const RendererText = ({ text }) => {
  let jsonText;

  try {
    jsonText = JSON.parse(text);
    return <DefaultRenderer raw={jsonText} />;
  } catch (error) {
    return <p>{text}</p>;
  }
}

const ButtonGroup = Button.Group;

const sampleContent = {
  blocks: [
    {
      key: "69k4h",
      text: "Esc is a keyword key that allows you to escape. ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 3,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: "j3j7",
      text: "A",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "3niov",
      text: "B",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "dl8qn",
      text: "C",
      type: "unordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "275cq",
      text: "Quote",
      type: "blockquote",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "34cr1",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "cjbv9",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "1tijt",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {
    "0": {
      type: "KEYBOARD",
      "mutability": "IMMUTABLE",
      data: {
        text: "Esc"
      }
    }
  }
};

export const BaseEditor = () => {
  const [editorState, setEditorState] = useState(null);
  const containerRef = useRef(null);
  const clearEditor = () => containerRef.current.clear();

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
    addNewEntity('blockquote', 'contentEditable', {
      content: JSON.stringify(sampleContent),
      author: "@rulo",
      authorLink: "#",
      cite: "#comment-1"
    });
  }

  return(
  <>
    <div>
      <span className="EditorContainer">
        <Editor initialState={null} containerRef={containerRef} />
      </span>
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
      <Card>
        <RendererText text={editorState} />
      </Card>
    </div>
  </>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Editor/Base',
  component: BaseEditor,
  argTypes: {
    /*backgroundColor: { control: 'color' },*/
  },
};

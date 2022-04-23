import React, { useRef, useState } from "react";
import Editor from "../lib/Editor/Editor";
import DefaultRenderer from "../lib/DraftRenderer/DraftRenderer";
import { Button, Card } from "antd";
import sampleContent from "./sampleContent";
import "./BaseEditor.css";

const RendererText = ({ text }) => {
  let jsonText;

  try {
    jsonText = JSON.parse(text);
    return <DefaultRenderer raw={jsonText} />;
  } catch (error) {
    return <p>{text}</p>;
  }
};

const ButtonGroup = Button.Group;

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
    addNewEntity("blockquote", "IMMUTABLE", {
      content: JSON.stringify(sampleContent),
      author: "@rulo",
      authorLink: "#",
      cite: "#comment-1"
    });
  };

  return (
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
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Editor/Base",
  component: BaseEditor,
  argTypes: {
    /*backgroundColor: { control: 'color' },*/
  }
};

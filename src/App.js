import React, { useRef, useState } from "react";
import Editor from "./lib/Editor/Editor";
import DefaultRenderer from "./lib/DraftRenderer/DraftRenderer";
import { Button, Card, Menu, Table } from "antd";
import "./App.css";

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

const editorUsageCodeClass = `import Editor from 'elementary-editor';
 class MyComponent extends Component  {

   constructor(props) {
     super(props);
     this.state = { editorState: null }
     this.containerRef = null;
   }

   render() {
     return(
     <div>
       <Editor
         initialState={null}
         containerRef={(editor) => this.editor = editor}
      />
     );
   }
  }
`;

const editorUsageCodeHooks = `
import React, { useRef } from 'react';
import Editor from 'elementary-editor';

const MyComponent = () =>  {

 const containerRef = useRef(null);

 return(
 <div>
   <Editor
     initialState={null}
     containerRef={containerRef}
   />
 </div>
  );
}`;

const editorProps = [
  {
    name: "initialState",
    type: "JSON string",
    default: "null",
    description:
      "A draft-js rawState object with the initial state of the editor. If set to null it will initialize the editor with no text.",
  },
  {
    name: "filterStyles",
    type: "string[]",
    default: "null",
    description:
      "A list of the styles the editor will use. If set it will only use those styles. If the parameter is null or isn't specified, all the available styles will be used.",
  },
];

const editorPropsColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Default",
    dataIndex: "default",
    key: "default",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
];

const editorMethodsColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Parameters",
    dataIndex: "parameters",
    key: "parameters",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
];

const editorMethods = [
  {
    name: "getContent",
    parameters: "-",
    description: "Gets the current DraftJS raw editor state.",
  },
  {
    name: "getPlainText",
    parameters: "-",
    description: "Gets the current editor content as plain text.",
  },
  {
    name: "clear",
    parameters: "-",
    description: "Clears the editor.",
  },
];

const App = () => {
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
    addNewEntity('blockquote', 'contentEditable', {
      content: JSON.stringify(sampleContent),
      author: "@rulo",
      authorLink: "#",
      cite: "#comment-1"
    });
  }

  return (
    <div className="App">
      <div>
        <Menu theme="dark">
          <h2 className="EditorNavbarText">&nbsp;</h2>
        </Menu>
      </div>

      <div className="DocSection">
        <h2 className="SectionTitle">Elementary Editor</h2>
        <ol>
          <li>
            <a href="#intro">Introduction</a>
          </li>
          <li>
            <a href="#use">How to use</a>
          </li>
          <li>
            <a href="#api">API reference</a>
          </li>
          <li>
            <a href="#demo">Play with the editor</a>
          </li>
          <li>
            <a href="#built-with">Built with</a>
          </li>
        </ol>
      </div>

      <div className="DocSection" id="intro">
        <h2 className="SectionTitle">Introduction</h2>
        <h3>So what is this, anyway?</h3>
        <p>
          Elementary editor is a WYSWYG (What you see is what you get) text
          editor based on DraftJS and React (using AntD for styling).
        </p>
        <p></p>
      </div>

      <div className="DocSection" id="use">
        <h2 className="SectionTitle">Usage</h2>
        <p>
          To use this editor in your project, first install the npm package:
        </p>
        <pre className="CodeSection">yarn add elementary-editor</pre>
        <br />
        <p>Then use the editor inside your code</p>
        <h3>Using classes</h3>
        <pre className="CodeSection">
          <code>{editorUsageCodeClass}</code>
        </pre>
        <br />
        <h3>Using hooks</h3>
        <br />
        <pre className="CodeSection">
          <code>{editorUsageCodeHooks}</code>
        </pre>
        <br />
        <p>
          The ref property is needed if you want to access the editor's internal
          methods.
        </p>
      </div>

      <div className="DocSection" id="api">
        <h2 className="SectionTitle">API Reference</h2>
        <div>
          <h3>Properties</h3>
          <p>The editor exposes the following properties:</p>
          <br />
          <Table
            columns={editorPropsColumns}
            dataSource={editorProps}
            pagination={false}
          />
        </div>

        <div className="MethodsDoc">
          <h3>Methods</h3>
          <p>The editor exposes the following methods:</p>
          <br />
          <Table
            columns={editorMethodsColumns}
            dataSource={editorMethods}
            pagination={false}
          />
        </div>
      </div>
      <div className="DocSection" id="demo">
        <h2 className="SectionTitle">Demo</h2>
        <div>
          <div className="EditorContainer">
            <Editor initialState={null} containerRef={containerRef} />
          </div>
        </div>

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
          <Card>
            <h1>Default rendering example</h1>
            <RendererText text={editorState} />
          </Card>
        </div>
      </div>
      <div className="DocSection" id="built-with">
        <h2 className="SectionTitle">Technologies used</h2>
        <h3>Elementary Editor was built with:</h3>
        <br />
        <p>
          <a href="https://facebook.github.io/react/">React</a> - A Javascript
          library for building user interfaces.
        </p>
        <p>
          <a href="https://draftjs.org/">Draft-JS</a> - Rich text editor
          framework for React.
        </p>
        <p>
          <a href="https://ant.design/">ANT.Design</a> - A UI Design Language.
        </p>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default App;

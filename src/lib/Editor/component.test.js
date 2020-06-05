import React from 'react';
//import ReactDOM from 'react-dom';
//import { act } from 'react-dom/test-utils';
import { shallow, render} from 'enzyme';
import Editor from './Editor';
import EditorControls from './Controls';
import BaseEditor from './BaseEditor';
import URLInput from './URLInput';
import { Input, Button } from 'antd'

describe("<Editor />", () => {

  it("Render Editor", () => {

   const component = render(
    <Editor
      initialState={null}
      containerRef={null}
    />
    );

    expect(component[0]['attribs'].class)
    .toStrictEqual('em-editor-container');

    const containerDiv = component.find('div');
    const controls = component.find(EditorControls);
    const baseEditor = component.find(BaseEditor);

    expect(controls).toBeTruthy();
    expect(baseEditor).toBeTruthy();
    expect(containerDiv).toBeTruthy();

  })

  it("<URLInput /> Render", () => {

    const changeFn = jest.fn();

    const component = shallow(
      <URLInput
        changeFn={changeFn}
        urlValue={""}
        type={"url"}
        cancelFn={jest.fn()}
        confirmFn={jest.fn()}
      />
     );

     const input = component.find(Input);
     const inputProps = input.props();

     expect(inputProps.name).toStrictEqual('URL input');
     expect(inputProps.value).toStrictEqual('');
     expect(inputProps.placeholder).toStrictEqual('Enter url URL');
     expect(inputProps.type).toStrictEqual('text');
  });

  // TODO: interaction test for URL Input.

})

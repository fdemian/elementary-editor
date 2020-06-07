import React from 'react';
//import ReactDOM from 'react-dom';
//import { act } from 'react-dom/test-utils';
import { shallow, render} from 'enzyme';
import DraftRenderer from './DraftRenderer';

const contentStateDesc = {"blocks":[{"key":"ags7e","text":"Text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
const invalidContentState = {"blocsks":[{"keyf":"ags7e","text":"Text","type":"unstyled","depath":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};

describe("<DraftRenderer />", () => {

  it("Correctly render some draft-js state.", () => {

   const component = render(<DraftRenderer raw={contentStateDesc} />);

   //console.log(component.children[0]['attribs']);
   //console.log("==================");

   expect(component.length).toStrictEqual(1);

  })

  it("Rendering null state (show 'nothing to render' warning).", () => {

   const component = render(<DraftRenderer raw={null} />);
   const componentClass = component[0]['attribs']['class'];
   const componentName = component[0]['name'];

   expect(componentClass).toStrictEqual('render-warning');
   expect(componentName).toStrictEqual('div');
   expect(component.text()).toStrictEqual('Nothing to render.');
  })

  it("Rendering invalid content state (show 'nothing to render' warning).", () => {

   const component = render(<DraftRenderer raw={invalidContentState} />);
   const componentClass = component[0]['attribs']['class'];
   const componentName = component[0]['name'];

   expect(componentClass).toStrictEqual('render-warning');
   expect(componentName).toStrictEqual('div');
   expect(component.text()).toStrictEqual('Nothing to render.');
  })


})

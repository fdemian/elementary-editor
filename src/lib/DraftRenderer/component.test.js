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

  it("Render inline elements.", () => {

   const componentsToRender = [
    {
      htmlTag: "strong",
      draftState: {"blocks":[{"key":"e06sa","text":"Test","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}
    },
    {
      htmlTag: "em", // Italic
      draftState: {"blocks":[{"key":"e06sa","text":"Italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}
    },
    {
      htmlTag: "u", // underline
      draftState: {"blocks":[{"key":"e06sa","text":"Underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}
    }
   ];

   for(const element of componentsToRender) {
     const component = render(<DraftRenderer raw={element.draftState} />);
     const boldComponent = component.find(element.htmlTag);
     expect(boldComponent[0].name).toStrictEqual(element.htmlTag);
   }

  })

  it("Render blockquote element.", () => {
    const boldQuote = {"blocks":[{"key":"e06sa","text":"bold quote","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}};

    const component = render(<DraftRenderer raw={boldQuote} />);
    const blockquote = component.find('blockquote');
    const bold = blockquote.find('strong');

    expect(blockquote.length).toStrictEqual(1);
    expect(bold.length).toStrictEqual(1);
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

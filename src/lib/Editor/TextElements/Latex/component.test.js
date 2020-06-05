import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, render} from 'enzyme';
import LatexBlock from './LatexBlock';
import TexBlock from './TeXBlock';
import getTexBlock from './insertTexBlock';
//import removeTeXBlock from './export default function removeTeXBlock';

const contentStateDesc = {"contentState":{"entityMap":{},"blockMap":{"d6790":{"key":"d6790","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}},"d2b6a":{"key":"d2b6a","type":"atomic","text":" ","characterList":[{"style":[],"entity":"1"}],"depth":0,"data":{}},"1i5ek":{"key":"1i5ek","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"d6790","anchorOffset":0,"focusKey":"d6790","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1i5ek","anchorOffset":0,"focusKey":"1i5ek","focusOffset":0,"isBackward":false,"hasFocus":true}},"block":{"key":"d2b6a","type":"atomic","text":" ","characterList":[{"style":[],"entity":"1"}],"depth":0,"data":{}},"blockProps":{},"customStyleMap":{"BOLD":{"fontWeight":"bold"},"CODE":{"fontFamily":"monospace","wordWrap":"break-word"},"ITALIC":{"fontStyle":"italic"},"STRIKETHROUGH":{"textDecoration":"line-through"},"UNDERLINE":{"textDecoration":"underline"}},"decorator":{"_decorators":[{},{}]},"direction":"LTR","forceSelection":true,"offsetKey":"d2b6a-0-0","selection":{"anchorKey":"1i5ek","anchorOffset":0,"focusKey":"1i5ek","focusOffset":0,"isBackward":false,"hasFocus":true},"tree":[{"start":0,"end":1,"decoratorKey":null,"leaves":[{"start":0,"end":1}]}]};
const bProps = JSON.parse(JSON.stringify(contentStateDesc));

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const spoilerProps = { text: "spoiler text" };

describe("Latex", () => {

  it("<TexBlock />", () => {

    bProps.block.getKey = () => 0;
    bProps.blockProps.onStartEdit = (k) => null;
    bProps.block.getEntityAt = (n) => {};
    bProps.contentState.getEntity = (e) => {
      return {
        getData: () => {
          return {
            content: 'f(x) = ... '
          }
        }
      }
    };

    act(() => {
     ReactDOM.render(<TexBlock {...bProps} />, container);
    });

    const div = container.querySelector('div');
    const katexOutput = div.querySelector('.katex-output');
    let editPanel = div.querySelector('.edit-panel-container');

    expect(div.className).toStrictEqual('TeXEditor-tex');

    expect(katexOutput).toBeTruthy();
    expect(editPanel).toStrictEqual(null);
    expect(katexOutput.className).toStrictEqual('katex-output');

    // Trigger editing mode on KatexBlock.
    act(() => {
      katexOutput.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    editPanel = div.querySelector('.edit-panel-container');

    expect(editPanel).toBeTruthy();
    expect(div.className).toStrictEqual('TeXEditor-tex TeXEditor-activeTeX');

    // TODO:
    // Trigger edit update.
    // Trigger remove button.

    /*
    const okButton = editPanel.querySelector('.edit-panel-ok-btn');


    // Ok button. Disable edit.
    act(() => {
      okButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    //editPanel = div.querySelector('.edit-panel-container');
    //expect(editPanel).toStrictEqual(null);
    */

  })


it("getTexBlock (insert tex block)", () => {

  const texBlock = getTexBlock();

  expect(texBlock).toStrictEqual({
    type:'LATEX' ,
    mutability:'Immutable',
    content: {
     content: 'f(x) = ... '
    }
  });

})


 /*
 it("<LatexBlock />", () => {

   const props = { content: 'f(x) = ... ' };

   act(() => {
    ReactDOM.render(<LatexBlock {...props} />, container);
   });

   const span = container.querySelector('span');

   expect(span.ref).toStrictEqual(undefined);

   act(() => {
     span.dispatchEvent(new Event('timeupdate	', {bubbles: true}));
   });

   //console.log(span);
   //console.log(span.className);
   console.log(span.ref);
   console.log("__________");

 })*/

});

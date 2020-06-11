import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { shallow, render} from 'enzyme';
import LatexBlock from '../LatexBlock';
import TexBlock from '../TeXBlock';
import EditorButtons from '../Buttons';

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


  it("<LatexBlock />", () => {

    const props = { content: 'f(x) = ... ' };

    act(() => {
      ReactDOM.render(<LatexBlock {...props} />, container);
    });

    let span = container.querySelector('span');

    expect(span.className).toStrictEqual('latex-block');

    act(() => {
      container.dispatchEvent(new Event('timeupdate', {bubbles: true}));
    });

    span = container.querySelector('span');

   // TODO
   //console.log(span);
   //console.log(container);
   //console.log("______");
 })


 it("<Buttons /> invalid tex", () => {

   const props = {
    invalid: true,
    removeFn: jest.fn(),
    saveFn: jest.fn()
   };

   const component = render(<EditorButtons {...props} />);
   const buttons = component.children();

   expect(buttons[0]['attribs'].class).toStrictEqual('ant-btn danger-btn ant-btn-danger');
   expect(buttons[1]['attribs'].disabled).toBeTruthy();
   expect(buttons.length).toStrictEqual(2);

})

});

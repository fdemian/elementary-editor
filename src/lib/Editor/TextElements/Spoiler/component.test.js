import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, render} from 'enzyme';
import Spoiler from './Spoiler';
import SpoilerWrapper from './SpoilerWrapper';

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

describe("<Spoiler />", () => {

  it("<Spoiler />", () => {

    const component = shallow(<Spoiler {...spoilerProps} />);
    const textSpan = component.find('span');

    const spanProps = textSpan.props();

    expect(spanProps.children).toStrictEqual('spoiler text');
    expect(spanProps.className).toStrictEqual(`Spoiler Concealed`);
    expect(spanProps.role).toStrictEqual('presentation');

  })


  it("<SpoilerWrapper />", () => {

    const wrapperProps = { decoratedText: spoilerProps };
    const component = shallow(<SpoilerWrapper {...wrapperProps} />);
    const spoilerComponent = component.find(Spoiler);

    expect(spoilerComponent.length).toStrictEqual(1);
  })


  it('Interaction test (text revealed and hidden)', () => {

      // Test first render and effect
      act(() => {
        ReactDOM.render(<Spoiler {...spoilerProps} />, container);
      });

      const span = container.querySelector('span');

      expect(span.className).toStrictEqual(`Spoiler Concealed`);

      // Test second render and effect
      act(() => {
        span.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      });

      expect(span.className).toStrictEqual(`Spoiler `);
  });

});

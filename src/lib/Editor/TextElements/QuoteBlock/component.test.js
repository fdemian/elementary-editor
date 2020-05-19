import React from 'react';
import Enzyme, { render } from 'enzyme';
import QuoteBlock from './QuoteBlock';

const commentContent = {"blocks":[{"key":"1bkrq","text":"asdfdsfdasfdsaf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}};

describe("<QuoteBlock />", () => {

  it("Renders correctly.", () => {

    const props = {
      comment: {
        content: JSON.stringify(commentContent),
        author: "user1"
      }
    };

    const component = render(<QuoteBlock {...props} />);

    expect(component[0].name).toStrictEqual('blockquote');
    expect(component[0].attribs.cite).toStrictEqual("user1");
  })

});

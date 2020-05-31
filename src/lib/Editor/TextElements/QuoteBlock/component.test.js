import React from 'react';
import Enzyme, { render } from 'enzyme';
import QuoteBlock from './QuoteBlock';
import QuoteBlockWrapper from './QuoteBlockWrapper';

const commentContent = {"blocks":[{"key":"1bkrq","text":"asdfdsfdasfdsaf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}};
const commentProps = {
  comment: {
    content: JSON.stringify(commentContent),
    author: "user1"
  }
};

describe("<QuoteBlock />", () => {

  it("<QuoteBlock />", () => {

    const component = render(<QuoteBlock {...commentProps} />);

    expect(component[0].name).toStrictEqual('blockquote');
    expect(component[0].attribs.cite).toStrictEqual("user1");
  })


  it("<QuoteBlockWrapper />", () => {

    const wrapperProps = {
      contentState: {
        getEntity: (e) => {
          return {
            getData: () => {
              return { props: commentProps.comment }
            }
          }
        }
      },
      block: {
        getEntityAt: (n) => n
      }
    }

    const component = render(<QuoteBlockWrapper {...wrapperProps} />);

    expect(component[0].name).toStrictEqual('blockquote');
    expect(component[0].attribs.cite).toStrictEqual("user1");
  })

});

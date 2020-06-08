import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import Media from './Media';
import ReactPlayer from 'react-player';

beforeEach(() => {
  const React = jest.requireActual('react');
  React.Suspense = ({ children }) => children;
  return React;
});

describe("<Media >", () => {

    it("<Img />", () => {

    const imgProps = { src: "www.url.com/image.png" };
    const props = {
      block: {
        getEntityAt: (n) => {}
      },
      contentState: {
        getEntity: (e) => {
          return {
            getType: () => "Image",
            getData: () => imgProps
          }
        }
      },
      entityKey: 1
    };

    const component = render(<Media {...props} />);
    const componentAttribs = component[0]['attribs'];

    expect(componentAttribs['src']).toStrictEqual("www.url.com/image.png");
    expect(componentAttribs['alt']).toStrictEqual("");
  })

  it("<Video /> (ReactPlayer)", () => {
    const videoSrc =  "www.url.com/video.mp4";
    const component = shallow(<Media src={videoSrc} />);
    const player = component.find(ReactPlayer);

    expect(player.length).toStrictEqual(1);
    expect(player.props().url).toStrictEqual(videoSrc);
    expect(player.props().playing).toStrictEqual(false);
  })

});

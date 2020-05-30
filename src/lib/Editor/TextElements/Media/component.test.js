import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import Media from './Media';
import ReactPlayer from 'react-player';

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

  /*
  // TODO: mock suspense
  // https://stackoverflow.com/questions/54010426/mocking-out-react-suspense-whilst-leaving-the-rest-of-react-intact
  it("<Video /> (ReactPlayer)", () => {

        const videoProps = { src: "www.url.com/video.mp4" };
        const props = {
          block: {
            getEntityAt: (n) => {}
          },
          contentState: {
            getEntity: (e) => {
              return {
                getType: () => "Video",
                getData: () => videoProps
              }
            }
          },
          entityKey: 1
        };

        const component = render(<Media {...props} />);
        const video = component.find(ReactPlayer);
        console.log(video);

        const componentAttribs = video[0]['attribs'];

        expect(componentAttribs['src']).toStrictEqual("www.url.com/image.png");
        expect(componentAttribs['alt']).toStrictEqual("");

  })*/

});

import React from "react";
import Media from "./Media";
import ReactPlayer from "react-player";

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';


describe("<Media >", () => {

  it("<Img />",  async () => {
    const imgProps = { src: "www.url.com/image.png" };
    const props = {
      block: {
        getEntityAt: (n) => {},
      },
      contentState: {
        getEntity: (e) => {
          return {
            getType: () => "Image",
            getData: () => imgProps,
          };
        },
      },
      entityKey: 1,
    };

    const { getByRole } = render(<Media {...props} />);

    await waitFor(() => {
      const image = getByRole('img');

      expect(image).toHaveAttribute("src", imgProps.src);
      expect(image).toHaveAttribute("alt", "");
    });

  });

  it("<Video /> (ReactPlayer)", async () => {
    const videoSrc = "www.url.com/video.mp4";
    const { getByTestId } = render(<Media src={videoSrc} />);

    await waitFor(() => {
      const rpl = getByTestId("react-player");
      expect(rpl).toBeInTheDocument();
    });
  });

});

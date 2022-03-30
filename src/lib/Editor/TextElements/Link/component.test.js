import React from "react";
import RenderLink from "./RenderLink";
import Link from "./Link";

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Link >", () => {

  it("<RenderLink />", () => {
    const props = { src: "www.url.com", text: "Link Text" };
    render(<RenderLink {...props} />);

    const linkElement = screen.getByText(props.text);
    expect(linkElement).toHaveAttribute("rel", "nofollow");
    expect(linkElement).toHaveAttribute("href", props.src);
  });

  it("<Link />", () => {
    const urlprops = { url: "www.url.com", text: "Link Text" };
    const props = {
      children: urlprops.text,
      contentState: {
        getEntity: (e) => {
          return {
            getData: () => urlprops,
          };
        },
      },
      entityKey: 1,
    };

    render(<Link {...props} />);
    const linkElement = screen.getByText(urlprops.text);

    expect(linkElement).toHaveAttribute("rel", "nofollow");
    expect(linkElement).toHaveAttribute("href", urlprops.url);
  });
});

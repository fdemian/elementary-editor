import React from "react";
import RenderLink from "./RenderLink";
import Link from "./Link";

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Link >", () => {
  it("<RenderLink />", () => {
    const props = { url: "www.url.com", text: "Link Text" };
    const { getByText } = render(<RenderLink {...props} />);

    const linkElement = getByText(props.text);

    expect(linkElement).toHaveAttribute("rel", "nofollow");
    expect(linkElement).toHaveAttribute("href", props.url);
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

    const { getByText } = render(<Link {...props} />);
    const linkElement = getByText(urlprops.text);

    expect(linkElement).toHaveAttribute("rel", "nofollow");
    expect(linkElement).toHaveAttribute("href", urlprops.url);
  });
});

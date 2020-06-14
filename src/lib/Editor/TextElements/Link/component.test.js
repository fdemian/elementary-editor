import React from "react";
import Enzyme, { render } from "enzyme";
import RenderLink from "./RenderLink";
import Link from "./Link";

describe("Link >", () => {
  it("<RenderLink />", () => {
    const props = { url: "www.url.com", text: "Link Text" };
    const component = render(<RenderLink {...props} />);
    const componentAttribs = component[0]["attribs"];

    expect(componentAttribs["rel"]).toStrictEqual("nofollow");
    expect(componentAttribs["href"]).toStrictEqual("www.url.com");
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

    const component = render(<Link {...props} />);
    const componentAttribs = component[0]["attribs"];

    expect(componentAttribs["rel"]).toStrictEqual("nofollow");
    expect(componentAttribs["href"]).toStrictEqual("www.url.com");
  });
});

import React from "react";
import ReactDOM from "react-dom";
import Spoiler from "./Spoiler";
import SpoilerWrapper from "./SpoilerWrapper";

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const spoilerProps = { text: "spoiler text" };

describe("<Spoiler />", () => {

  it("<Spoiler />", () => {
    const { getByText } = render(<Spoiler {...spoilerProps} />);
    const spoiler = getByText(spoilerProps.text);
    expect(spoiler).toHaveClass("Spoiler Concealed");
  });

  it("<SpoilerWrapper />", () => {
    const wrapperProps = { decoratedText: spoilerProps.text };
    const { getByText } = render(<SpoilerWrapper {...wrapperProps} />);

    const spoiler = getByText(spoilerProps.text);
    expect(spoiler).toHaveClass("Spoiler Concealed")
  });

  it("Interaction test (text revealed and hidden)", async () => {
    // Test first render and effect

    const { getByText } = render(<Spoiler {...spoilerProps} />);
    const spoiler = getByText(spoilerProps.text);
    expect(spoiler).toHaveClass("Spoiler Concealed");

    // Click the spoiler.
    fireEvent.click(spoiler);

    // Class "concealed" has been removed.
    expect(getByText(spoilerProps.text)).toHaveClass("Spoiler");
  });

});

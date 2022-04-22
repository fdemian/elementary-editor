import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { BaseEditorPlugins } from '../stories/BaseEditorWithPlugins.stories';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe("<Editor />", () => {

  it("Render Editor", () => {
     render(<BaseEditorPlugins ariaLabel="Label for editor" />);
     screen.debug(undefined, 300000);
  })

})

import React from "react";
import LatexBlock from "../LatexBlock";
import TexBlock from "../TeXBlock";
import EditorButtons from '../Buttons';
import { EditorState, Entity, ContentState, AtomicBlockUtils } from "draft-js";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const contentStateDesc = {
  contentState: {
    entityMap: {},
    blockMap: {
      d6790: {
        key: "d6790",
        type: "unstyled",
        text: "",
        characterList: [],
        depth: 0,
        data: {},
      },
      d2b6a: {
        key: "d2b6a",
        type: "atomic",
        text: " ",
        characterList: [{ style: [], entity: "1" }],
        depth: 0,
        data: {},
      },
      "1i5ek": {
        key: "1i5ek",
        type: "unstyled",
        text: "",
        characterList: [],
        depth: 0,
        data: {},
      },
    },
    selectionBefore: {
      anchorKey: "d6790",
      anchorOffset: 0,
      focusKey: "d6790",
      focusOffset: 0,
      isBackward: false,
      hasFocus: false,
    },
    selectionAfter: {
      anchorKey: "1i5ek",
      anchorOffset: 0,
      focusKey: "1i5ek",
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    },
  },
  block: {
    key: "d2b6a",
    type: "atomic",
    text: " ",
    characterList: [{ style: [], entity: "1" }],
    depth: 0,
    data: {},
  },
  blockProps: {},
  customStyleMap: {
    BOLD: { fontWeight: "bold" },
    CODE: { fontFamily: "monospace", wordWrap: "break-word" },
    ITALIC: { fontStyle: "italic" },
    STRIKETHROUGH: { textDecoration: "line-through" },
    UNDERLINE: { textDecoration: "underline" },
  },
  decorator: { _decorators: [{}, {}] },
  direction: "LTR",
  forceSelection: true,
  offsetKey: "d2b6a-0-0",
  selection: {
    anchorKey: "1i5ek",
    anchorOffset: 0,
    focusKey: "1i5ek",
    focusOffset: 0,
    isBackward: false,
    hasFocus: true,
  },
  tree: [
    { start: 0, end: 1, decoratorKey: null, leaves: [{ start: 0, end: 1 }] },
  ],
};
const bProps = JSON.parse(JSON.stringify(contentStateDesc));

describe("Latex", () => {

  it("<TexBlock /> (render, change values)", async () => {
    const user = userEvent.setup()

    bProps.block.getKey = () => 0;
    bProps.blockProps.onStartEdit = (k) => null;
    bProps.block.getEntityAt = (n) => {};
    bProps.blockProps.onFinishEdit = () => {};
    bProps.contentState.mergeEntityData = (key, data) => {
      return data;
    }
    bProps.contentState.getEntity = (e) => {
      return {
        getData: () => {
          return {
            content: "f(x) = ... ",
          };
        },
      };
    };


    render(<TexBlock {...bProps} />);

    expect(screen.getByRole("presentation")).toHaveClass("katex-output");
    user.dblClick(screen.getByRole("presentation"));

    await waitFor(() => {
      expect(screen.getByText('Remove')).toBeInTheDocument();
    })

    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute("rows", "2");
    expect(screen.getAllByText('f(x)', {exact: false})[1]).toBeInTheDocument();

    // Delete all contents of textbox.
    await user.clear(screen.getByRole('textbox'));

    // Change checkbox contents.
    await user.type(screen.getByRole('textbox'), 'g(x)');

    await waitFor(() => {
      expect(screen.getByText('g(x)')).toBeInTheDocument();
    })

    // Save current status.
    await user.click(screen.getByText('Done'));

    await waitFor(() => {
      screen.debug(undefined, 300000);
      expect(screen.getAllByText('g', {exact: false})[1]).toBeInTheDocument();
    });
  })

  it("<TexBlock /> render invalid tex", async () => {
      const user = userEvent.setup()

      bProps.block.getKey = () => 0;
      bProps.blockProps.onStartEdit = (k) => null;
      bProps.block.getEntityAt = (n) => {};
      bProps.blockProps.onFinishEdit = () => {};
      bProps.contentState.mergeEntityData = (key, data) => {
        return data;
      }
      bProps.contentState.getEntity = (e) => {
        return {
          getData: () => {
            return {
              content: "f(x) = ... ",
            };
          },
        };
      };

      render(<TexBlock {...bProps} />);

      expect(screen.getByRole("presentation")).toHaveClass("katex-output");
      await user.click(screen.getByRole("presentation"));

      await waitFor(() => {
        expect(screen.getByText('Done')).toBeInTheDocument();
      });

      expect(screen.getByText('Remove')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2");
      expect(screen.getAllByText('f(x)', {exact: false})[1]).toBeInTheDocument();

      // Change checkbox.
      await user.type(screen.getByRole("textbox"), "\\");

      expect(screen.getByText("Invalid TeX")).toBeInTheDocument();
  })

  it("<LatexBlock />", () => {
    const props = { content: "f(x) = ... " };
    render(<LatexBlock {...props} />);
    const textElem = screen.getByTestId('latex-block');
    fireEvent(textElem, new Event("timeupdate", { bubbles: true }))
    expect(screen.getByTestId('latex-block')).toBeInTheDocument();
  })

  it("<Buttons /> invalid tex", () => {
    const props = {
      invalid: true,
      removeFn: jest.fn(),
      saveFn: jest.fn(),
    };

    render(<EditorButtons {...props} />);

    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText("Invalid TeX")).toBeInTheDocument();
  })

})

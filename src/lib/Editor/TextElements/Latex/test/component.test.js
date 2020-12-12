import React from "react";
import LatexBlock from "../LatexBlock";
import TexBlock from "../TeXBlock";
import EditorButtons from '../Buttons';
import { EditorState, Entity, ContentState, AtomicBlockUtils } from "draft-js";
import { render, fireEvent, waitFor } from '@testing-library/react';
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


    const { getByRole, getByText, getAllByText } = render(<TexBlock {...bProps} />);

    const texOutput = getByRole("presentation");
    expect(texOutput).toHaveClass("katex-output");

    fireEvent.click(texOutput);

    await waitFor(() => {
      const removeBtn = getByText('Remove');
      const doneBtn = getByText('Done');
      const textBox = getByRole("textbox");
      expect(removeBtn).toBeInTheDocument();
      expect(doneBtn).toBeInTheDocument();
      expect(textBox).toHaveAttribute("rows", "2");
      expect(getAllByText('f(x)', {exact: false})[1]).toBeInTheDocument();

      // Change checkbox.
      fireEvent.change(textBox, { target: { value: 'g(x)' } });

      // Save current status.
      fireEvent.click(doneBtn);
      // TODO.
    })

  })

  it("<TexBlock /> render invalid tex", async () => {

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


      const { getByRole, getByText, getAllByText } = render(<TexBlock {...bProps} />);

      const texOutput = getByRole("presentation");
      expect(texOutput).toHaveClass("katex-output");

      fireEvent.click(texOutput);

      await waitFor(() => {
        const removeBtn = getByText('Remove');
        const doneBtn = getByText('Done');
        const textBox = getByRole("textbox");
        expect(removeBtn).toBeInTheDocument();
        expect(doneBtn).toBeInTheDocument();
        expect(textBox).toHaveAttribute("rows", "2");
        expect(getAllByText('f(x)', {exact: false})[1]).toBeInTheDocument();

        // Change checkbox.
        fireEvent.change(textBox, { target: { value: "\\" } });

        expect(getByText("Invalid TeX")).toBeInTheDocument();
      });
  })

  it("<LatexBlock />", () => {
    const props = { content: "f(x) = ... " };

    const { getByTestId } = render(<LatexBlock {...props} />);
    const textElem = getByTestId('latex-block');

    fireEvent(textElem, new Event("timeupdate", { bubbles: true }))

    expect(getByTestId('latex-block')).toBeInTheDocument();
  })

  it("<Buttons /> invalid tex", () => {
    const props = {
      invalid: true,
      removeFn: jest.fn(),
      saveFn: jest.fn(),
    };

    const { getByText } = render(<EditorButtons {...props} />);

    expect(getByText("Remove")).toBeInTheDocument();
    expect(getByText("Invalid TeX")).toBeInTheDocument();
  })

})

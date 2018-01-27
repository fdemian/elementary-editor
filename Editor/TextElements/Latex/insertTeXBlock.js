/**
 * Copyright (c) 2013-present, Facebook, Inc. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { AtomicBlockUtils, EditorState } from 'draft-js';

const initialFormula = 'f(x) = ... ';

export function insertTeXBlock(state) {

  const { editorState } = state;
  const contentState = editorState.getCurrentContent();

  const contentStateWithEntity = contentState.createEntity(
    'LATEX',
    'IMMUTABLE',
    { content: initialFormula },
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(
    editorState,
    { currentContent: contentStateWithEntity },
  );

  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');

}

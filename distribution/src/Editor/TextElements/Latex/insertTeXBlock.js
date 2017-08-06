'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertTeXBlock = insertTeXBlock;

var _draftJs = require('draft-js');

var initialFormula = 'f(x) = ... '; /**
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

function insertTeXBlock(state) {
  var editorState = state.editorState;

  var contentState = editorState.getCurrentContent();

  var contentStateWithEntity = contentState.createEntity('TOKEN', 'IMMUTABLE', { content: initialFormula });

  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });

  return _draftJs.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
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
import katex from 'katex';
import React, { useState } from 'react';
import { Input } from 'antd';
import EditorButtons from './Buttons';
import KatexOutput from './KatexOutput';
import EditPanel from './EditPanel';

const { TextArea } = Input

const TeXBlock = (props) => {

 const [editMode, setEditMode ] = useState(false);
 const [texValue, setTexValue] = useState(null);
 const [invalidTeX , setInvalidTeX] = useState(false);

 const onClick = () => {
   if (editMode)
     return

   setEditMode(true);
   setTexValue(getValue());
   startEdit();
 }

 const onValueChange = (evt) => {
   const { value } = evt.target;
   let invalid = false;

   try {
     /* eslint-disable */
     katex.__parse(value);
     /* eslint-enable */
   } catch (e) {
     invalid = true
   } finally {
     setInvalidTeX(invalid);
     setTexValue(value);
   }
 }

 const save = () => {
   const { contentState } = props;
   const { block } = props;
   const entityKey = block.getEntityAt(0);
   const { mergeEntityData } = contentState;
   const newContentState = mergeEntityData(
     entityKey,
     { content: texValue }
   );

   setInvalidTeX(false);
   setEditMode(false);
   setTexValue(null);

   setTimeout(0, () => finishEdit(newContentState));
 }

 const startEdit = () => {
   const { blockProps, block } = props;
   const key = block.getKey();
   blockProps.onStartEdit(key);
 }

 const finishEdit = (newContentState) => {
   const { blockProps, block } = props;
   const key = block.getKey();
   blockProps.onFinishEdit(key, newContentState);
 }

 const remove = () => {
   const { blockProps, block } = props;
   const key = block.getKey();
   blockProps.onRemove(key);
 }

 const getValue = () => {
   const { contentState, block } = props;
   const entity = contentState.getEntity(block.getEntityAt(0));
   return entity.getData().content;
 }

// TODO: Colapse into one line.
 let texContent = null;
 if (editMode) {
   texContent = (invalidTeX ? '' : texValue)
 } else {
   texContent = getValue();
 }

 let className = 'TeXEditor-tex' + (editMode ? ' TeXEditor-activeTeX' : "");

 return (
 <div className={className}>
   <KatexOutput
     content={texContent}
     onClick={onClick}
   />
   <EditPanel
     editMode={editMode}
     onValueChange={onValueChange}
     texValue={texValue}
     invalidTeX={invalidTeX}
     save={save}
     remove={remove}
   />
 </div>
 );

}

export default TeXBlock;

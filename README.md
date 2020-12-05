# Elementary Editor

A WYSWYG editor based on Draft

[![Build Status](https://travis-ci.org/fdemian/elementary-editor.svg?branch=master)](https://travis-ci.org/fdemian/elementary-editor)

[![codecov](https://codecov.io/gh/fdemian/elementary-editor/branch/master/graph/badge.svg)](https://codecov.io/gh/fdemian/elementary-editor)


## Getting Started

### Prerequisites

You will need:   
 - NodeJS
 - [Yarn](https://yarnpkg.com/lang/en/)

### Usage

To use this editor in your project:

- Install the npm package:

```
 yarn add elementary-editor
```
- Then use the editor inside your code

Using Classes

```
import Editor from 'elementary-editor';

class MyComponent extends Component  {

 constructor(props) {
   super(props);
   this.state = { editorState: null }
   this.containerRef = null;
 }

 render() {
   return(
   <Editor
     initialState={null}
     containerRef={(editor) => this.editor = editor}
   />
   );
 }

}
```

Using hooks

```
import React, { useRef } from 'react';
import Editor from 'elementary-editor';

const MyComponent = () =>  {

 const containerRef = useRef(null);

 return(
 <div>
   <Editor
     initialState={null}
     containerRef={containerRef}
   />
 </div>
  );
}
```

The ref property is needed if you want to access the editor's internal methods.

To use the default renderer that is bundled with the editor:

```
import { DefaultRenderer } from 'elementary-editor';

class MyComponent extends Component  {
 /*
 ...
 */
 render() {
  return(
  <div>
	<DefaultRenderer raw={rawText} />
  </div>
  );
 }
```

Here `rawText` is a javascript object that contains a valid Draft-JS raw state object.

The ref property is needed if you want to access the editor's internal methods.

## API

## Properties

<table class="table table-bordered table-striped">
  <thead>
     <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <td>initialState</td>
      <td>JSON string</td>
       <td>null</td>
      <td>
 	  A draft-js rawState object with the initial state of the editor. If set to null it will initialize the editor with no text.
 	  </td>
    </tr>   
    <tr>
      <td>filterStyles (optional)</td>
      <td>string[]</td>
      <td>null</td>
      <td>
        A list of the styles the editor will use. If set it will only use those styles. If the parameter is null or isn't specified, all the available styles will be used.
      </td>
    </tr>   
  </tbody>
 </table>

 ## Styles

 *Note*: styles can be filtered by passing the style names to the **filterStyles** argument of the editor.

 <table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>	  
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BOLD</td>	  
      <td>Inline</td>	  
      <td>Bold text.</td>
    </tr>
    <tr>
      <td>ITALIC</td>
      <td>Inline</td>	  
      <td>Italic text.</td>
    </tr>
    <tr>
      <td>UNDERLINE</td>
      <td>Inline</td>
      <td>Underlined text.</td>	  
    </tr>
    <tr>
      <td>STRIKETHROUGH</td>
      <td>Inline</td>
      <td>Strikethrough text.</td>	  
    </tr>
    <tr>
      <td>blockquote</td>
      <td>Block</td>
      <td>Quote block.</td>	  
    </tr>
	<tr>
      <td>header-two</td>
      <td>Block</td>
      <td>H2 element.</td>	  
    </tr>
	<tr>
      <td>unordered-list-item</td>
      <td>Block</td>
      <td>Unordered list.</td>	  
    </tr>
	<tr>
      <td>ordered-list-item</td>
      <td>Block</td>
      <td>Ordered list.</td>	  
    </tr>
	<tr>
      <td>code-block</td>
      <td>Block</td>
      <td>Code block.</td>	  
    </tr>		
    <tr>
      <td>Link</td>
      <td>Custom</td>
      <td>Link</td>	  
    </tr>
    <tr>
      <td>LinkRemove</td>
      <td>Custom</td>
      <td>Remove link.</td>	  
    </tr>
    <tr>
      <td>Image</td>
      <td>Custom</td>
      <td>Image url.</td>	  
    </tr>
    <tr>
      <td>Spoiler</td>
      <td>Custom</td>
      <td>Spoiler.</td>	  
    </tr>
    <tr>
      <td>Video</td>
      <td>Custom</td>
      <td>Embeded video.</td>
    </tr>
    <tr>
      <td>Latex</td>
      <td>Custom</td>
      <td>Latex formatted block.</td>
    </tr>
  </tbody>
</table>

 ## Methods

 + Internal editor methods.

 <table class="table table-bordered table-striped">
   <thead>
     <tr>
       <th style="width: 100px;">Name</th>
       <th style="width: 50px;">Parameters</th>
       <th>Description</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>getContent</td>
       <td> - </td>
       <td>
 	    Gets the current DraftJS raw editor state.
 	  </td>
     </tr>   
 	<tr>
       <td>clear</td>
       <td> - </td>
       <td>
 		Clears the editor.
 	  </td>
     </tr>
   </tbody>
 </table>


 ## Built With

 * [React](https://facebook.github.io/react/) - A Javascript library for building user interfaces.
 * [DraftJS](https://draftjs.org/) - Rich text editor framework for React.
 * [Ant.Design](https://ant.design/) - A UI Design Language.

 <!---
 ## Contributing

 Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

 ## Versioning

 We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
 -->

 ## Authors

 * **Federico Caminiti** - *Maintainer*

 <!---
 See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
 -->

 ## License

 This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

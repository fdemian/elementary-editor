import React, { Component } from 'react';
import katex from 'katex';

class LatexBlock extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  update() {

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      katex.render(
        this.props.content,
        this.container,
        { displayMode: true }
      );
    }, 0);

  }

  render() {
    return <span ref={(c) => { this.container = c; }} />;
  }
}

export default LatexBlock;

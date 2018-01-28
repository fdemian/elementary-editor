import React, { Component } from 'react';
import katex from 'katex';

class LatexBlock extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
  }

  update() {

    if (this.timer) {
      alert('clearTimeout!');
      clearTimeout(this.timer);
    }

    this._timer = setTimeout(() => {
      katex.render(
        this.props.content,
        this.refs.container,
        { displayMode: true }
      );
    }, 0);

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

  componentDidMount() {
    this.update();
  }

  render() {
    return <span ref="container" />;
  }
}

export default LatexBlock;

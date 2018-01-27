import React, { Component } from 'react';
import katex from 'katex';

class LatexBlock extends Component {

  constructor(props) {
    super(props);
    this._timer = null;
  }

  _update() {

    if (this._timer) {
	  alert('clearTimeout!');
      clearTimeout(this._timer);
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
      this._update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
    this._timer = null;
  }

  componentDidMount() {
    this._update();
  }

  render() {
    return <span ref="container" />;
  }
}

export default LatexBlock;

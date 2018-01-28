import React from 'react';
import './Spoiler.css';

class Spoiler extends React.Component {

  constructor(props) {
    super(props);
    this.state = { textStatus: 'Concealed' };
  }

  changeStatus() {
    const { textStatus } = this.state;
    const newStatus = textStatus === '' ? 'Concealed' : '';
    this.setState({ textStatus: newStatus });
  }

  render() {

    const cssClass = `Spoiler ${this.state.textStatus}`;
    return (
      <span className={cssClass} onClick={this.changeStatus.bind(this)}>
        {this.props.text}
      </span>
    );
  }
}

export default Spoiler;

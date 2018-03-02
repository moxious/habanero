import React, { Component } from 'react';

class CloseTabButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
      console.log('Close tab');
      this.props.app.dismissTab(this.props.item);
  }

  render() {
    return (
        <a href='#' onClick={e => this.handleClick()}>X</a>
    );
  }
}

export default CloseTabButton;

import React, {Component} from 'react';
import {render} from 'react-dom';

class DAGM extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hi
      </div>
    );
  }
}

render(
  <DAGM />,
  document.getElementById('root')
);

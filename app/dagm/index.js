import '../../css/index.styl';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Col, Row} from 'react-bootstrap';
import List from './List';
import Tracker from './Tracker';

class DAGM extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInit = () => {
    let init = [];
    init = init.concat(this.refs.Players.getInit());
    init = init.concat(this.refs.Foes.getInit());
    return init;
  };

  highlight = (info) => {
    if (info) {
      for (const type of ['Players', 'Foes']) {
        if (type === info.type) {
          this.refs[type].setState({highlight: info.name});
        } else {
          this.refs[type].setState({highlight: undefined});
        }
      }
    } else {
      for (const type in this.refs) {
        this.refs[type].setState({highlight: undefined});
      }
    }
  };

  trackerRemove = (name, type) => {
    this.refs.Tracker.remove(name, type);
  };

  render() {
    return (
      <div className="container-fluid root">
        <Row>
          <Col xs={3}>
            <Tracker ref="Tracker" getInit={this.getInit} highlight={this.highlight} />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={6}>
                <List type="Players" ref="Players" trackerRemove={this.trackerRemove} />
              </Col>
              <Col xs={6}>
                <List type="Foes" ref="Foes" multi={true} control={true} trackerRemove={this.trackerRemove} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

render(
  <DAGM />,
  document.getElementById('root')
);

import React, {Component} from 'react';
import {Col, Row, ButtonGroup, Button} from 'react-bootstrap';

class InnerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let star = undefined;
    if (this.props.info.first) {
      star = <i className="fa fa-star"></i>;
    }
    return (
      <div>
        <Col xs={10}>
          {this.props.info.name}
        </Col>
        <Col xs={2} className="no-left-pad">
          {star}
          <i className="fa fa-times close" onClick={this.props.onClick} id={this.props.id}></i>
        </Col>
        <Col xs={12}>
          <hr className="thin" />
        </Col>
      </div>
    );
  }
}

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: []
    };
  }

  onClose = (event) => {
    this.close(event.target.id);
  };

  getNames = () => {
    const items = [];
    let idx = 0;
    for (const item of this.state.init) {
      items.push(<InnerInfo info={item} key={idx} id={idx} onClick={this.onClose} />);
      idx += 1;
    }
    return items;
  };

  close = (idxInput) => {
    let idx = parseInt(idxInput, 10);
    const init = this.state.init.slice();
    const removed = init.splice(idx, 1);
    if (removed[0].first) {
      if (idx === init.length) {
        idx = 0;
      }
      if (init[idx]) {
        init[idx].first = true;
      }
    }
    this.setState({init}, this.highlightFirst);
  };

  remove = (name, type) => {
    for (const idx in this.state.init) {
      if (this.state.init[idx].name === name & this.state.init[idx].type === type) {
        this.close(idx);
        break;
      }
    }
  };

  initSort = (a, b) => {
    return b.init - a.init;
  };

  highlightFirst = () => {
    this.props.highlight(this.state.init[0]);
  };

  addAll = () => {
    const init = this.props.getInit();
    init.sort(this.initSort);
    init[0].first = true;
    this.setState({init}, this.highlightFirst);
  };

  advance = () => {
    const init = this.state.init.slice();
    const first = init.shift();
    init.push(first);
    this.setState({init}, this.highlightFirst);
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Initiative Tracker</span>
          </Col>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button
                  bsSize="xsmall"
                  onClick={this.addAll}
                  block={true}
                >
                  Add All
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  bsSize="xsmall"
                  onClick={this.advance}
                  block={true}
                >
                  Advance
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          {this.getNames()}
        </Row>
      </div>
    );
  }
}

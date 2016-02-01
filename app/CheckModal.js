import React, {Component} from 'react';
import {Col, Row, Button, Modal, OverlayTrigger} from 'react-bootstrap';

class CheckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  closeModal = () => {
    this.setState({showModal: false});
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  doNothing = () => {
    return false;
  };

  titleInner = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  };

  titleCase = (s) => {
    return s.replace('_', ' ').replace(/\w\S*/g, this.titleInner);
  };

  modalBlockList = () => {
    const fullList = [];
    let i = 0;
    for (const item of this.props.InputList) {
      fullList.push(<ModalBlock idx={i} item={item} key={i} />);
      i++;
    }
    return fullList;
  };

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Edit {this.props.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.modalBlockList()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export class ModalBlock extends Component {
  getClassName = () => {
    let className = '';
    if (this.props.idx % 2 === 0) {
      className += 'highlight';
    } else {
      className += 'non-highlight';
    }
    return className;
  };

  render() {
    return (
      <Row key={this.props.idx} className={this.getClassName()}>
        <Col xs={4}>
          <span className="talent-name">{this.props.item.label}</span>
        </Col>
        <Col xs={2}>
          <OverlayTrigger trigger="click" placement="left" overlay={this.props.infoRender}>
            <Button bsSize="xsmall" block={true}>Info</Button>
          </OverlayTrigger>
        </Col>
        {this.props.checkRender}
      </Row>
    );
  }
}

export class ActiveBlock extends Component {
  getClassName = () => {
    let className = '';
    if (this.props.idx % 2 === 0) {
      className += 'highlight';
    } else {
      className += 'non-highlight';
    }
    return className;
  };

  render() {
    return (
      <Row className={this.getClassName()}>
        <Col xs={6}>
          {this.props.item.label}
        </Col>
        <Col xs={6}>
          <OverlayTrigger trigger="click" placement="right" overlay={this.props.infoRender}>
            <Button bsSize="xsmall" block={true}>Info</Button>
          </OverlayTrigger>
        </Col>
      </Row>
    );
  }
}

module.exports = {ActiveBlock, ModalBlock, CheckModal};

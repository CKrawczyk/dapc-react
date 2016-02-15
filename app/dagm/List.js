import React, {Component} from 'react';
import {Col, Row, Button, Input} from 'react-bootstrap';
import FileInput from 'react-file-reader-input';
import Overview from './Overview';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: []
    };
  }

  onUpload = (event, results) => {
    const inputs = [...this.state.inputs];
    for (const result of results) {
      inputs.push(JSON.parse(result[0].target.result));
    }
    this.setState({inputs});
  };

  getList = () => {
    const list = [];
    let idx = 0;
    for (const input of this.state.inputs) {
      const item = (
        <Col xs={12} key={idx}>
          <div className="overview">
            <Overview id={idx} input={input} onClose={this.handleClose} control={this.props.control} />
          </div>
        </Col>
      );
      list.push(item);
      idx++;
    }
    return list;
  };

  handleClose = (idx) => {
    const inputs = [...this.state.inputs];
    inputs.splice(idx, 1);
    this.setState({inputs});
  };

  render() {
    const list = this.getList();
    let multi = undefined;
    if (this.props.multi) {
      multi = <label><input type="checkbox" />Multi</label>;
    }
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">{this.props.type}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="no-right-pad">
            <b>Name</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Def.</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Arm.</b>
          </Col>
          <Col xs={1} className="no-right-pad no-left-pad">
            <b>Sp.</b>
          </Col>
          <Col xs={2} className="no-right-pad no-left-pad">
            <b>Init</b>
          </Col>
          <Col xs={3} className="no-left-pad">
            <Input addonBefore={multi} wrapperClassName="input-group-xs">
              <FileInput as="text" onChange={this.onUpload} multiple={true}>
                <Button bsSize="xsmall" block={true}>+</Button>
              </FileInput>
            </Input>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
        </Row>
        <Row>
          {list}
        </Row>
      </div>
    );
  }
}

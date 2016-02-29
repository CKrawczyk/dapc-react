import React, {Component} from 'react';
import {Col, Row, Button, Input} from 'react-bootstrap';
import FileInput from 'react-file-reader-input';
import Overview from './Overview';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiCheck: false,
      multiValue: '1',
      inputs: []
    };
  }

  onUpload = (event, results) => {
    const inputs = [...this.state.inputs];
    for (const result of results) {
      if (this.state.multiCheck) {
        const num = parseInt(this.state.multiValue, 10);
        for (const idx of Array.from(new Array(num).keys())) {
          const json = JSON.parse(result[0].target.result);
          json.info.name = `${json.info.name} ${idx + 1}`;
          inputs.push(json);
        }
      } else {
        const json = JSON.parse(result[0].target.result);
        inputs.push(json);
      }
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

  handleCheck = (event) => {
    this.setState({multiCheck: event.target.checked});
  };

  handleInputChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  selectText = (event) => {
    event.target.select();
  };

  render() {
    const list = this.getList();
    const fileAdd = (
      <FileInput as="text" onChange={this.onUpload} multiple={true}>
        <Button bsSize="xsmall" block={true}>+</Button>
      </FileInput>
    );
    let addButton = fileAdd;
    if (this.props.multi) {
      const multi = (
        <label>
          <input
            type="checkbox"
            checked={this.state.multiCheck}
            onChange={this.handleCheck}
          />
          Multi
        </label>
      );
      addButton = (
        <Input wrapperClassName="input-group-xs multi-add">
          <Input
            type="number"
            min="1"
            addonBefore={multi}
            bsSize="small"
            value={this.state.multiValue}
            onChange={this.handleInputChange}
            disabled={!this.state.multiCheck}
            onFocus={this.selectText}
            id="multiValue"
          />
        {fileAdd}
      </Input>
      );
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
            {addButton}
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

import React, {Component} from 'react';
import {Col, Row, Input, Button, OverlayTrigger, Popover, ButtonGroup} from 'react-bootstrap';
import '../css/health.css';

export default class Health extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max_health: '0',
      health: '0',
      max_mana: '0',
      mana: '0',
      health_adjust: '0',
      mana_adjust: '0'
    };
  }

  getOutput = () => {
    const output = {...this.state};
    delete output.health_adjust;
    delete output.mana_adjust;
    return output;
  };

  getInput = (input) => {
    this.setState({...input});
  };

  selectText = (event) => {
    event.target.select();
  };

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  handelPmButton = (event) => {
    const newState = {};
    const multiplier = parseInt(`${event.target.innerText}1`, 10);
    const currentValue = parseInt(this.state[event.target.id], 10);
    const adjustValue = parseInt(this.state[`${event.target.id}_adjust`], 10);
    const maxValue = parseInt(this.state[`max_${event.target.id}`], 10);
    let newValue = currentValue + (adjustValue * multiplier);
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }
    newState[event.target.id] = (newValue).toString(10);
    newState[`${event.target.id}_adjust`] = '0';
    this.setState(newState);
    this.refs[`${event.target.id}-popover`].hide();
  };

  healthPopover = () => {
    return (
      <Popover id="Adjust Health" title="Adjust Health">
        <Row>
          <Col xs={12}>
            <Input
              type="number"
              id="health_adjust"
              min="0"
              max={this.state.max_health}
              value={this.state.health_adjust}
              onChange={this.handleInputChange}
              onFocus={this.selectText}
            />
          </Col>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id="health">+</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.handelPmButton} id="health">-</Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
      </Popover>
    );
  };

  manaPopover = () => {
    return (
      <Popover id="Adjust Mana" title="Adjust Mana">
        <Input
          type="number"
          id="mana_adjust"
          min="0"
          max={this.state.max_mana}
          value={this.state.mana_adjust}
          onChange={this.handleInputChange}
          onFocus={this.selectText}
        />
          <ButtonGroup justified={true}>
            <ButtonGroup>
              <Button onClick={this.handelPmButton} id="mana">+</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={this.handelPmButton} id="mana">-</Button>
            </ButtonGroup>
          </ButtonGroup>
      </Popover>
    );
  };

  render() {
    const healthButton = (
      <OverlayTrigger trigger="click" ref="health-popover" placement="bottom" overlay={this.healthPopover()}>
        <Button id="health" className="pm-button">Health<br/>±</Button>
      </OverlayTrigger>
    );
    const manaButton = (
      <OverlayTrigger trigger="click" ref="mana-popover" placement="bottom" overlay={this.manaPopover()}>
        <Button id="mana" className="pm-button">Mana<br/>±</Button>
      </OverlayTrigger>
    );
    return (
      <div className="box health-box">
        <Row>
          <Col xs={5} className="no-right-pad">
            <Input buttonBefore={healthButton} wrapperClassName="wrapper">
              <Input
                type="number"
                id="health"
                min="0"
                max={this.state.max_health}
                value={this.state.health}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <Input
                type="number"
                id="max_health"
                min="0"
                value={this.state.max_health}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
                disabled={!this.props.edit}
              />
            </Input>
          </Col>
          <Col xs={2} className="no-left-pad no-right-pad">
            <span className="input-group-addon mid-addon">Current</span>
            <span className="input-group-addon mid-addon">Max</span>
          </Col>
          <Col xs={5} className="no-left-pad">
            <Input buttonAfter={manaButton} wrapperClassName="wrapper">
              <Input
                type="number"
                id="mana"
                min="0"
                max={this.state.max_mana}
                value={this.state.mana}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <Input
                type="number"
                id="max_mana"
                min="0"
                value={this.state.max_mana}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
                disabled={!this.props.edit}
              />
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

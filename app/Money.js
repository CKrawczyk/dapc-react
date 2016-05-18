import React, {Component} from 'react';
import {Col, Row, Input, Button, ButtonGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Money extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gold_adjust: '0',
      silver_adjust: '0',
      copper_adjust: '0'
    };
  }

  handleSetMoney = (money) => {
    const converted = this.moneyConvert(money);
    for (const idx in converted) {
      this.props.setMoney({id: idx, value: converted[idx]});
    }
  };

  handlePmButton = (event) => {
    const multiplier = parseInt(`${event.target.innerHTML}1`, 10);
    const newMoney = {
      gold: this.asInt(this.props.money.gold) + (multiplier * this.asInt(this.state.gold_adjust)),
      silver: this.asInt(this.props.money.silver) + (multiplier * this.asInt(this.state.silver_adjust)),
      copper: this.asInt(this.props.money.copper) + (multiplier * this.asInt(this.state.copper_adjust))
    };
    this.handleSetMoney(newMoney);
    const newState = {
      gold_adjust: '0',
      silver_adjust: '0',
      copper_adjust: '0'
    };
    this.setState(newState);
    this.refs['money-popover'].hide();
  };

  asInt = (str) => {
    return (parseInt(str, 10) || 0);
  };

  moneyConvert = (value) => {
    const allMoney = 10000 * this.asInt(value.gold) + 100 * this.asInt(value.silver) + this.asInt(value.copper);
    const tmp = allMoney % 10000;
    const newGold = (allMoney - tmp) / 10000;
    const newCopper = tmp % 100;
    const newSilver = (tmp - newCopper) / 100;
    return {
      gold: (newGold).toString(10),
      silver: (newSilver).toString(10),
      copper: (newCopper).toString(10)};
  };

  handleInputChange = (event) => {
    if (event.target.id.split('_')[1] === 'adjust') {
      this.setState({[event.target.id]: event.target.value});
    } else {
      const newMoney = {
        ...this.props.money,
        [event.target.id]: event.target.value
      };
      this.handleSetMoney(newMoney);
    }
  };

  selectText = (event) => {
    event.target.select();
  };

  moneyPopover = () => {
    return (
      <Popover id="Adjust Money" title="Adjust Money">
        <Row>
          <Col xs={12}>
            <div className="input-group heading-full">
              <span className="heading-money">Gold</span>
              <span className="heading-money">Silver</span>
              <span className="heading-money">Copper</span>
            </div>
          </Col>
          <Col xs={12}>
            <Input>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="gold_adjust"
                  value={this.state.gold_adjust}
                  onChange={this.handleInputChange}
                  onFocus={this.selectText}
                />
                <span className="input-group-btn blank-span"></span>
                <input
                  type="number"
                  className="form-control"
                  id="silver_adjust"
                  value={this.state.silver_adjust}
                  onChange={this.handleInputChange}
                  onFocus={this.selectText}
                />
                <span className="input-group-btn blank-span"></span>
                <input
                  type="number"
                  className="form-control"
                  id="copper_adjust"
                  value={this.state.copper_adjust}
                  onChange={this.handleInputChange}
                  onFocus={this.selectText}
                />
              </div>
            </Input>
          </Col>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.handlePmButton} id="add">+</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.handlePmButton} id="remove">-</Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
      </Popover>
    );
  };

  render() {
    const button = (
      <OverlayTrigger trigger="click" ref="money-popover" placement="bottom" overlay={this.moneyPopover()}>
        <Button className="pm-button-money">±</Button>
      </OverlayTrigger>
    );
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Money</span>
          </Col>
          <Col xs={12}>
            <div className="input-group heading-full">
              <span className="heading-money">Gold</span>
              <span className="heading-money">Silver</span>
              <span className="heading-money">Copper</span>
              <span className="heading-money-button"></span>
            </div>
          </Col>
          <Col xs={12}>
            <Input buttonAfter={button}>
              <input
                type="number"
                className="form-control"
                id="gold"
                value={this.props.money.gold}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <span className="input-group-btn blank-span"></span>
              <input
                type="number"
                className="form-control"
                id="silver"
                value={this.props.money.silver}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
              <span className="input-group-btn blank-span"></span>
              <input
                type="number"
                className="form-control"
                id="copper"
                value={this.props.money.copper}
                onChange={this.handleInputChange}
                onFocus={this.selectText}
              />
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {money: state.money};
}

function mapDispatchToProps(dispatch) {
  return {setMoney: bindActionCreators(actions.setMoney, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Money);

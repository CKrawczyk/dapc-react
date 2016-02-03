import React, {Component} from 'react';
import {Col, Row, Input, Button, ButtonGroup} from 'react-bootstrap';

class WeaponBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={5}>
          <Input
            type="text"
            value={this.props.weapon.weapon}
            id="weapon"
            name={this.props.id}
            onChange={this.props.onChange}
          />
        </Col>
        <Col xs={4} className="reduce-left-pad reduce-right-pad">
          <Input wrapperClassName="wrapper">
            <Row>
              <Col xs={6} className="no-right-pad reduce-left-pad">
                <input
                  type="text"
                  className="form-control reduce-left-pad reduce-right-pad no-right-radius"
                  value={this.props.weapon.attack}
                  id="attack"
                  name={this.props.id}
                  onChange={this.props.onChange}
                />
              </Col>
              <Col xs={6} className="no-left-pad reduce-right-pad">
                <input
                  type="text"
                  className="form-control reduce-left-pad reduce-right-pad no-left-radius"
                  value={this.props.weapon.damage}
                  id="damage"
                  name={this.props.id}
                  onChange={this.props.onChange}
                />
              </Col>
            </Row>
          </Input>
        </Col>
        <Col xs={3}>
          <Input wrapperClassName="wrapper">
            <Row>
              <Col xs={6} className="no-right-pad">
                <input
                  type="text"
                  className="form-control reduce-left-pad reduce-right-pad no-right-radius"
                  value={this.props.weapon.range_min}
                  id="range_min"
                  name={this.props.id}
                  onChange={this.props.onChange}
                />
              </Col>
              <Col xs={6} className="no-left-pad">
                <input
                  type="text"
                  className="form-control reduce-left-pad reduce-right-pad no-left-radius"
                  value={this.props.weapon.range_max}
                  id="range_max"
                  name={this.props.id}
                  onChange={this.props.onChange}
                />
              </Col>
            </Row>
          </Input>
        </Col>
      </Row>
    );
  }
}

export default class Weapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: [
        {weapon: '',
          attack: '',
          damage: '',
          range_min: '',
          range_max: ''
        }
      ]
    };
  }

  getOutput = () => {
    return [...this.state.weapons];
  };

  getInput = (input) => {
    this.setState({weapons: [...input]});
  };

  handleNewWeapon = () => {
    const newWeapon = {
      weapon: '',
      attack: '',
      damage: '',
      range_min: '',
      range_max: ''
    };
    const currentState = this.state;
    currentState.weapons.push(newWeapon);
    this.setState(currentState);
  };

  handleRemoveWeapon = () => {
    const currentState = this.state;
    currentState.weapons.pop();
    this.setState(currentState);
  };

  handleInputChange = (event) => {
    const currentState = this.state;
    currentState.weapons[event.target.name][event.target.id] = event.target.value;
    this.setState(currentState);
  };

  render() {
    const block = [];
    let i = 0;
    for (const w of this.state.weapons) {
      block.push(<WeaponBlock key={i} id={i} weapon={w} onChange={this.handleInputChange} />);
      i++;
    }
    return (
      <div className="box">
        <Row>
          <Col xs={5}>
            <span className="heading">Weapon</span>
          </Col>
          <Col xs={4} className="reduce-left-pad reduce-right-pad">
            <Row>
              <Col xs={6} className="no-right-pad reduce-left-pad">
                <span className="heading">Attack</span>
              </Col>
              <Col xs={6} className="no-left-pad reduce-right-pad">
                <span className="heading">Damage</span>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <span className="heading">Range</span>
          </Col>
        </Row>
        {block}
        <Row>
          <Col xs={12}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.handleNewWeapon}>
                  Add Weapon
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.handleRemoveWeapon} disabled={this.state.weapons.length <= 1}>
                  Remove Weapon
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

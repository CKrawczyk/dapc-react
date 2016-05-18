import React, {Component} from 'react';
import {Col, Row, Input, Button, ButtonGroup} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WeaponBlock extends Component {
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

class Weapon extends Component {
  handleNewWeapon = () => {
    this.props.addWeaponList();
  };

  handleRemoveWeapon = () => {
    this.props.removeWeaponList();
  };

  handleInputChange = (event) => {
    this.props.setWeapon({idx: event.target.name, id: event.target.id, value: event.target.value});
  };

  render() {
    const block = [];
    let i = 0;
    for (const w of this.props.weapons) {
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
                <Button onClick={this.handleRemoveWeapon} disabled={this.props.weapons.length <= 1}>
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

function mapStateToProps(state) {
  return {weapons: state.weapons};
}

function mapDispatchToProps(dispatch) {
  return {
    addWeaponList: bindActionCreators(actions.addWeaponList, dispatch),
    removeWeaponList: bindActionCreators(actions.removeWeaponList, dispatch),
    setWeapon: bindActionCreators(actions.setWeapon, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Weapon);

import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import Groups from './lib/weaponGroups';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WeaponsGroup extends Component {
  handleCheckbox = (event) => {
    this.props.setWeaponGroups({id: event.target.id, value: event.target.checked});
  };

  makeCheckboxes = () => {
    const boxes = [];
    let i = 0;
    for (const g of Groups) {
      const box = (
        <Col xs={g.size} xsOffset={g.skip} key={`wgc_${i}`}>
          <Input
            type="checkbox"
            label={g.label}
            id={g.id}
            key={`wg_${i}`}
            checked={this.props.weapon_groups[g.id]}
            onClick={this.handleCheckbox}
            disabled={!this.props.edit}
          />
      </Col>
      );
      boxes.push(box);
      i++;
    }
    return boxes;
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12} key={'wgc_0'}>
            <span className="heading" key={'wg_0'}>Weapon Groups</span>
          </Col>
          {this.makeCheckboxes()}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {weapon_groups: state.weapon_groups};
}

function mapDispatchToProps(dispatch) {
  return {setWeaponGroups: bindActionCreators(actions.setWeaponGroups, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponsGroup);

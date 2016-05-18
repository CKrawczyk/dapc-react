import React, {Component} from 'react';
import ClassPowers from './ClassPowers';
import Talents from './Talents';
import TalentsList from './lib/talents';
import SpecialList from './lib/specializations';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class PoTaSp extends Component {
  handlePowersUpdate = (event) => {
    this.props.setClassPowers({id: event.target.id, value: event.target.checked});
  };

  handleTalentsUpdate = (idx, value) => {
    for (const id in value) {
      this.props.setTalents({idx, id, value: value[id]});
    }
  };

  handleSpecialUpdate = (idx, value) => {
    for (const id in value) {
      this.props.setSpecial({idx, id, value: value[id]});
    }
  };

  render() {
    return (
      <div className="box">
        <ClassPowers
          c={this.props.class}
          onChange={this.handlePowersUpdate}
          powers={this.props.powers}
          edit={this.props.edit}
        />
        <hr />
        <Talents
          inputList={TalentsList}
          label="Talents"
          c={this.props.class}
          onChange={this.handleTalentsUpdate}
          talents={this.props.talents}
          edit={this.props.edit}
        />
        <hr />
        <Talents
          inputList={SpecialList}
          label="Specializations"
          c={this.props.class}
          onChange={this.handleSpecialUpdate}
          talents={this.props.specializations}
          edit={this.props.edit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    class: state.info.class,
    powers: state.potasp.class_powers,
    talents: state.potasp.talents,
    specializations: state.potasp.specializations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClassPowers: bindActionCreators(actions.setClassPowers, dispatch),
    setTalents: bindActionCreators(actions.setTalents, dispatch),
    setSpecial: bindActionCreators(actions.setSpecial, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PoTaSp);

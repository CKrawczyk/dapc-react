import React, {Component} from 'react';
import ClassPowers from './ClassPowers';
import Talents from './Talents';
import TalentsList from './lib/talents';
import SpecialList from './lib/specializations';

export default class PoTaSp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: ''
    };
  }

  getOutput = () => {
    return {
      class_powers: this.refs.class_powers.getOutput(),
      talents: this.refs.talents.getOutput(),
      specializations: this.refs.specializations.getOutput()
    };
  };

  getInput = (input) => {
    this.refs.class_powers.getInput(input.class_powers);
    this.refs.talents.getInput(input.talents);
    this.refs.specializations.getInput(input.specializations);
  };

  updateClass = (newClass) => {
    this.setState({class: newClass});
  };

  render() {
    return (
      <div className="box">
        <ClassPowers ref="class_powers" c={this.state.class} edit={this.props.edit} />
        <hr />
        <Talents ref="talents" inputList={TalentsList} label="Talents" c={this.state.class} edit={this.props.edit} />
        <hr />
        <Talents
          ref="specializations"
          inputList={SpecialList}
          label="Specializations"
          c={this.state.class}
          edit={this.props.edit}
        />
      </div>
    );
  }
}

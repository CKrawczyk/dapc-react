import React, {Component} from 'react';
import StatBlock from './StatBlock';
import StatFocus from './lib/focus';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    const statValues = {};
    for (const f of StatFocus) {
      statValues[f.name] = {value: 0, focus: [], primary: false};
    }
    this.state = {statValues};
  }

  getOutput = () => {
    return {...this.state.statValues};
  };

  getInput = (input) => {
    this.setState({statValues: {...input}});
  };

  getBlock = () => {
    const blocks = [];
    let i = 0;
    for (const f of StatFocus) {
      blocks.push(
        <StatBlock
          {...f}
          key={i}
          edit={this.props.edit}
          ref={f.name}
          statValues={this.state.statValues[f.name]}
          updateValue={this.updateValue}
          updateFocus={this.updateFocus}
        />
      );
      blocks.push(<hr key={i + 1} />);
      i += 2;
    }
    blocks.pop();
    return blocks;
  };

  updateValue = (name, value) => {
    const currentStatValues = this.state.statValues;
    currentStatValues[name].value = value;
    this.setState({statValues: currentStatValues});
  };

  updateFocus = (name, focus) => {
    const currentStatValues = this.state.statValues;
    currentStatValues[name].focus = focus;
    this.setState({statValues: currentStatValues});
  };

  updateClass = (newClass) => {
    const currentStatValues = this.state.statValues;
    switch (newClass) {
      case 'mage':
        for (const f of StatFocus) {
          if (['Cunning', 'Magic', 'Willpower'].indexOf(f.name) > -1) {
            currentStatValues[f.name].primary = true;
          } else {
            currentStatValues[f.name].primary = false;
          }
        }
        break;
      case 'rogue':
        for (const f of StatFocus) {
          if (['Communication', 'Dexterity', 'Perception'].indexOf(f.name) > -1) {
            currentStatValues[f.name].primary = true;
          } else {
            currentStatValues[f.name].primary = false;
          }
        }
        break;
      case 'warrior':
        for (const f of StatFocus) {
          if (['Constitution', 'Dexterity', 'Strength'].indexOf(f.name) > -1) {
            currentStatValues[f.name].primary = true;
          } else {
            currentStatValues[f.name].primary = false;
          }
        }
        break;
      default:
        for (const f of StatFocus) {
          currentStatValues[f.name].primary = false;
        }
        break;
    }
    this.setState({statValues: currentStatValues});
  };

  render() {
    return (
      <div className="box">
        {this.getBlock()}
      </div>
    );
  }
}

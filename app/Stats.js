import React, {Component} from 'react';
import StatBlock from './StatBlock';
import StatFocus from './lib/focus';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Stats extends Component {
  componentWillReceiveProps = (nextProps) => {
    if (this.props.class !== nextProps.class) {
      this.updateClass(nextProps.class);
    }
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
          statValues={this.props.statValues[f.name]}
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
    this.props.setStat({idx: name, id: 'value', value});
  };

  updateFocus = (name, focus) => {
    this.props.setStat({idx: name, id: 'focus', value: focus});
  };

  updateClass = (newClass) => {
    switch (newClass) {
      case 'mage':
        for (const f of StatFocus) {
          if (['Cunning', 'Magic', 'Willpower'].indexOf(f.name) > -1) {
            this.props.setStat({idx: f.name, id: 'primary', value: true});
          } else {
            this.props.setStat({idx: f.name, id: 'primary', value: false});
          }
        }
        break;
      case 'rogue':
        for (const f of StatFocus) {
          if (['Communication', 'Dexterity', 'Perception'].indexOf(f.name) > -1) {
            this.props.setStat({idx: f.name, id: 'primary', value: true});
          } else {
            this.props.setStat({idx: f.name, id: 'primary', value: false});
          }
        }
        break;
      case 'warrior':
        for (const f of StatFocus) {
          if (['Constitution', 'Dexterity', 'Strength'].indexOf(f.name) > -1) {
            this.props.setStat({idx: f.name, id: 'primary', value: true});
          } else {
            this.props.setStat({idx: f.name, id: 'primary', value: false});
          }
        }
        break;
      default:
        for (const f of StatFocus) {
          this.props.setStat({idx: f.name, id: 'primary', value: false});
        }
        break;
    }
  };

  render() {
    return (
      <div className="box">
        {this.getBlock()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    statValues: state.stats,
    class: state.info.class
  };
}

function mapDispatchToProps(dispatch) {
  return {setStat: bindActionCreators(actions.setStat, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

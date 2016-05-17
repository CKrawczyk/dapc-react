import '../css/index.styl';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Stats from './Stats';
import Info from './Info';
import Utility from './Utility';
import Health from './Health';
import Weapons from './Weapons';
import WeaponGroups from './WeaponGroups';
import PoTaSp from './PoTaSp';
import Equipment from './Equipment';
import Language from './Language';
import Money from './Money';
import Notes from './Notes';
import Spells from './Spells';
import IO from './IO';
import {Col, Row} from 'react-bootstrap';

import {dapcAppWrapper} from './reducers';
import {actions} from './actions';
import {createStore} from 'redux';

const store = createStore(dapcAppWrapper);
store.dispatch(actions.setSpell({idx: 'creation', id: ['focus', 'journeyman', '0'], value: true}));
console.log(store.getState());

class DAPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true
    };
  }

  setClass = (newClass) => {
    this.refs.stats.updateClass(newClass);
    this.refs.potasp.updateClass(newClass);
  };

  handleEdit = (event) => {
    this.setState({edit: event.target.checked});
  };

  handleLoad = (loadFile) => {
    this.refs.info.getInput(loadFile.info);
    this.refs.utility.getInput(loadFile.utility);
    this.refs.health.getInput(loadFile.health);
    this.refs.stats.getInput(loadFile.stats);
    this.refs.weapon_groups.getInput(loadFile.weapon_groups);
    this.refs.weapons.getInput(loadFile.weapons);
    this.refs.potasp.getInput(loadFile.potasp);
    this.refs.equipment.getInput(loadFile.equipment);
    this.refs.language.getInput(loadFile.language);
    this.refs.money.getInput(loadFile.money);
    this.refs.spells.getInput(loadFile.spells);
    this.refs.notes.getInput(loadFile.notes);
  };

  handleSave = (event) => {
    const saveFile = {};
    saveFile.info = this.refs.info.getOutput();
    saveFile.utility = this.refs.utility.getOutput();
    saveFile.health = this.refs.health.getOutput();
    saveFile.stats = this.refs.stats.getOutput();
    saveFile.weapon_groups = this.refs.weapon_groups.getOutput();
    saveFile.weapons = this.refs.weapons.getOutput();
    saveFile.potasp = this.refs.potasp.getOutput();
    saveFile.equipment = this.refs.equipment.getOutput();
    saveFile.language = this.refs.language.getOutput();
    saveFile.money = this.refs.money.getOutput();
    saveFile.spells = this.refs.spells.getOutput();
    saveFile.notes = this.refs.notes.getOutput();
    if (!event) {
      return saveFile;
    }
    this.refs.io.onSave(saveFile, event.target.id);
  };

  render() {
    return (
      <div className="container-fluid root">
        <Row>
          <Col sm={12} md={8}>
            <Info ref="info" edit={this.state.edit} setClass={this.setClass} />
          </Col>
          <Col sm={6} md={4} className="sm-top">
            <Utility ref="utility" edit={this.state.edit} />
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={4} className="sm-up">
            <Row>
              <Col xs={12} smPush={12} mdPush={0}>
                <Health ref="health" edit={this.state.edit} />
              </Col>
              <Col xs={12}>
                <Stats ref="stats" edit={this.state.edit} />
              </Col>
            </Row>
          </Col>
          <Col sm={6} md={4}>
            <WeaponGroups ref="weapon_groups" edit={this.state.edit} />
            <Weapons ref="weapons" />
            <PoTaSp ref="potasp" edit={this.state.edit} />
            <Equipment ref="equipment" />
          </Col>
          <Col sm={6} md={4} smPush={6} mdPush={0} className="sm-up2">
            <Language ref="language" edit={this.state.edit} />
            <Money ref="money" />
            <Spells ref="spells" edit={this.state.edit} overview={false} expand={false} />
            <IO
              ref="io"
              edit={this.state.edit}
              handleEdit={this.handleEdit}
              handleSave={this.handleSave}
              handleLoad={this.handleLoad}
              handleClear={this.handleClear}
            />
          </Col>
          <Col sm={6} md={12} smPull={6} mdPull={0}>
            <Notes ref="notes" />
          </Col>
        </Row>
      </div>
    );
  }
}

render(
  <DAPC />,
  document.getElementById('root')
);

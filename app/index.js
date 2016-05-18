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
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

class DAPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true
    };
  }

  handleEdit = (event) => {
    this.setState({edit: event.target.checked});
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

function configureStore() {
  const store = createStore(dapcAppWrapper);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

const store = configureStore();
const ConnectedDAPC = connect()(DAPC);

render(
  <Provider store={store}>
    <ConnectedDAPC />
  </Provider>,
  document.getElementById('root')
);

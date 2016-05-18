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
            <Info edit={this.state.edit} setClass={this.setClass} />
          </Col>
          <Col sm={6} md={4} className="sm-top">
            <Utility edit={this.state.edit} />
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={4} className="sm-up">
            <Row>
              <Col xs={12} smPush={12} mdPush={0}>
                <Health edit={this.state.edit} />
              </Col>
              <Col xs={12}>
                <Stats edit={this.state.edit} />
              </Col>
            </Row>
          </Col>
          <Col sm={6} md={4}>
            <WeaponGroups edit={this.state.edit} />
            <Weapons />
            <PoTaSp edit={this.state.edit} />
            <Equipment />
          </Col>
          <Col sm={6} md={4} smPush={6} mdPush={0} className="sm-up2">
            <Language edit={this.state.edit} />
            <Money />
            <Spells edit={this.state.edit} overview={false} expand={false} />
            <IO edit={this.state.edit} handleEdit={this.handleEdit} />
          </Col>
          <Col sm={6} md={12} smPull={6} mdPull={0}>
            <Notes />
          </Col>
        </Row>
      </div>
    );
  }
}

function configureStore() {
  const store = createStore(dapcAppWrapper, undefined,
    window.devToolsExtension ? window.devToolsExtension() : undefined);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
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

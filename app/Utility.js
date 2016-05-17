import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Utility extends Component {
  handleInputChange = (event) => {
    this.props.setUtility({id: event.target.id, value: event.target.value});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Defense"
              id="defense"
              value={this.props.utility.defense}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Armor"
              id="armor"
              value={this.props.utility.armor}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="Speed"
              id="speed"
              value={this.props.utility.speed}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
          <Col xs={6}>
            <Input
              type="text"
              addonBefore="AP"
              id="ap"
              value={this.props.utility.ap}
              onChange={this.handleInputChange}
              disabled={!this.props.edit}
            />
          </Col>
        </Row>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {utility: state.utility};
}

function mapDispatchToProps(dispatch) {
  return {setUtility: bindActionCreators(actions.setUtility, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Utility);

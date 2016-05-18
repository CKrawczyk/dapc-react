import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Equipment extends Component {
  handleInputChange = (event) => {
    this.props.setEquipment({id: 'notes', value: event.target.value});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Equipment</span>
          </Col>
          <Col xs={12}>
            <Input
              className="equipment"
              type="textarea"
              rows="8"
              value={this.props.equipment}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {equipment: state.equipment};
}

function mapDispatchToProps(dispatch) {
  return {setEquipment: bindActionCreators(actions.setEquipment, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Equipment);

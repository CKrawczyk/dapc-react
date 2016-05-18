import React, {Component} from 'react';
import {Col, Row, Input} from 'react-bootstrap';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Notes extends Component {
  handleInputChange = (event) => {
    // this.setState({notes: event.target.value});
    this.props.setNote({id: 'notes', value: event.target.value});
  };

  render() {
    return (
      <div className="box">
        <Row>
          <Col xs={12}>
            <span className="heading">Notes</span>
          </Col>
          <Col xs={12}>
            <Input
              className="notes"
              type="textarea"
              rows="17"
              value={this.props.notes}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {notes: state.notes};
}

function mapDispatchToProps(dispatch) {
  return {setNote: bindActionCreators(actions.setNote, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

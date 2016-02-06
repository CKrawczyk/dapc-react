import React, {Component} from 'react';
import {Col, Row, Button, ButtonGroup, Alert} from 'react-bootstrap';
import Toggle from 'react-toggle';
import FileInput from 'react-file-reader-input';
import Blank from 'json!./lib/blank.json';

const client = new Dropbox.Client({key: '1me738olt2sslgm'});

export default class IO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: client.isAuthenticated(),
      alertSaveVisible: false,
      alertConnectVisible: false,
      alertErrorVisible: false
    };
  }

  onUpload = (event, result) => {
    if (result.length > 0) {
      this.props.handleLoad(JSON.parse(result[0][0].target.result));
    }
  };

  onSave = (saveFile, type) => {
    const json = JSON.stringify(saveFile, null, '  ');
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    let saveName = 'save.json';
    if (saveFile.info.name) {
      saveName = `${this.sanitize(saveFile.info.name)}.json`;
    }
    switch (type) {
      case 'download':
        this.saveAs(url, saveName);
        break;
      case 'dropbox':
        client.writeFile(saveName, json, this.onError);
        break;
      default:
        break;
    }
  };

  onError = (errorMessage, event) => {
    if (errorMessage) {
      console.log(errorMessage);
      this.setState({alertErrorVisible: true});
    } else if (event.name) {
      this.setState({alertSaveVisible: true});
    }
  };

  connectDropbox = () => {
    client.authenticate({interactive: true}, this.onError);
    if (client.isAuthenticated()) {
      this.setState({alertConnectVisible: true, connected: true});
    }
  };

  handleClear = () => {
    // make sure to clone blank.json before loading
    const copy = JSON.parse(JSON.stringify(Blank));
    this.props.handleLoad(copy);
  };

  handleAlertDismiss = () => {
    this.setState({alertSaveVisible: false, alertConnectVisible: false, alertErrorVisible: false});
  };

  saveAs = (uri, filename) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = filename;
      link.href = uri;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      window.open(uri);
    }
  };

  sanitize = (input, replacment = '') => {
    const illegalRe = /[\/\?<>\\:\*\|":']/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    return input
    .replace(' ', '_')
    .replace(illegalRe, replacment)
    .replace(controlRe, replacment)
    .replace(reservedRe, replacment)
    .replace(windowsReservedRe, replacment);
  };

  render() {
    let alertSave = undefined;
    if (this.state.alertSaveVisible) {
      alertSave = (
        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
          <span className="heading">File Saved!</span>
        </Alert>
      );
    }
    let alertConnect = undefined;
    if (this.state.alertConnectVisible) {
      alertConnect = (
        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
          <span className="heading">Connected to Dropbox!</span>
        </Alert>
      );
    }
    let alertError = undefined;
    if (this.state.alertErrorVisible) {
      alertError = (
        <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
          <span className="heading">Error, check console</span>
        </Alert>
      );
    }
    return (
      <div>
        <div className="box">
          <Row>
            <Col xs={12}>
              <span className="heading">File In/Out</span>
            </Col>
            <Col xs={2} className="reduce-right-pad">
              <span id="edit-label" className="edit-label">Edit</span>
            </Col>
            <Col xs={2} className="reduce-left-pad">
              <Toggle defaultChecked={this.props.edit} onChange={this.props.handleEdit} aria-labelledby="edit-label" />
            </Col>
            <Col xs={8}>
              <ButtonGroup justified={true}>
                <ButtonGroup>
                  <Button onClick={this.props.handleSave} id="download">Save</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <FileInput as="text" onChange={this.onUpload}>
                    <Button className="no-radius">Load</Button>
                  </FileInput>
                </ButtonGroup>
                <ButtonGroup>
                  <Button onClick={this.handleClear}>Clear</Button>
                </ButtonGroup>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
        <div className="box">
          <Row>
            <Col xs={12}>
              <span className="heading">Dropbox</span>
            </Col>
            <Col xs={12}>
              <ButtonGroup justified={true}>
                <ButtonGroup>
                  <Button onClick={this.connectDropbox} block={true}>
                    <i className="fa fa-dropbox"></i>
                    Connect to Dropbox
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={this.props.handleSave}
                    id="dropbox"
                    disabled={!this.state.connected}
                    block={true}
                  >
                    <i className="fa fa-dropbox"></i>
                    Save to Dropbox
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
              {alertError}
              {alertConnect}
              {alertSave}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

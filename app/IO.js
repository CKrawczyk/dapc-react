import React, {Component} from 'react';
import {Col, Row, Button, ButtonGroup, Alert} from 'react-bootstrap';
import Toggle from 'react-toggle';
import FileInput from 'react-file-reader-input';
import Blank from 'json!./lib/blank.json';
import {actions} from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DropboxAPI from 'dropbox';
import getHashParams from './getHashParams';

class IO extends Component {
  constructor(props) {
    super(props);
    const hash = getHashParams(window.location.hash);
    const accessToken = hash.access_token;
    let dbx = null;
    if (!!accessToken) {
      dbx = new DropboxAPI({accessToken});
    }
    this.state = {
      connected: !!accessToken,
      dbx,
      alertSaveVisible: false,
      alertConnectVisible: !!accessToken,
      alertErrorVisible: false
    };
  }

  onUpload = (event, result) => {
    if (result.length > 0) {
      this.props.loadData(JSON.parse(result[0][0].target.result));
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
        this.state.dbx.filesUpload({path: `/${saveName}`, contents: json})
          .then(() => {
            this.setState({alertSaveVisible: true});
          })
          .catch((error) => {
            console.error(error);
            this.setState({alertErrorVisible: true});
          });
        break;
      default:
        break;
    }
  };

  connectDropbox = () => {
    console.log('here');
    const dbx = new DropboxAPI({clientId: '1me738olt2sslgm'});
    let url = dbx.getAuthenticationUrl('http://localhost:5000/');
    if (process.env.NODE_ENV === 'production') {
      url = dbx.getAuthenticationUrl('https://www.icg.port.ac.uk/~krawcyzc/dapc2/');
    }
    console.log(url);
    window.location.assign(url);
  };

  handleClear = () => {
    const copy = JSON.parse(JSON.stringify(Blank));
    this.props.loadData(copy);
  };

  handleAlertDismiss = () => {
    this.setState({alertSaveVisible: false, alertConnectVisible: false, alertErrorVisible: false});
  };

  handleSave = (event) => {
    this.onSave(this.props.dapc, event.target.id);
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

  quickLoad = () => {
    const input = window.localStorage.dapcQuickSave;
    if (input) {
      this.props.loadData(JSON.parse(input));
    }
  };

  quickSave = () => {
    const json = JSON.stringify(this.props.dapc, null, '  ');
    window.localStorage.dapcQuickSave = json;
  };

  printableNav = () => {
    this.quickSave();
    let url = `${window.location.href}print.html`;
    const location = window.location.href;
    if (location.indexOf('index.html') > -1) {
      url = window.location.href.replace('index', 'print');
    }
    window.open(url, '_blank');
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
    let local = undefined;
    if (window.localStorage) {
      local = (
        <div className="box">
          <Row>
            <Col xs={12}>
              <span className="heading">Quick Save/Load</span>
            </Col>
            <Col xs={12}>
              <ButtonGroup justified={true}>
                <ButtonGroup>
                  <Button
                    onClick={this.quickSave}
                    block={true}
                  >
                    Quick Save
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={this.printableNav}
                    block={true}
                  >
                    Pritable version
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={this.quickLoad}
                    block={true}
                  >
                    Quick Load
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div>
        {local}
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
                  <Button onClick={this.handleSave} id="download">Save</Button>
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
                    onClick={this.handleSave}
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

function mapStateToProps(state) {
  return {dapc: state};
}

function mapDispatchToProps(dispatch) {
  return {loadData: bindActionCreators(actions.loadData, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(IO);

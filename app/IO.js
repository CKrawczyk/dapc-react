import React, {Component} from 'react';
import {Col, Row, Button, ButtonGroup} from 'react-bootstrap';
import Toggle from 'react-toggle';
import FileInput from 'react-file-reader-input';
import Blank from 'json!./lib/blank.json';

export default class IO extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onUpload = (event, result) => {
    if (result.length > 0) {
      this.props.handleLoad(JSON.parse(result[0][0].target.result));
    }
  };

  onSave = (saveFile) => {
    const json = JSON.stringify(saveFile, null, '  ');
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    let saveName = 'save.json';
    if (saveFile.info.name) {
      saveName = `${this.sanitize(saveFile.info.name)}.json`;
    }
    this.saveAs(url, saveName);
  };

  handleClear = () => {
    // make sure to clone blank.json before loading
    const copy = JSON.parse(JSON.stringify(Blank));
    this.props.handleLoad(copy);
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
    return (
      <div className="box">
        <Row>
          <Col xs={2} className="reduce-right-pad">
            <span id="edit-label" className="edit-label">Edit</span>
          </Col>
          <Col xs={2} className="reduce-left-pad">
            <Toggle defaultChecked={this.props.edit} onChange={this.props.handleEdit} aria-labelledby="edit-label" />
          </Col>
          <Col xs={8}>
            <ButtonGroup justified={true}>
              <ButtonGroup>
                <Button onClick={this.props.handleSave}>Save</Button>
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
    );
  }
}

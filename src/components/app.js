import React, { Component } from 'react';
import Fileupload from './file-uploader/';
import TestFileUploader from './test-file-uploader/test-fileuploader.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <TestFileUploader />
      </div>
    );
  }
}

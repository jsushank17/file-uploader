import React, { Component } from 'react';

/* Importing SCSS File */
import './styles/style.scss';

/* Importing image */
import UploadImage from '../images/icon-upload.png';
import FileLogo from '../images/icon-line-resume.png';
import footerLogo from '../images/PurpleSquirrel-Logo.png';
import buttonGif from '../images/button-loader.gif';

class Fileupload extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      'fields': {
        upload,
        FirstName,
        email
      }
    } = this.props;

    /* File size manipulation*/
    let fileSizeKB;
    upload.value && upload.value[0] ?
    fileSizeKB = this.bytesToSize(upload.value[0].size)
    : "" ;

    /* Variables for creating substring */
    let stringFileName = upload.value && upload.value.length > 0 ? upload.value[0].name : 'Upload Your Resume';
    let fileName = stringFileName.length > 18 ? stringFileName.substr(0, 18) + '...' : stringFileName;

    return(
      <div>
        <div className={`form-group ${upload.touched && upload.invalid ? 'has-error' : ''}`}>
          <div className="filewrap">
            {
              upload.value && upload.value.length > 0 ?
              <img src={FileLogo} alt="Upload Resume"/> :
              <img src={UploadImage} alt="Upload Resume"/>
            }
            <span ref="resumeText" title={ stringFileName ? stringFileName : ''} className="file-text">{ fileName }</span>
            <p ref="resumeSize" className="file-size">{ fileSizeKB ? `(${fileSizeKB})` : "" }</p>
            <input
              ref="resumeFile"
              id="files-upload"
              type="file"
              className={`validate files-upload ${upload.value && upload.value[0] ? 'hide-input': ''}`}
              accept="application/pdf"
              {...upload}
              value={null}
              onChange={this.onInputChange}/>
            {
              upload.value && upload.value[0] ?
              <div ref="ProgressBar" id="progress-bar-wrapper">
                <div id="progress-bar"></div>
              </div>
              : ''
            }
            {
              upload.value && upload.value[0] ?
              <span className="close" title="Remove" onClick={this.onClose}>&times;</span>
              : ''
            }
          </div>
          <div className="error-message">
            {upload.touched ? upload.error : ''}
          </div>
          <div className="file-input-info"> Accepted file type: PDF.</div>
        </div>
      </div>
    );
  }
}

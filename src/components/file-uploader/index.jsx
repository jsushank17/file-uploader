import React, { Component } from 'react';

/* Redux Form Package */
import {
  reduxForm,
  change
} from 'redux-form';

/* Importing SCSS File */
import './styles/style.scss';

/* Importing image */
import UploadImage from '../images/icon-upload.png';
import FileLogo from '../images/icon-line-resume.png';

class Fileupload extends Component {
  constructor(props) {
    super(props);

    /* Binding functions */
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /* On submit functin */
  onSubmit(props) {
    Console.log("Submitted");
  }

  /* On change of input field of file upload get the value of resume uploaded. */
  onInputChange(event) {
    const { 'fields': { upload } } = this.props;
    upload.onChange(event.target.files);
    this.setState({
      'uploadImageStatus': true
    });

    setTimeout(
      function(){
        var elem = document.getElementById("progress-bar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= 100) {
              clearInterval(id);
          } else {
              width++;
              elem.style.width = width + '%';
          }

          /* Purple Color background on progress complete */
          if (elem.style.width === '100%') {
            const progressBar = document.getElementById("progress-bar");
            progressBar.className += " progress-complete";
          }
        }
      },200
    );
  }

  /* By clicking on cross button image, cancel the file uploaded in input field */
  onClose(e) {
    e.stopPropagation();
    this.props.dispatch(change('NewSignupForm', 'upload', null));
    this.refs.resumeText.innerText = "Upload Your Resume";
    this.refs.resumeSize.innerText = "";
    this.setState({
      'uploadImageStatus': false
    });

    /* Clearing Input File Upload */
    document.getElementById('files-upload').value = null;
  }

  /* Function for calculating file size */
  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  render() {

    const {
      'fields': {
        upload,
        FirstName,
        email
      },
      handleSubmit
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
        <form onSubmit={ handleSubmit(this.onSubmit) } noValidate>
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
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // body...
}

export default reduxForm({
  'form': 'Fileuploadform',
  'fields': ['upload']
}, mapStateToProps, null)(Fileupload);

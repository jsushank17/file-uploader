import React, {Component} from 'react';
import Fileupload from '../file-uploader/';

/* Importing image */
import UploadImage from '../images/icon-upload.png';
import FileLogo from '../images/icon-line-resume.png';

class TestFileUploader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Fileupload
          initialFileImage={UploadImage}
          uploadFileImage={FileLogo}
          welcomeText="Choose your file"
          loaderInitialColor="#000fff"
          loaderCompleteColor="#cfcfcf"
          fileSizeLimit="3000"
        />
      </div>
    );
  }
}

export default TestFileUploader;

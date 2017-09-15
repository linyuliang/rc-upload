/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      fileList:[{
        thumbUrl:"http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d",
        uid:"http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d",
        url:"http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d"
      }]
    }
  }

  onSuccess = (response, file) => {
    console.log(response);
  }

  onProgress = (e, file) => {
    console.log(e.percent);
  }

  onError = (error, response, file) => {
    console.log('error:',response);
  }

  render() {
    const { fileList, action } = this.state;
    const props = {
      action: action,
      fileList: fileList,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
    };
    console.log(props.action);
    return (
      <div>
        <a onClick={()=>{
          this.setState({
            action: "http://betacs.101.com/v0.1/upload?scope=1&session=fdc5f370-4d0e-4ce3-a7f2-e9418a94f7bc&name=0.5166533120757633&path=/dev_content_diyform"
          })
        }}>修改action</a>
        <Upload {...props}>
          <div>
            <div className="ant-upload-text">选择文件</div>
          </div>
        </Upload>
      </div>
      );
  }
}

ReactDOM.render(<Test/>, document.getElementById('__react-content'));

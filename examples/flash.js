/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '@gem-mine/rc-upload';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      fileList: [{
        thumbUrl: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d',
        uid: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d',
        url: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d',
      }],
    };
  }

  onSuccess = (response, file) => {
    console.log(response, file);
  }

  onProgress = (e, file) => {
    console.log(e.percent, file);
  }

  onError = (error, response, file) => {
    console.log('error:', response, file);
  }

  render() {
    const { fileList } = this.state;
    const props = {
      action: () => {
        return 'http://localhost/upload.php';
      },
      flash: {
        fileSize: 0, // [0,"1 MB","5 MB","10 MB"]
        maxFileNum: 5,
        fileTypes: 'all', // "img":"图片文件","excel":"Excel文件","all":"所有类型文件"
        flash_url: 'http://localhost:8020/swfupload/swfupload.swf',
        flash9_url: 'http://localhost:8020/swfupload/swfupload_fp9.swf',
      },
      fileList,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
    };
    return (
      <div>
        <a
          onClick={() => {
            this.setState({
              action: 'http://betacs.101.com/v0.1/upload?scope=1&session=04140e3d-8e55-4def-9640-f27411e02379&name=0.5166533120757633&path=/dev_content_diyform',
            });
          }}
        >
          修改action
        </a>
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

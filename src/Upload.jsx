import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AjaxUpload from './AjaxUploader';
import IframeUpload from './IframeUploader';
import FlashUploader from './FlashUploader';

function empty() {
}

class Upload extends Component {
  static propTypes = {
    component: PropTypes.string,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    name: PropTypes.string,
    multipart: PropTypes.bool,
    directory: PropTypes.bool,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onProgress: PropTypes.func,
    onStart: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    headers: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    beforeUpload: PropTypes.func,
    customRequest: PropTypes.func,
    onReady: PropTypes.func,
    withCredentials: PropTypes.bool,
    supportServerRender: PropTypes.bool,
    openFileDialogOnClick: PropTypes.bool,
    flash: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    component: 'span',
    prefixCls: 'rc-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onReady: empty,
    onStart: empty,
    onError: empty,
    onSuccess: empty,
    supportServerRender: false,
    multiple: false,
    beforeUpload: null,
    customRequest: null,
    withCredentials: false,
    openFileDialogOnClick: true,
    flash: true,
  }

  state = {
    Component: null,
  }

  componentDidMount() {
    if (this.props.supportServerRender) {
      /* eslint react/no-did-mount-set-state:0 */
      this.setState({
        Component: this.getComponent(),
      }, this.props.onReady);
    }
  }

  getComponent() {
    let FinalUploader = null;
    if (typeof File !== 'undefined') {
      FinalUploader = AjaxUpload;
    } else if (FlashUploader && this.props.flash) {
      FinalUploader = FlashUploader;
    } else {
      FinalUploader = IframeUpload;
    }

    return FinalUploader;
  }

  abort(file) {
    this.uploader.abort(file);
  }

  saveUploader = (node) => {
    this.uploader = node;
  }

  render() {
    if (this.props.supportServerRender) {
      const ComponentUploader = this.state.Component;
      if (ComponentUploader) {
        return <ComponentUploader {...this.props} ref={this.saveUploader} />;
      }
      return null;
    }
    const ComponentUploader = this.getComponent();
    return <ComponentUploader {...this.props} ref={this.saveUploader} />;
  }
}

export default Upload;

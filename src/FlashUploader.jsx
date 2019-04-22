/* eslint react/sort-comp:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import loadJS from '@sdp.nd/js-async-loader';
import getUid from './uid';
import getMyOptions from './getMyOptions';

const FLASH_OTHER_STYLE = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
};

const FLASH_STYLE = {};

// diferent from AjaxUpload, can only upload on at one time, serial seriously
class FlashUploader extends Component {
  static propTypes = {
    component: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    accept: PropTypes.string,
    onStart: PropTypes.func,
    multiple: PropTypes.bool,
    children: PropTypes.any,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    flash: PropTypes.object,
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    name: PropTypes.string,
  }

  state = { uid: getUid(), uploading: false }

  file = {}

  Flash = {}

  _dom = {}

  swfLoader = async () => {
    const { swfobjectUrl, swfuploadUrl } = this.props.flash;
    await loadJS(swfobjectUrl
      || `//cdncs.101.com/v0.1/static/fish/script/swfupload/swfobject.min.js`);
    await loadJS(swfuploadUrl
      || `//cdncs.101.com/v0.1/static/fish/script/swfupload/swfupload.min.js`, 'SWFUpload');
    return window.SWFUpload;
  }

  componentDidMount() {
    this.swfLoader().then(() => {
      this.updateFlashWH();
      this.initFlash();
    });
  }

  componentDidUpdate() {
    this.updateFlashWH();
    // ie8/9 reset props chenwei
    if (!this.state.uploading) {
      this.initFlash();
    }
  }

  onloadDom = (_dom) => {
    if (!_dom) {
      return;
    }
    this._dom = _dom;
  }

  initFlash() {
    this.endUpload();
    const lastFlash = this.Flash;
    this._dom.innerHTML = `<div id=${this.state.uid}></div>`;
    const SWFUpload = window.SWFUpload;

    const { flash, ...restProps } = this.props;
    let flashProps = null;
    if (flash) {
      const {
        flash_url = '//cdncs.101.com/v0.1/static/fish/script/swfupload/swfupload.swf', // eslint-disable-line
        flash9_url = '//cdncs.101.com/v0.1/static/fish/script/swfupload/swfupload_fp9.swf', // eslint-disable-line
        ...flashRestProps,
      } = flash;
      flashProps = {
        flash_url,
        flash9_url,
        ...flashRestProps,
      };
    }
    this.Flash = new SWFUpload(getMyOptions({
      flash: flashProps,
      ...restProps,
    }, {
      id: this.state.uid,
      style: FLASH_STYLE,
      file: this.file,
      changeStart: this.startUpload,
      changeEnd: this.endUpload,
    }));
    setTimeout(() => {
      if (lastFlash.destroy) {
        lastFlash.destroy();
      }
    }, 0);
  }

  endUpload = () => {
    if (this.state.uploading) {
      this.file = {};
      // hack avoid batch
      this.state.uploading = false;
      this.setState({
        uploading: false,
      });
    }
  }

  startUpload = () => {
    if (!this.state.uploading) {
      this.state.uploading = true;
      this.setState({
        uploading: true,
      });
    }
  }

  updateFlashWH() {
    const rootNode = ReactDOM.findDOMNode(this);
    FLASH_STYLE.height = rootNode.offsetHeight;
    FLASH_STYLE.width = rootNode.offsetWidth;
  }

  abort(file) {
    if (file) {
      let uid = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      if (uid === this.file.uid) {
        this.initFlash();
      }
    } else {
      this.initFlash();
    }
  }

  render() {
    const {
      component: Tag, disabled, className,
      prefixCls, children, style,
    } = this.props;
    const flashStyle = {
      ...FLASH_OTHER_STYLE,
      // display: this.state.uploading || disabled ? 'none' : '',
      // display: disabled ? 'none' : '',
    };
    if (disabled) {
      flashStyle.position = 'absolute';
      flashStyle.top = '-1000px';
    }

    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });
    return (
      <Tag
        className={cls}
        style={{ position: 'relative', zIndex: 0, ...style }}
      >
        <div ref={this.onloadDom} style={flashStyle}></div>
        {children}
      </Tag>
    );
  }
}

export default FlashUploader;

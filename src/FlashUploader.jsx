/* eslint react/sort-comp:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import getUid from './uid';
import getMyoptions from './getMyoptions';
import warning from 'warning';

const Flash_Other_STYLE = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9999,
};

const Flash_STYLE = {}

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
    data: PropTypes.object,
    flash: PropTypes.object,
    action: PropTypes.string,
    name: PropTypes.string,
  }

  state = { uid: getUid() , uploading: false}

  file = {}

  Flash = {}

  _dom = {}

  componentDidMount() {
    this.updateFlashWH();
  }

  componentDidUpdate() {
    this.updateFlashWH();
    // ie8/9 reset props chenwei
    this.state.uploading || this.initFlash();
  }

  onloadDom = (_dom) => {
    if (!_dom){return;}
    this._dom = _dom;
    this.updateFlashWH();
    this.initFlash();
  }

  initFlash(){
    this.endUpload();
    let lastFlash = this.Flash;
    this._dom.innerHTML=`<div id=${this.state.uid}></div>`;
    this.Flash = new SWFUpload(getMyoptions(this.props, {
      id: this.state.uid,
      style: Flash_STYLE,
      file: this.file,
      changeStart: this.startUpload,
      changeEnd: this.endUpload
    }));
    setTimeout(function(){
      lastFlash.destroy && lastFlash.destroy();
    },0)
  }

  endUpload = () =>{
    if (this.state.uploading) {
      this.file = {};
      // hack avoid batch
      this.state.uploading = false;
      this.setState({
        uploading: false,
      });
    }
  }

  startUpload = () =>{
    if (!this.state.uploading) {
      this.state.uploading = true;
      this.setState({
        uploading: true,
      });
    }
  }

  updateFlashWH() {
    const rootNode = ReactDOM.findDOMNode(this);
    Flash_STYLE.height = rootNode.offsetHeight;
    Flash_STYLE.width = rootNode.offsetWidth;
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
      ...Flash_Other_STYLE,
      //display: this.state.uploading || disabled ? 'none' : '',
      display: disabled ? 'none' : '',
    };
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });
    return (
      <Tag
        className={cls}
        style={{ position: 'relative',display:'block', zIndex: 0, ...style }}
      >
        <div ref={this.onloadDom}  style={flashStyle}></div>
        {children}
      </Tag>
    );
  }
}

export default FlashUploader;

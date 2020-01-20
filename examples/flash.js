webpackJsonp([3],{

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gem_mine_rc_upload__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gem_mine_rc_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__gem_mine_rc_upload__);




/* eslint no-console:0 */





var Test = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Test, _React$Component);

  function Test(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Test);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this.onSuccess = function (response, file) {
      console.log(response, file);
    };

    _this.onProgress = function (e, file) {
      console.log(e.percent, file);
    };

    _this.onError = function (error, response, file) {
      console.log('error:', response, file);
    };

    _this.state = {
      action: '',
      fileList: [{
        thumbUrl: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d',
        uid: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d',
        url: 'http://betacs.101.com/v0.1/download?dentryId=5e80b7f4-81fb-4767-9eff-87cdffa8b06d'
      }]
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Test, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fileList = this.state.fileList;

      var props = {
        action: function action() {
          return 'http://localhost/upload.php';
        },
        flash: {
          fileSize: 0, // [0,"1 MB","5 MB","10 MB"]
          maxFileNum: 5,
          fileTypes: 'all', // "img":"图片文件","excel":"Excel文件","all":"所有类型文件"
          flash_url: 'http://localhost:8020/swfupload/swfupload.swf',
          flash9_url: 'http://localhost:8020/swfupload/swfupload_fp9.swf'
        },
        fileList: fileList,
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess
      };
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'a',
          {
            onClick: function onClick() {
              _this2.setState({
                action: 'http://betacs.101.com/v0.1/upload?scope=1&session=04140e3d-8e55-4def-9640-f27411e02379&name=0.5166533120757633&path=/dev_content_diyform'
              });
            }
          },
          '\u4FEE\u6539action'
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6__gem_mine_rc_upload___default.a,
          props,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'div',
              { className: 'ant-upload-text' },
              '\u9009\u62E9\u6587\u4EF6'
            )
          )
        )
      );
    }
  }]);

  return Test;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Test, null), document.getElementById('__react-content'));

/***/ })

},[191]);
//# sourceMappingURL=flash.js.map
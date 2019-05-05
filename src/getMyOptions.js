/* eslint-disable */
import getUid from './uid';

export default function getMyOptions(props, obj) {
  let {id, style, file, changeStart, changeEnd} = obj;
  let nowFile = {};
  let nowFileList = [];

  const MyOptions = {
    debug: false,
    //上传文件大小
    // file_size_limit: [0, "1 MB", "5 MB", "10 MB"][props.flash.fileSize || 0],
    //添加文件最多数目
    file_upload_limit: 0,
    button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
    //按钮外观
    button_placeholder_id: id,
    button_image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=",
    button_width: style.width,
    button_height: style.height,
    //上传文件类型
    // file_types: (function (fileTypes) {
    //   return {
    //     "img": "*.jpg;*.jpeg;*.png;*.gif;",
    //     "excel": "*.xls;*.xlsx",
    //     "all": "*.jpg;*.jpeg;*.png;*.gif;*.doc;*.docx;*.xls;*.xlsx;*.ppt;*.pptx;*.rar;*.7z;*.zip;*.txt;*.chm;*.pdf;*.epub;*.image"
    //   }[fileTypes || "all"] || fileTypes;
    // })(props.flash.fileTypes),
    // 文件选取窗口中显示的文件类型描述
    file_types_description: props.flash.file_types_description || "",
    //额外参数
    post_params: {}, // 不能直接传入，因为需要nowFile参数
    file_post_name: props.name || "file",
    //上传服务端地址
    upload_url: props.action,
    //FLASH地址
    flash_url: props.flash.flash_url,
    flash9_url: props.flash.flash9_url
  };
  //属性配置结束
  //方法配置开始
  //环境检测完毕 flash加载前
  MyOptions.swfupload_preload_handler = function () {
    //flash支持情况
    if (!this.support.loading) {
      alert('flash未安装或版本过低');
      return false;
    }
  };
  //正确装载SWFUpload
  MyOptions.swfupload_loaded_handler = function () {
    // this.setStats({"successful_uploads": MyfileData.length});
    // if(MyCangetData_maxnum&&MyCangetData_num>=MyCangetData_maxnum){
    //     this.setButtonDisabled(true);
    // }
  }
  //未正确装载SWFUpload
  MyOptions.swfupload_load_failed_handler = function () {
    alert('上传插件未正确加载,请尝试刷新页面');
  };
  //文件选择对话框显示之前触发
  MyOptions.file_dialog_start_handler = function () {
    // this.setFileUploadLimit(maxFileNum);
  };
  //文件选择对话框关闭之后触发
  // number of files selected, number of files queued, number of files Inqueued
  MyOptions.file_dialog_complete_handler = function () {
    // //正确队列文件数为空
    // if(arguments[2]<1){return false;}
    // //正确队列文件数超过限定数
    // if(MyCangetData_maxnum&&MyCangetData_num>MyCangetData_maxnum){show_err(0);clearData(this);return false;}
    // fileBox&&fileBoxHtml(MyfileData);
    // action 参数是异步的情况
    const that = this;
    function post () {
      new Promise(resolve => {
        const { action } = props;
        if (typeof action === 'function') {
          return resolve(action(nowFile));
        }
        resolve(action);
      }).then(action => {
        let propsData = props.data;
        if (typeof propsData === 'function') {
          propsData = propsData(nowFile);
        }

        that.setUploadURL(action); // 动态设置upload_url
        that.setPostParams(propsData || {}); // 动态设置post_params
        that.startUpload();
        props.onStart && props.onStart(nowFile);
      })
    }

    changeStart();
    if (!props.beforeUpload) {
      return post();
    }
    // 处理 beforeUpload 参数是异步的情况
    const before = props.beforeUpload(nowFile, nowFileList);
    if (before && before.then) {
      before.then(() => {
        post();
      }, () => {
        changeEnd();
      });
    } else if (before !== false) {
      post();
    } else {
      changeEnd();
    }

  };
  // 每次选择的文件成功加入上传队列触发
  MyOptions.file_queued_handler = function (_file) {//file object
    nowFile = _file;
    nowFile.uid = getUid();
    file.uid = nowFile.uid;
    file.name = nowFile.name;

    nowFileList.push(_file);

    changeStart();
    // 原先如果写在这里的话，那么每次即使beforeUpload取消上传了，依然会触发下，导致preview一闪而过
    // props.onStart && props.onStart(nowFile);
    // MyCangetData_num++;
    // var _file=arguments[0];

    // MyfileDataMap["index_"+_file.index]=MyfileData.push({"fileName":_file.name,"progress":0});
    // if(MyCangetData_maxnum&&MyCangetData_num>=MyCangetData_maxnum){this.setButtonDisabled(true);}
  };
  //每次选择的文件失败加入上传队列触发
  //file object, error code, message
  MyOptions.file_queue_error_handler = function () {
    //-100数目 -110大小 -120 0字节 -130无效类型
    //console.log('file_queue_error_handler',arguments[1]);
    // if(arguments[1]=="-110"){show_err(3);}
    // if(arguments[1]=="-120"){show_err(2);}
    // if(arguments[1]=="-130"){show_err(4);}
  };
  //上传开始前
  MyOptions.upload_start_handler = function () {//file object
    // 移除原来的beforeUpload代码; 因为不支持异步，故移到关闭弹窗事件中处理
    // if (props.beforeUpload) {
    //   return props.beforeUpload(nowFile);
    // }
    // var _file=arguments[0];

    // fnBegin(_file);
    // fileBox&&$files.eq(MyfileDataMap["index_"+_file.index]-1).next().next().css("color","#555555");
  };
  //上传中
  //file object, bytes complete, total bytes
  MyOptions.upload_progress_handler = function (_file, p1, p2) {
    if (props.onProgress) {
      return props.onProgress({percent: parseInt(p1 / p2 * 100)}, nowFile);
    }
    // var _file=arguments[0];
    // var _index=MyfileDataMap["index_"+_file.index]-1;

    // var pre=parseInt(arguments[1]/arguments[2]*100);


    // MyfileData[_index].progress=pre;
    // fileBox&&$files.eq(_index).stop().animate({"width":pre+"%"},500);
  };
  //上传失败
  MyOptions.upload_error_handler = function (_file, code, message) {//file object, error code, message
    changeEnd();
    if (props.onError) {
      return props.onError(code, message, nowFile);
    }
  };
  //上传成功
  //file object, server data
  MyOptions.upload_success_handler = function () {
    // var _file = arguments[0];
    var oRes = eval('(' + arguments[1] + ')');
    if (props.onSuccess) {
      return props.onSuccess(oRes, nowFile);
    }
  };
  //上传完成
  MyOptions.upload_complete_handler = function () {//file object
    changeEnd();
    //console.log('files_queued',this.getStats().files_queued);
    //this.getStats().files_queued==0&&MyfileData.length&&fnSuccess(MyfileData);
  };

  return MyOptions;
}

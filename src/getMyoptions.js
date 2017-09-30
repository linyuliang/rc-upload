/* eslint-disable */
import getUid from './uid';
export default function getMyoptions(props, obj) {
    let {id, style, file, changeStart, changeEnd} = obj;
    let nowfile ={};
    var Myoptions={
        debug: false,
        //上传文件大小
        file_size_limit: [0,"1 MB","5 MB","10 MB"][props.flash.fileSize || 0],
        //添加文件最多数目
        file_upload_limit: 0,
        button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
        //按钮外观
        button_placeholder_id: id,
        button_image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=",
        button_width: style.width,
        button_height: style.height,
        //上传文件类型
        file_types:{"img":"*.jpg;*.jpeg;*.png;*.gif;","excel":"*.xls;*.xlsx","all":"*.jpg;*.jpeg;*.png;*.gif;*.doc;*.docx;*.xls;*.xlsx;*.ppt;*.pptx;*.rar;*.7z;*.zip;*.txt;*.chm;*.pdf;*.epub;*.image"}[props.flash.fileTypes||"all"],
        //上传文件类型说明
        file_types_description:{"img":"图片文件","excel":"Excel文件","all":"所有类型文件"}[props.flash.fileTypes||"all"],
        //额外参数
        post_params: props.data || {},
        file_post_name : props.name || "file",
        //上传服务端地址
        upload_url : props.action,
        //FLASH地址
        flash_url: props.flash.flash_url,
        flash9_url: props.flash.flash9_url
    };
    //属性配置结束
    //方法配置开始
    //环境检测完毕 flash加载前
    Myoptions.swfupload_preload_handler = function(){
        //flash支持情况
        if (!this.support.loading) {
            alert('flash未安装或版本过低');
            return false;
        }
    };
    //正确装载SWFUpload
    Myoptions.swfupload_loaded_handler = function(){
        // this.setStats({"successful_uploads": MyfileData.length});
        // if(MyCangetData_maxnum&&MyCangetData_num>=MyCangetData_maxnum){
        //     this.setButtonDisabled(true);
        // }
    }
    //未正确装载SWFUpload
    Myoptions.swfupload_load_failed_handler = function(){
        alert('上传插件未正确加载,请尝试刷新页面');
    };
    //文件选择对话框显示之前触发
    Myoptions.file_dialog_start_handler = function(){
       // this.setFileUploadLimit(maxFileNum);
    };
    //文件选择对话框关闭之后触发
    Myoptions.file_dialog_complete_handler = function(){//number of files selected, number of files queued, number of files Inqueued
        // //正确队列文件数为空
        // if(arguments[2]<1){return false;}
        // //正确队列文件数超过限定数
        // if(MyCangetData_maxnum&&MyCangetData_num>MyCangetData_maxnum){show_err(0);clearData(this);return false;}
        // fileBox&&fileBoxHtml(MyfileData);
        this.startUpload();
    };
    //每次选择的文件成功加入上传队列触发
    Myoptions.file_queued_handler = function(_file){//file object
        nowfile = _file;
        nowfile.uid = getUid();
        file.uid = nowfile.uid;
        file.name = nowfile.name;
        changeStart();
        props.onStart && props.onStart(nowfile);
        // MyCangetData_num++;
        // var _file=arguments[0];

        // MyfileDataMap["index_"+_file.index]=MyfileData.push({"fileName":_file.name,"progress":0});
        // if(MyCangetData_maxnum&&MyCangetData_num>=MyCangetData_maxnum){this.setButtonDisabled(true);}
    };
    //每次选择的文件失败加入上传队列触发
    Myoptions.file_queue_error_handler=function(){//file object, error code, message
        //-100数目 -110大小 -120 0字节 -130无效类型
        //console.log('file_queue_error_handler',arguments[1]);
        // if(arguments[1]=="-110"){show_err(3);}
        // if(arguments[1]=="-120"){show_err(2);}
        // if(arguments[1]=="-130"){show_err(4);}
    };
    //上传开始前
    Myoptions.upload_start_handler=function(){//file object
        if(props.beforeUpload){
            return props.beforeUpload(nowfile);
        }
        // var _file=arguments[0];

        // fnBegin(_file);
        // fileBox&&$files.eq(MyfileDataMap["index_"+_file.index]-1).next().next().css("color","#555555");
    };
    //上传中
    Myoptions.upload_progress_handler=function(_file,p1,p2){//file object, bytes complete, total bytes
        if(props.onProgress){
            return props.onProgress({percent:parseInt(p1/p2*100)},nowfile);
        }
        // var _file=arguments[0];
        // var _index=MyfileDataMap["index_"+_file.index]-1;

        // var pre=parseInt(arguments[1]/arguments[2]*100);


        // MyfileData[_index].progress=pre;
        // fileBox&&$files.eq(_index).stop().animate({"width":pre+"%"},500);
    };
    //上传失败
    Myoptions.upload_error_handler=function(_file,code,message){//file object, error code, message
        changeEnd();
        if(props.onError){
            return props.onError(code,message,nowfile);
        }
    };
    //上传成功
    Myoptions.upload_success_handler=function(){//file object, server data
        var _file=arguments[0];
        var oRes = eval('(' + arguments[1] + ')');
        if(props.onSuccess){
            return props.onSuccess(oRes,nowfile);
        }
    };
    //上传完成
    Myoptions.upload_complete_handler=function(){//file object
        changeEnd();
        //console.log('files_queued',this.getStats().files_queued);
        //this.getStats().files_queued==0&&MyfileData.length&&fnSuccess(MyfileData);
    };
    
    return Myoptions;
}

# LjkUpLoad.js
npm install
============
or
yarn 
===========

npm start
or
yarn start

:)
#客户端
*********************************
var ljkUpload = new LjkUpload($(rootElement);
 ljkUpload.upload({
    fileBtn:param,          //file 文件按钮
    fileSelectBtn:param,    //文件选择按钮
    uploadBtn:param,        //文件上传按钮
    showEle:param,                 //图片移动区域   
    quality:param                              //图片压缩  0-1  可不选
    maxSize:param                             //文件大小限制   默认1M
    range:param,                        //滑块                           
    success:function( image ){                //裁剪成功callback  返回base64图片
        //do something ...
    },
    error:function(e){                        //裁剪失败callback  返回错误信息
        console.error(e)
    }    
 })
#服务端
app.js
提供一个 服务端接受 base64图片的例子
#imageClip.html 是一个原生js版本的图片裁剪例子 =>>> to NaNa :)

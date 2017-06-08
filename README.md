 LjkUpLoad.js
====================
 jQuery（文件上传|头像裁剪上传）渣渣插件

***

#####如果你需要服务端的例子 请 `npm i` or `yarn`
##### 然后 `npm run server`
#### 垃圾源码中我写了很多注释,大家一起学习进步 :) 。。逃(

##客户端
*********************************
> Examples
>> (例子 1)  `clipUpload()`  图片裁剪上传   请参考 `examples/clip_upload_example.html`
>>>
    var ljkUpload = new LjkUpload($(rootElement);
    ljkUpload.clipUpload({
        fileBtn:param,          //file 文件按钮
        fileSelectBtn:param,    //美化后的选择按钮 (可不选)
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

***

>> (例子 2)  `fileUpload`  文件上传（带进度条功能）  请参考 `examples/file_upload_example.html`
>>>
     ljkUpload.fileUpload({
         url:fetchUrl,                                       //后端接口地址
         form:param,            //表单  
         fileBtn:param,                                      //文件file按钮
         fileSelectBtn:param,                                //美化后的file选择按钮 可不选
         fileUploadBtn:param,                                //文件上传按钮
         onChange:function(result){                          //文件选择事件  返回一个对象，分别是文件的 size,type,name,流
              //这里可以拿到数据，显示在页面上

         },
         progress:function(progress){                        //文件上传进度事件  返回文件的上传进度
              //这里可以拿到进度，显示在页面上
         },
         success:function(result){                           //上传成功回调    返回后端传过来的response
             //do something .... 
         },
         error:function(e){                                  //上传失败回调    返回错误信息
            console.log('error',e)
         }
     })

***


>> 如果你只需要图片预览  请使用 `showImage()`    请参考 `examples/show_images_example.html`
>>>         
    var ljkUpload = new LjkUpload($(".root"));
        ljkUpload.showImage({
            fileBtn:param,          //file 文件按钮
            fileSelectBtn:param,    //美化后的选择按钮 (可不选)
            showEle: param,         //图片展示区域
            maxSize: param,         //图片大小 (KB)
            callback:function(data){    //回调      返回base64图片
                //base64 图片
                console.log(data);
            }
        })

***

>> 如果你需要弹窗提示 使用  `notice()`  请参考 `examples/clip_upload_example.html`
>>>      
    /**
        *
        * @param msg             提示信息
        * @param showTime        显示时间
        * @param onHideHandler   回调函数
        * @param title            标题
        */
    ljkUpload.notice(msg,showTime,onHideHandler,title)

***
    
##服务端
server.js
提供一个 服务端接受 base64图片的例子
#imageClip.html 是一个原生js版本的图片裁剪例子 =>>> to NaNa :)

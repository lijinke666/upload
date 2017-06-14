 LjkUpLoad.js
====================
 jQuery（文件上传|头像裁剪上传）渣渣插件 <br/>
 ---
 a jQuery Head cut upload & file upload plugin

***

#####如果你需要服务端的例子 请 `npm i` or `yarn`
##### 然后 `npm run server`  or  `npm start`
---
##### If you need to look at the complete example, please run  `npm i` or `yarn` then  run `npm run server` or `npm start`

#### 

# 然后访问
---
# open
>
>  1.图片裁剪上传(head cut upload example) http://localhost:1996/examples/clip_upload_example.html <br/>
>  2.文件裁剪上传(file upload example) http://localhost:1996/examples/file_upload_example.html
  
---
#### 垃圾源码中我写了很多注释,大家一起学习进步 :) 。。逃(
---
#### I hope you can study and make progress together
---

#### How to Use ?

## 客户端
## Client Examples
*********************************
> Examples
>> (例子 1)  `clipUpload()`  图片裁剪上传   请参考 `examples/clip_upload_example.html`
>> (example 1) `clipUpload()` head cut upload , please reference `examples/clip_upload_example.html`
>>>
    var ljkUpload = new LjkUpload($(rootElement);
    ljkUpload.clipUpload({
        fileBtn:param,                          //file 文件按钮       your file btn
        fileSelectBtn:param,                   //美化后的选择按钮 (可不选)      To replace the native button  (Not a choice)
        uploadBtn:param,                        //文件上传按钮         file upload button
        showEle:param,                          //图片移动区域         Image moving area
        quality:param                           //图片压缩  0-1  可不选     photo quality (Not a choice)  default 0.92
        maxSize:param                           //文件大小限制   默认1M     file max size default 1024kb  (unit |  kb)
        range:param,                            //滑块                    To drag the image  You can also use a mouse wheel        
        success:function( image ){              //裁剪成功callback  返回base64图片   clip success callback return base64 image
            //do something ...
        },
        error:function(e){                      //裁剪失败callback  返回错误信息     clip error callback return error message
            console.error(e)
        }    
    })

***

>> (例子 2)  `fileUpload`  文件上传（带进度条功能）  请参考 `examples/file_upload_example.html`
>>>
     var ljkUpload = new LjkUpload($(rootElement);
     ljkUpload.fileUpload({
         url:fetchUrl,                                       //后端接口地址  The back-end interface address
         form:param,                                         //表单         form
         fileBtn:param,                                      //文件file按钮   your file btn
         fileSelectBtn:param,                                //美化后的file选择按钮 可不选    To replace the native button  (Not a choice)
         fileUploadBtn:param,                                //文件上传按钮   file upload button
         onChange:function(result){                          //文件选择事件  返回一个对象，分别是文件的 size,type,name,流
              //这里可以拿到数据，显示在页面上                 return file (size | type | name)

         },
         progress:function(progress){                        //文件上传进度事件  返回文件的       //上传进度
              //这里可以拿到进度，显示在页面上                  return file upload pregress
         },
         success:function(result){                           //上传成功回调    返回后端传过来的response
             //do something ....                             upload success callback return response
         },
         error:function(e){                                  //上传失败回调    返回错误信息
            console.log('error',e)                            upload error callback return error message
         }
     })

***


>> 如果你只需要图片预览  请使用 `showImage()`    请参考 `examples/show_images_example.html`
>>>         
    var ljkUpload = new LjkUpload($(".root"));
    ljkUpload.showImage({
        fileBtn:param,              //file 文件按钮
        fileSelectBtn:param,        //美化后的选择按钮 (可不选)
        showEle: param,             //图片展示区域
        maxSize: param,             //图片大小 (KB)
        callback:function(data){    //回调      返回base64图片
            //base64 图片
            console.log(data);
        }
    })

***

>> 如果你需要弹窗提示 使用  `notice()`  请参考 `examples/notice_example.html`
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

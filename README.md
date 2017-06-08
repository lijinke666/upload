 LjkUpLoad.js
====================
 jQuery头像裁剪上传插件
---------------------------
***

#####如果你需要看例子 请 `npm i` or `yarn`
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

>> (例子 2)  `showImage()`  图片预览   请参考 `examples/clip_upload_example.html`
>>>         
    var ljkUpload = new LjkUpload($(".root"));
        ljkUpload.showImage({
            fileBtn:param,          //file 文件按钮
            fileSelectBtn:param,    //美化后的选择按钮 (可不选)
            showEle: param,         //图片展示区域
            maxSize: param,         //图片大小 (KB)
            callback:function(data){    //回调
                //base64 图片
                console.log(data);
            }
        })

***

>> 如果你需要弹窗提示 使用  `notick()`  请参考 `examples/clip_upload_example.html`
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
app.js
提供一个 服务端接受 base64图片的例子
#imageClip.html 是一个原生js版本的图片裁剪例子 =>>> to NaNa :)

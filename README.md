 # LjkUpLoad.js
 
 #### jQuery（文件上传|头像裁剪上传）渣渣插件 ,支持拖拽,粘贴上传,上传进度<br/>
 #### a jQuery Head cut upload & file upload plugin Support drag and drop upload and upload progress
--

[在线DEMO](https://lijinke666.github.io/LjkUpLoad/.js)

##### 如果你需要一个完整的例子 包括后端 请：
##### Example : If you need to look at the complete example, please run :
```
npm install
```
或者 (or)
```
yarn
```
然后 (then)
```
npm start
```

open your bower
```
localhost:1996
```

##### 预览 preview

![example](https://github.com/lijinke666/LjkUpLoad/blob/master/ljkUpload.gif)

#### 然后访问 (Then open)

##### open
>
>  1.图片裁剪上传(head cut upload example) http://localhost:1996/examples/clip_upload_example.html <br/>
>  2.文件裁剪上传(file upload example) http://localhost:1996/examples/file_upload_example.html
  
  
#### 垃圾源码中我写了很多注释,大家一起学习进步 :) 。。逃(
#### I hope you can study and make progress together


#### How to Use ?

```javascript
<link rel="stylesheet" href="../libs/ljkUpload.min.css">
<script src="../libs/ljkUpload.min.js"></script>
```

## 客户端
## Client Examples

> Examples
>> (例子 1)  `clipUpload()`  图片裁剪上传   请参考 `examples/clip_upload_example.html`
>> (example 1) `clipUpload()` head cut upload , please reference `examples/clip_upload_example.html`
>>>

```javascript
    var ljkUpload = new LjkUpload($(rootElement);
    ljkUpload.clipUpload({
        fileBtn:param,                          //file 文件按钮   [type] Object  必选
        fileSelectBtn:param,                    //美化后的选择按钮  [type] Object  非必选
        uploadBtn:param,                        //文件上传按钮    [type] Object  必选
        showEle:param,                          //图片移动区域     [type] Object  必选
        quality:param                           //图片压缩  0-1   [type] Number [default] 0.92  非必选 不填格式为png 选了格式为jpg
        maxSize:param                           //文件大小限制   [type] Number [default] 1024kb  [unit] KB 非必选
        range:param,                            //滑块   [type] Object 非必选
        zoom:param,                             //鼠标是否可以控制图片缩放  [type] Boolean [default] true 非必选
        paste:param,                            //是否可以粘贴 [type] Boolean ][default] true 非必选
        drag:param,                             //是否可以拖拽上传  [type] Boolean [default] true  非必选        
        dragArea:param,                         //拖拽的区域  [type] Object  如果不需要 这个参数可不传 drag 传 false drag 为 false时 非必选
        dragAreaActiveClassName:param,          //自定义拖拽区域className [type] String [default] 'dragActive'
        success:function( image ){              //裁剪成功callback  返回base64图片 [type] Function  非必选
            //do something ...
        },
        error:function(e){                      //裁剪失败callback  返回错误信息     clip error callback return error message  [type] Function   非必选
            console.error(e)
        }    
    })
    
```


>> (例子 2)  `fileUpload()`  文件上传（带进度条功能）  请参考 `examples/file_upload_example.html`
>> (example 2) `fileUpload()` file upload( support progress) , please reference `examples/file_upload_example.html`
>>>

```javascript
     var ljkUpload = new LjkUpload($(rootElement);
     ljkUpload.fileUpload({
         url:fetchUrl,                                       //后端接口地址  The back-end interface address  [type] String  is required
         form:param,                                         //表单   form  [type] Object is required
         fileBtn:param,                                      //文件file按钮   your file btn [type] Object is required
         fileSelectBtn:param,                                //美化后的file选择按钮 可不选    To replace the native button  (Not a choice)
         fileUploadBtn:param,                                //文件上传按钮   file upload button [type] object is required
         drag:param,                                 //支持拖拽      file is drag 默认true [type] boolean [default] true    
         dragArea:$('.drag-section') ,                //响应拖拽的区域    file dragArea [type] Object 
         onChange:function(result){                          //文件选择事件  返回一个对象，分别是文件的 size,type,name,流  [type] Function
              //这里可以拿到数据，显示在页面上                 return file (size | type | name)

         },
         progress:function(progress){                        //文件上传进度事件  返回文件的       //上传进度
              //这里可以拿到进度，显示在页面上                  return file upload pregress
         },
         success:function(result){                           //上传成功回调    返回后端传过来的response
             //do something ....                             upload success callback return response
         },
         error:function(e){                                  //上传失败回调    返回错误信息
            console.log('error',e)                            //upload error callback return error message
         }
     })
     
```



>> 如果你只需要图片预览  请使用 `showImage()`    请参考 `examples/show_images_example.html`
>> if you only need Preview picture
>>>
```javascript
   var ljkUpload = new LjkUpload($(".root"));
    ljkUpload.showImage({
        fileBtn:param,              //file 文件按钮   [type] Object  必选
        fileSelectBtn:param,        //美化后的选择按钮 [type] Object 非必选
        showEle: param,             //图片展示区域    [type] Object    必选
        maxSize: param,             //图片大小 (KB)   [type] Number [default] 1024kb  非必选
        zoom:param,                 //是否允许鼠标滚轮对图片进行缩放  [type] Boolean [default] false 非必选
        callback:function(data){    //回调      返回base64图片 [type] Function 非必选
            //base64 图片
            console.log(data);
        }
    })
```

***

>> 如果你需要弹窗提示 使用  `notice()`  请参考 `examples/notice_example.html`
>> If you need a notice 
>>>   
```javascript
    /**
        *
        * @param {String} msg             提示信息    
        * @param {Number} showTime        显示时间    [default] 1500 ms
        * @param {Function} onHideHandler   回调函数
        * @param {String} title            标题   [default] '提示'
        */
    ljkUpload.notice(msg,showTime,onHideHandler,title)
```

#### 默认函数内部消息提示 使用 `notice()` 如果你需要自定义 可以在实例化的时候配置
#### Default function internal message prompt use `notice()` If you need to customize it 
##### 以 `layer` 弹窗库 为例
##### Take `layer` as an example
```javascript
    var ljkUpload = new LjkUpload($(".root"),{
        notice:layer.msg,
    });
```



>> 如果你需要加载动画 使用  `loading()` 
>> If you need a loading prompt
>>>   
```javascript
    /**
    * @param {String} msg             文字
    */
    ljkUpload.loading(msg)
    ljkupload.removeLoading()    //移除加载动画
```

    
#### 服务端
server.js
提供一个 服务端接受 base64图片的例子
##### imageClip.html 是一个原生js版本的图片裁剪例子 =>>> to NaNa :)

#### 欢迎大家提bug到issue

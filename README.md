 # upload
 jQuery（文件上传|图片裁剪上传）渣渣插件 ,支持拖拽,粘贴上传,上传进度

[在线DEMO](https://lijinke666.github.io/upload/)

## API
```
 var upload = new Upload(root);
 
 //图片裁剪上传
 upload.clipUpload(options)

 //文件上传
 upload.fileUpload(options)

//显示加载提示
upload.loading(msg)

//移除加载提示
upload.removeLoading()   

 //消息提示
 upload.notice()
 
//预览图片
 upload.showImage()
```

## 本地开发
```
git clone https://github.com/lijinke666/upload.git
npm install
npm start
```

## 预览 

![example](https://github.com/lijinke666/upLoad/blob/master/example.gif)


## 如何使用 ?

```javascript
<link rel="stylesheet" href="../libs/upload.min.css">
<body>
<div class="headImg-popup">
    ...
</div>
</body>
<script src="../libs/upload.min.js"></script>
<script>
        var upload = new Upload($(".headImg-popup"));

        upload.clipUpload({
            ...
        })
</script>
```

## 示例
> (例子 1)  `clipUpload()`  图片裁剪上传   请参考 `examples/clip_upload_example.html`

> 在线预览 : [https://lijinke666.github.io/upload/examples/clip_upload_example.html](https://lijinke666.github.io/upload/examples/clip_upload_example.html)

```javascript
    var upload = new Upload($(rootElement);
    upload.clipUpload({
        fileBtn:param,                          //file 文件按钮   [type] Object  必选
        fileSelectBtn:param,                    //美化后的选择按钮  [type] Object  非必选
        uploadBtn:param,                        //文件上传按钮    [type] Object  必选
        showEle:param,                          //图片移动区域     [type] Object  必选
        quality:param                           //图片压缩  0-1   [type] Number [default] 0.92  非必选 不填格式为png 选了格式为jpg
        maxSize:param                           //文件大小限制   [type] Number [default] 1024kb  [unit] KB 非必选
        range:param,                            //滑块   [type] Object 非必选
        zoom:param,                             //鼠标是否可以控制图片缩放  [type] Boolean [default] true 非必选
        paste:param,                            //是否可以图片粘贴到裁剪区域 [type] Boolean ][default] true 非必选
        drag:param,                             //是否可以将图片拖入裁剪区域  [type] Boolean [default] true  非必选        
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


> (例子 2)  `fileUpload()`  文件上传（带进度条功能）  请参考 `examples/file_upload_example.html`

> 在线预览 : [https://lijinke666.github.io/upload/examples/file_upload_example.html](https://lijinke666.github.io/upload/examples/file_upload_example.html)

```javascript
     var upload = new Upload($(rootElement);
     upload.fileUpload({
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

##### 默认函数内部消息提示 使用 `notice()` 如果你需要自定义 可以在实例化的时候配置
> 以 `layer` 弹窗库 为例
```javascript
    var upload = new Upload($(".root"),{
        notice:layer.msg,
    });
```

## License
[MIT](https://github.com/lijinke666/upload/blob/master/LICENCE)





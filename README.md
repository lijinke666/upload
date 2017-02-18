# LjkUpLoad.js
npm install 
or
yarn 

npm start
or
yarn start

:)
#客户端
var ljkUpload = new LjkUpload($(".headImg-popup"));

ljkUpload.upload({
    fileBtn:$("input[type='file']"),          //file 文件按钮
    fileSelectBtn:$(".upload-select-btn"),    //文件选择按钮
    uploadBtn:$(".upload-upload-btn"),        //文件上传按钮
    showEle:$(".move-image"),                 //图片移动区域   
    quality:0.92                              //图片压缩  0-1  可不选
    maxSize:1024,                             //文件大小限制   默认1M
    range:$("#range"),                        //滑块                           
    success:function( image ){                //裁剪成功callback  返回base64图片
        $('.showImage').append(`<li><img src="${image}"></li>`)
        $.ajax({
            url:"/uploadImage",
            type:"post",
            data:{image:image},
            dataType:"json",
            success:function(res){
                if(res.success){
                    alert('上传成功')
                }
            }
        })
    },
    error:function(e){                        //裁剪失败callback  返回错误信息
        console.error(e)
    }    
})
#服务端
app.js
提供一个 服务端接受 base64图片的例子
#imageClip.html 是一个原生js版本的图片裁剪例子 =>>> to NaNa :)
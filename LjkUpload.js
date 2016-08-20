/**
 * Created by Administrator on 2016/7/13.
 * By: 李金珂小朋友
 * 文件上传小组件 支持图片 和视频
 * v 0.2
 *  ：）
 */
(function ($) {
    var LjkUpload = function ( element ) {
        this.element = element;
    };
    LjkUpload.prototype = {
        //是否为PC   返回 true 或 false
        isPc: function () {
            var userAgent = navigator.userAgent;
            var AgentsArray = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var i = 0; i < AgentsArray.length; i++) {
                if (userAgent.indexOf(AgentsArray[i]) > -1) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },

        /**
         *
         * @param msg  loading动画 文字信息
         */
        ljkUpLoadAnimate:function( msg ){
            msg = msg ? msg :'请稍后';
            var list ="";
            for(var i=1; i<=12; i++){
                list+= "<div class='sk-circle"+i+" sk-child'></div>";
            }
            var doms = $("" +
                "<div class='removeLoading jmcpopup modal' style='display: block'><div class='mask'><div class='loading'>" +
                "<div class='sk-circle'>" + list+ "</div><p class='text-center fz18 color-white mt30'>"+msg+"</p></div></div>");
            $("body").append(doms);
        },

        /**
         *
         * @param msg             提示信息
         * @param onHideHandler   回调函数
         * @param title            标题
         * @param showTime        显示时间
         */
        ljkUpLoadAlert:function(msg, onHideHandler ,title, showTime){
            title = title ? title : '金珂提示你';
            var $dom = $('<div class="jmcpopup modal" style="display:block"><div class="mask"></div><div class="jmcpopup-wrap modal-wrap ctrl-modal"><div class="modal-title"><h2 class="none">'+title+'</h2></div><table><tr><td><h1 class="none mt20">'+msg+'</h1></td></tr></table></div></div>');
            $('body').append($dom);

            if( typeof showTime == 'undefined' ){
                showTime = 1500;
            }else{
                showTime = Math.max( parseInt(showTime), 1500 );
            }
            var i=setTimeout(function(){
                clearTimeout(i);
                setTimeout(function(){
                    $dom.remove();
                    if( typeof(onHideHandler) == 'function'){
                        onHideHandler();
                    }
                }, 500);
                $dom.css('opacity', 0);
            }, showTime);
        },

        //删除loading动画
        delete:function( ele ){
            ele.remove();
        },

        selectImg:function( options ){
            if( typeof options != "object" ){
                return
            }
            options.fileSelectBtn.on("click", function () {
                options.fileBtn.click();
            });
    },

        //拖拽图片
        /**
         *
         * @param ele      拖拽区域
         * @param isDown   是否按下
         * @param isPc     是否为pc
         */
        moveImage: function ( options ) {
            if( typeof options != "object" ){
                return
            }
            var mouseOffsetX = 0,
                mouseOffsetY = 0;
            //按下
            options.ele.on("mousedown touchstart", function ( e ) {
                var touche = options.isPc ? e : event.targetTouches[0];
                options.isDown = true;
                mouseOffsetX = touche.pageX - parseInt(options.ele.get(0).offsetLeft);
                mouseOffsetY = touche.pageY - parseInt(options.ele.get(0).offsetTop);
            });
            //离开
            options.ele.on("mousemove touchmove", function ( e ) {
                e.preventDefault();
                var mouseX = 0,
                    mouseY = 0;
                var touche = options.isPc ? e : event.targetTouches[0];
                if ( options.isDown === true ) {
                    mouseX = touche.pageX - mouseOffsetX;
                    mouseY = touche.pageY - mouseOffsetY;
                    options.ele.css({
                        top: mouseY + "px",
                        left: mouseX + "px"
                    })
                }
            });
            //弹起
            options.ele.on("mouseup touchend", function ( e ) {
                e.preventDefault();
                options.isDown = false;
            });
            //移出
            options.ele.on("mouseout", function ( e ) {
                e.preventDefault();
                options.isDown = false;
            });
        },

        //展示图片
        /**
         *
         * @param fileSelectBtn     文件选择按钮
         * @param fileBtn     文件按钮
         * @param showEle     图片显示区域
         * @param isImage     是图片还是文件 true || false
         * @param maxSize     图片最大限制  KB
         */
        showImage: function ( options ) {
            var defaults = {
                isImage:true,
                maxSize:1024
            };
            var options = $.extend( defaults, options );
            if( typeof options != "object" ){
                return
            }
            if(typeof  options.isfile == 'undefined'){
                options.isfile = false;
            }
            var _this = this;
            _this.selectImg( options );
            //获取到文件时
            options.fileBtn.change(function () {
                if( !window.FileReader){
                    _this.ljkUpLoadAlert("浏览器版本过低");
                    return;
                }
                if (this.files.length && this.files.length > 1 ) {
                    _this.ljkUpLoadAlert( "只能上传1张图片:)" );
                    return;
                }
                //将对象转换为数组 Array.prototype.slice.call(obj);
                //ES6中可以写成  Array.from(obj);
                var files = Array.prototype.slice.call( this.files );

                files.forEach( function ( file, i ) {
                    //jpeg png gif    "/images/jpeg"     i对大小写不敏感
                    var fileType =  options.isImage ? /\/(?:jpeg|png|gif)/i : /\/(?:mp4|rmvb|mp4|wmv|rm|3gp)/i;          //图片或者 视频
                    var type = file.type.split("/").pop();
                    if ( !fileType.test( file.type ) ) {
                        _this.ljkUpLoadAlert("不支持"+type+"格式的视频文件哟");
                        return;
                    }
                    if( options.maxSize!= 'undefined' && typeof options.maxSize == 'number'){
                        var fileSize = file.size / 1024;
                        if( fileSize > options.maxSize ){
                            _this.ljkUpLoadAlert("抱歉,文件最大为 "+options.maxSize+" KB");
                            return;
                        }
                    }
                    //HTML 5.1  新增file接口
                    var reader = new FileReader();

                    reader.onprogress = function(){
                        _this.ljkUpLoadAnimate("读取中,请稍后");
                    };
                    //读取失败
                    reader.onerror = function () {
                        _this.delete($(".removeLoading"));
                        _this.ljkUpLoadAlert("读取失败");
                    };
                    //读取中断
                    reader.onabort = function () {
                        _this.delete($(".removeLoading"));
                        _this.ljkUpLoadAlert("网络异常!");
                    };
                    //读取成功
                    reader.onload = function () {
                        _this.delete($(".removeLoading"));
                        var result = this.result;        //读取失败时  null   否则就是读取的结果
                        if( options.isImage === true ){
                            var image = new Image();
                            image.src = result;
                            options.fileSelectBtn.addClass("success-linear")
                            options.showEle.html('').append(image).removeClass("hasImg");
                        }else if( options.isImage === false ){
                            var video = $("<video id='video' controls><source src='"+result+"' type='video/"+type+"'></video>");
                            var networkState = 0,   //尚未初始化
                                videoReaderState = 0 ;  //视频就绪状态
                            if(networkState == 2 || networkState == 0 || networkState ==3){
                                _this.ljkUpLoadAnimate("视频初始化");
                            }
                            //0 = NETWORK_EMPTY - 音频/视频尚未初始化
                            // 1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
                            // 2 = NETWORK_LOADING - 浏览器正在下载数据
                            // 3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
                            //readyState == 4  视频已就绪
                            var State = setInterval(function(){
                                networkState = video.get(0).networkState;
                                videoReaderState = video.get(0).readyState;
                                if( networkState !=0 &&  networkState !=2 &&  networkState !=3  && videoReaderState == 4 ){
                                   _this.delete($('.removeLoading'));
                                    clearInterval(State);
                                    options.showEle.append(video);
                                }
                            },1000);
                        }
                       var $range = $('input[type="range"]'),
                            scale = Number($range.val());
                            options.showEle.get(0).onmousewheel = function(e){
                               var target,
                                   ee = e || window.event;
                               target = ee.delta ? ee.delta :  ee.wheelDelta;
                               if(target > 0 ){
                                   scale += 0.05;
                                   scale = Math.min(scale,3.0);
                                   $range.val(scale);
                                  _this.ToScale(options.showEle,scale)
                               }else if( target < 0 ){
                                   scale -=0.05;
                                   scale = Math.max(0,scale);
                                   $range.val(scale);
                                   _this.ToScale(options.showEle,scale)
                               }else{
                                   return false;
                               }
                            };
                        
                        options.fileBtn.blur();
                    };
                    //注入图片或文件  转换成base64
                    reader.readAsDataURL( file );      //base64
                    // reader.readAsBinaryString( file );      //二进制
                })
            });
        },
        //滑块拖拽缩放
        /**
         *
         * @param range   滑块
         * @param scale   缩放比例
         * @param ele     什么区域进行缩放
         */
        rangeToScale: function ( options ) {
            if( typeof options != "object" ){
                return;
            }
            var _this = this;
            var scale = Number ( options.range.val() );
            options.range.on("mousemove touchmove", function ( e ) {
                var _this_ = $(this);
                scale = Number(_this_.val());
                _this.ToScale( options.ele, scale );
            }).prev().on("click touchstart",function(){
                scale-= 0.01;
                options.range.val( scale );
                _this.ToScale( options.ele ,scale )
            }).next().next().on("click touchstart",function(){
                scale+= 0.01;
                options.range.val( scale );
                _this.ToScale( options.ele ,scale )
            });
        },

        //缩放
        /**
         *
         * @param ele     什么区域进行缩放
         * @param scale   缩放比例
         */
        ToScale:function( ele , scale ){
            ele.css({
                "-webkit-transform": "scale(" + scale + ")",
                "-moz-transform": "scale(" + scale + ")",
                "-ms-transform": "scale(" + scale + ")",
                "-o-transform": "scale(" + scale + ")",
                "transform": "scale(" + scale + ")"
            })
        },

        //裁剪
        /**
         *
         * @param uploadBtn  上传按钮
         * @param uploadImageBox  拖拽区域
         * @param clipImage  裁剪区域
         * @param range  滑块
         */
        clipImage: function ( options ){
            var _this = this;
            if( typeof options != "object" ){
                return
            }
            var defaults = {
                uploadBtn:$(".upload-upload-btn"),
                uploadImageBox:$(".move-image"),
                clipImage:$(".clip-image"),
                range:$("#range")
            };
            var options = $.extend( defaults , options );
            //选择文件

            options.uploadBtn.on("click",function(){
                if(options.uploadImageBox.hasClass("hasImg")){
                    _this.ljkUpLoadAlert("请选择图片");
                    return;
                }
                var $img = options.uploadImageBox.find("img"),
                    canvas = document.createElement("canvas"),
                    ljk = canvas.getContext("2d"),
                    $width = options.clipImage.width(),
                    $height = options.clipImage.height();
                canvas.width = $width;
                canvas.height = $height;

                var scale = options.range.val() || options.range.value,
                    sx = parseInt ( options.clipImage.offset().left - options.uploadImageBox.offset().left),
                    sy = parseInt ( options.clipImage.offset().top - options.uploadImageBox.offset().top );
                ljk.drawImage( $img.get(0), sx / scale, sy/ scale, $width / scale, $height / scale, 0, 0 , $width , $height );

                var Src = canvas.toDataURL( "images/png" );
                if( typeof  options.clipSuccess != "function" ){
                    _this.ljkUpLoadAlert("请使用clipSuccess回调函数:(");
                    return;
                }
                options.clipSuccess( Src );
            })
        }
    };
    window['LjkUpload'] = LjkUpload;
})(jQuery);
/**
 * Created by jinle.li on 2016/7/13.
 * By: 李金珂小朋友
 * 图片裁剪 & 文件上传 小插件,
 * v 0.5.0
 *  ：）
 */
(function ($) {
    var LjkUpload = function (element) {
        this.element = element;
    };
    LjkUpload.prototype = {
        files: null,
        scale: 1.0,
        fileTypeConfig: {
            "img": "图片",
            "file": "文件"
        },
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
        loading: function (msg) {
            msg = msg ? msg : '请稍后';
            var list = "";
            for (var i = 1; i <= 12; i++) {
                list += "<div class='sk-circle" + i + " sk-child'></div>";
            }
            var doms = $("" +
                "<div class='removeLoading jmcpopup modal' style='display: block'><div class='mask'><div class='loading'>" +
                "<div class='sk-circle'>" + list + "</div><p class='text-center fz18 color-white mt30'>" + msg + "</p></div></div>");
            $("body").append(doms);
        },

        /**
         *
         * @param msg             提示信息
         * @param onHideHandler   回调函数
         * @param title            标题
         * @param showTime        显示时间
         */
        notice: function (msg, showTime, onHideHandler, title) {
            title = title ? title : '提示';
            var $dom = $('<div class="jmcpopup modal" style="display:block"><div class="mask"></div><div class="jmcpopup-wrap modal-wrap ctrl-modal"><div class="modal-title"><h2 class="none">' + title + '</h2></div><table><tr><td><h1 class="none mt20">' + msg + '</h1></td></tr></table></div></div>');
            $('body').append($dom);

            if (typeof showTime == 'undefined') {
                showTime = 1500;
            } else {
                showTime = Math.max(parseInt(showTime), 1500);
            }
            var i = setTimeout(function () {
                clearTimeout(i);
                setTimeout(function () {
                    $dom.remove();
                    if (typeof (onHideHandler) == 'function') {
                        onHideHandler();
                    }
                }, 500);
                $dom.css('opacity', 0);
            }, showTime);
        },

        //删除loading动画
        removeLoading: function () {
            $('.removeLoading').remove();
        },

        selectImg: function (options) {
            if (typeof options != "object") {
                return
            }
            options.fileSelectBtn
                ? options.fileSelectBtn.on("click", function () {
                    options.fileBtn.click();
                })
                : options.fileBtn.click();

        },

        getBoundingClientRect: function (ele) {
            const gbc = ele.getBoundingClientRect();
            const left = gbc.left;
            const top = gbc.top;
            return {
                left,
                top
            }
        },

        //拖拽图片
        /**
         *
         * @param ele      拖拽区域
         */
        moveImage: function (options) {
            if (typeof options != "object") {
                return
            }
            var options = $.extend({
                ele: $('.move-image')
            }, options)
            var isPc = this.isPc();
            var mouseOffsetX = 0,
                mouseOffsetY = 0,
                isDown = false;
            //按下
            options.ele.on(isPc ? "mousedown" : "touchstart", function (e) {
                var touche = isPc ? e : (e.originalEvent.targetTouches[0] || e.targetTouches[0]);
                isDown = true;
                mouseOffsetX = touche.pageX - ~~(this.getBoundingClientRect(options.ele.get(0)).left);
                mouseOffsetY = touche.pageY - ~~(this.getBoundingClientRect(options.ele.get(0)).top);
            });
            //离开
            options.ele.on(isPc ? "mousemove" : "touchmove", function (e) {
                e.preventDefault();
                var mouseX = 0,
                    mouseY = 0;
                var touche = isPc ? e : (e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] || e.targetTouches[0]);
                if (isDown === true) {
                    mouseX = touche.pageX - mouseOffsetX;
                    mouseY = touche.pageY - mouseOffsetY;
                    options.ele.css({
                        top: mouseY + "px",
                        left: mouseX + "px"
                    })
                }
            });
            //弹起
            options.ele.on(isPc ? "mouseup" : "touchend", function (e) {
                e.preventDefault();
                isDown = false;
            });
            //移出
            options.ele.on(isPc ? "mouseout" : "touchcancel", function (e) {
                e.preventDefault();
                isDown = false;
            });
        },

        //展示图片
        /**
         * @param fileSelectBtn     文件美化后的选择按钮 可不选
         * @param fileBtn     文件按钮
         * @param showEle     图片显示区域
         * @param maxSize     图片最大限制  KB
         * @param zoom        缩放    默认false
         * @param callback    回调    返回base64图片
         */
        showImage: function (options) {
            var defaults = {
                maxSize: 1024,
                zoom: false
            };
            var options = $.extend(defaults, options);
            if (typeof options != "object") {
                return
            }
            var _this = this;
            _this.selectImg(options);
            //获取到文件时

            _this.getFileInfo(options.fileBtn, options.maxSize, _this.fileTypeConfig['img'], function (data) {
                _this.appendImage(data.result, options.fileSelectBtn, options.showEle, function (result) {
                    options.callback && options.callback(result)
                })
                options.zoom && _this.bindmousewheel(options.range, options.showEle)
                options.fileBtn.blur();
            })
        },
        appendImage: function (result, fileSelectBtn, showEle, callback) {
            this.loadImage(result).then(image => {
                fileSelectBtn && fileSelectBtn.addClass("success-linear");
                showEle.html('').append(image).removeClass("hasImg");
                callback && callback(result)
            }).catch(e => {
                throw new Error(e);
            })
        },
        bindmousewheel: function (range, showEle) {
            var _this = this
            var scale = _this.scale
            //取整 parseInt ||  >>0  ||  ~~ 都可以
            showEle.get(0).onmousewheel = function (e) {
                var target,
                    ee = e || window.event;
                target = ee.delta ? ee.delta : ee.wheelDelta;    //火狐有特殊
                if (target > 0) {
                    scale += 0.05;
                    scale = Math.min(scale, 3.0);
                    range && range.val(scale);
                    _this.ToScale(showEle, scale)
                } else if (target < 0) {
                    scale -= 0.05;
                    scale = Math.max(0, scale);
                    range && range.val(scale);
                    _this.ToScale(showEle, scale)
                } else {
                    return false;
                }
            };
        },
        getFileInfo: function (fileBtn, maxSize, fileType, callback) {
            var _this = this
            fileType = fileType || _this.fileTypeConfig['file']
            fileBtn.on('change', function () {
                if (!window.FileReader) {
                    _this.notice("浏览器版本过低");
                    return;
                }
                //将对象转换为数组 Array.prototype.slice.call(obj);
                //对象没有slice方法 所以通过Array的原型上的slice 通过call改变this指针
                //ES6中可以写成  Array.from(obj);
                _this.files = Array.prototype.slice.call(this.files);

                _this.filterFileInfo(_this.files, fileType, maxSize, function (data) {
                    callback(data)
                })
            })

        },
        //过滤文件信息
        filterFileInfo: function (fileList, fileType, maxSize, callback) {
            var _this = this
            if (fileList.length && fileList.length > 1) {
                fileType == _this.fileTypeConfig['img']
                    ? _this.notice("只能上传1张图片:)")
                    : _this.notice("只能上传1个文件:)")
                return;
            }
            fileList.forEach(function (file, i) {
                //jpeg png gif    like  "/images/jpeg"     i对大小写不敏感
                if (fileType == _this.fileTypeConfig['img']) {
                    var reg = /\/(?:jpeg|jpg|png|gif)/i;          //图片
                    // var type = file.type.split("/").pop();
                    var type = file.type.match(/image\/(\w*)/)[1];    //获取文件的类型
                    if (!reg.test(file.type)) {
                        _this.notice("不支持" + type + "格式的" + fileType + "哟");
                        return;
                    }
                }
                if (maxSize != 'undefined' && typeof maxSize == 'number') {
                    var fileSize = file.size / 1024;
                    if (fileSize > maxSize) {
                        _this.notice("抱歉," + fileType + " 最大为 " + maxSize + " KB");
                        return;
                    }
                }
                //HTML 5.1  新增file接口
                var reader = new FileReader();

                //读取中
                reader.onprogress = function () {
                    _this.loading("读取中,请稍后");
                };
                //读取失败
                reader.onerror = function () {
                    _this.removeLoading();
                    _this.notice("读取失败");
                };
                //读取中断
                reader.onabort = function () {
                    _this.removeLoading();
                    _this.notice("网络异常!");
                };
                //读取成功
                reader.onload = function () {
                    _this.removeLoading();
                    var result = this.result;        //读取失败时  null   否则就是读取的结果
                    callback && callback({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        result: result
                    })
                };
                reader.readAsDataURL(file);      //base64
            })
        },
        loadImage: function (src) {
            return new Promise((res, rej) => {
                let img = new Image();
                img.src = src;
                img.onload = () => {
                    res(img)
                }
                img.onerror = (e) => {
                    rej(e)
                }
            })
        },

        //滑块拖拽缩放
        /**
         *
         * @param range   滑块
         * @param scale   缩放比例
         * @param ele     什么区域进行缩放
         */
        rangeToScale: function (options) {
            if (typeof options != "object") {
                return;
            }
            var _this = this;
            var scale = Number(options.range.val());
            options.range.on("mousemove touchmove", function (e) {
                var _this_ = $(this);
                scale = Number(_this_.val());
                _this.ToScale(options.ele, scale);
            }).prev().on("click touchstart", function () {
                scale -= 0.01;
                options.range.val(scale);
                _this.ToScale(options.ele, scale)
            }).next().next().on("click touchstart", function () {
                scale += 0.01;
                options.range.val(scale);
                _this.ToScale(options.ele, scale)
            });
        },

        //缩放
        /**
         *
         * @param ele     什么区域进行缩放
         * @param scale   缩放比例
         */
        ToScale: function (ele, scale) {
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
         * @param quality  压缩比例
         * @param clipSuccess  成功callback
         * @param clipError  失败callback
         */
        clipImage: function (options) {
            var _this = this;
            if (typeof options != "object") {
                return
            }
            var defaults = {
                uploadBtn: $(".upload-upload-btn"),
                uploadImageBox: $(".move-image"),
                clipImage: $(".clip-image"),
                range: $("#range")
            };
            var options = $.extend(defaults, options);
            _this.canvas = document.createElement("canvas")
            //选择图片

            options.uploadBtn.on("click", function () {
                try {
                    if (options.uploadImageBox.hasClass("hasImg")) {
                        _this.notice("请选择图片");
                        return;
                    }
                    var $img = options.uploadImageBox.find("img"),
                        cxt = _this.canvas.getContext("2d"),
                        $width = options.clipImage.width(),
                        $height = options.clipImage.height();
                    _this.canvas.width = $width;
                    _this.canvas.height = $height;

                    var scale = options.range.val() || options.range.value,
                        sx = ~~(options.clipImage.offset().left - options.uploadImageBox.offset().left),
                        sy = ~~(options.clipImage.offset().top - options.uploadImageBox.offset().top);
                    // image 图片元素，除了图片，还支持其他 3 种格式，分别是 HTMLVideoElement HTMLCanvasElement ImageBitmap ，
                    // sx 要绘制到 canvas 画布的源图片区域（矩形）在 X 轴上的偏移量（相对源图片左上角）
                    // sy 与 sx 同理，只是换成 Y 轴
                    // sWidth 要绘制到 canvas 画布中的源图片区域的宽度，如果没有指定这个值，宽度则是 sx 到图片最右边的距离
                    // sHeight 要绘制到画布中的源图片区域的高度，如果没有指定这个值，高度则是 sy 到图片最下边的距离
                    // dx 源图片左上角在 canvas 画布 X 轴上的偏移量
                    // dy 源图片左上角在画布 Y 轴上的偏移量
                    // dWidth 绘制图片的 canvas 画布宽度
                    // dHeight 绘制图片的画布高度
                    cxt.drawImage($img.get(0), sx / scale, sy / scale, $width / scale, $height / scale, 0, 0, $width, $height);

                    var imageType = (options.quality && typeof (options.quality) === 'number') ? 'image/jpeg' : 'image/png'
                    //toDataURL  param1 文件类型 param2 质量  当第二参数为正时 param1 只能是 jpeg|webp
                    var Src = _this.canvas.toDataURL(imageType, Number(options.quality));
                    delete this.canvas;
                    if (typeof options.clipSuccess != "function") {
                        throw new Error("请使用clipSuccess回调函数:(");
                    }
                    options.clipSuccess(Src);
                } catch (e) {
                    options.clipError('error:' + e);
                }
            })
        },
        //图片裁剪上传
        clipUpload: function (options) {
            var defaults = {
                fileBtn: $('input[type="file"]'),
                fileSelectBtn: $('.upload-select-btn'),
                showEle: $('.move-image'),
                maxSize: 1024,
                range: $("#range"),
                drag: true,
                zoom: true,
                drapArea: $('.upload-image-box'),
                success: function () { },
                error: function () { }
            }
            var options = $.extend(defaults, options)
            this.moveImage({
                ele: options.moveEle
            })
            this.showImage({
                fileSelectBtn: options.fileSelectBtn,
                fileBtn: options.fileBtn,
                showEle: options.showEle,
                maxSize: options.maxSize,
                zoom: options.zoom
            })
            this.rangeToScale({
                range: options.range,
                ele: options.showEle
            })
            this.clipImage({
                range: options.range,
                quality: options.quality,
                clipSuccess: function (Src) {
                    options.success(Src)
                    delete _this.files
                },
                clipError: function (e) {
                    options.error(e)
                }
            })
            options.drag && this.addListener({
                fileBtn: options.fileBtn,
                drapArea: options.drapArea,
                fileArea: options.showEle,
                maxSize: options.maxSize
            })
        },
        //文件上传(带进度条)
        fileUpload: function (options) {
            var defaults = {
                fileBtn: $('input[type="file"]'),
                fileSelectBtn: $('.upload-select-btn'),
                fileUploadBtn: $('.upload-upload-btn'),
                maxSize: 1024,
                onChange: function () { },
                progress: function () { }
            }
            var options = $.extend(defaults, options)
            var _this = this
            if (!options.url) throw new Error('No upload address specified')
            var xhr = new XMLHttpRequest()
            _this.selectImg({
                fileBtn: options.fileBtn,
                fileSelectBtn: options.fileSelectBtn,
                fileUploadBtn: options.fileUploadBtn
            })
            //获取到文件时
            _this.getFileInfo(options.fileBtn, options.maxSize, _this.fileTypeConfig['file'], function (result) {
                options.onChange(result)
                options.fileUploadBtn.on('click', function () {
                    var formData = new FormData(options.form[0])
                    xhr.onloadstart = function () {
                        console.log("load start");
                    }
                    xhr.onerror = function (e) {
                        options.error && options.error(e)
                    }
                    xhr.onload = function () {
                        var result = JSON.parse(xhr.responseText)
                        options.success && options.success(result)
                        console.log("上传成功")
                    }
                    xhr.onabort = function (event) {
                        _this.notice('传输中断!')
                    }
                    xhr.ontimeout = function () {
                        _this.notice('连接超时!')
                    }
                    xhr.onloadend = function () {
                        console.log('传输结束')
                    }
                    xhr.upload.onprogress = function (e) {
                        var progress = Math.round(e.loaded * 100 / e.total)
                        options.progress && options.progress(progress)
                    }

                    xhr.open('POST', options.url, true)
                    xhr.send(formData)
                })
            })
        },
        addDrapAreaStyle: function (ele, className) {
            ele.addClass(className || 'drapActive')
        },
        removeDrapAreaStyle: function (ele, className) {
            ele.removeClass(className || 'drapActive')
        },

        /**
         * 绑定拖拽事件 (文件|图片拖拽选择)
         * @param drapArea 拖拽文件相应区域 
         * @param fileArea 文件放置区域 
         * @param fileBtn 文件按钮 
         * @param zoom 缩放  默认 true 
         */
        addListener: function (options) {
            var defaults = {
                drapArea: $('.upload-image-box'),
                fileArea: $('.move-image'),
                zoom: true
            }

            var options = $.extend(defaults, options)
            var $drapArea = options.drapArea

            var _this = this

            document.addEventListener('dragenter', function (e) {
                _this.addDrapAreaStyle($drapArea)
            })
            document.addEventListener('dragleave', function () {
                _this.removeDrapAreaStyle($drapArea)
            })
            //进入
            $drapArea.on('dragenter', function (e) {
                e.preventDefault()
                e.stopPropagation()
                _this.addDrapAreaStyle($drapArea)
            })
            //离开
            $drapArea.on('dragleave', function (e) {
                e.preventDefault()
                e.stopPropagation()
                _this.removeDrapAreaStyle($drapArea)
            })
            //移动
            $drapArea.on('dragover', function (e) {
                e.preventDefault()
                e.stopPropagation()
                (e.dataTransfer || e.originalEvent.dataTransfer).dropEffect = 'copy'        //设置文件放置类型为拷贝
            })

            //放下
            $drapArea.on('drop', function (e) {
                 e.preventDefault()
                e.stopPropagation()
                var files = (e.dataTransfer || e.originalEvent.dataTransfer).files
                _this.filterFileInfo(Array.from(files), _this.fileTypeConfig['img'], options.maxSize, function (data) {
                    _this.appendImage(data.result, options.fileSelectBtn, options.fileArea)
                    options.zoom && _this.bindmousewheel(options.range, options.fileArea)
                })
            })
        },
        fileTypeRegExp: function (fileType, reg) {
            let regExp = new RegExp('.*\/(?:' + fileType + ')$', 'i');
            return regExp.test(reg)
        }
    };
    //自执行函数 不暴露成员
    //挂载在 window全局对象 不然访问不到
    window['LjkUpload'] = LjkUpload;
})(jQuery);
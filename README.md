# LjkUpLoad.js
//加载等待中提示动画
/**
 *
 * @param msg             提示信息
 */
ljkUpLoadAnimate(msg)      //@param  msg  提示信息   

//提示信息弹框
/**
 *
 * @param msg             提示信息
 * @param onHideHandler   回调函数
 * @param title            标题
 * @param showTime        显示时间
 */
ljkUpLoadAlert(msg, onHideHandler ,title, showTime)

//拖拽图片
/**
 *
 * @param ele      拖拽区域
 * @param isDown   是否按下
 * @param isPc     是否为pc
 */
moveImage(options)

//预览图片
/**
 *
 * @param fileSelectBtn     文件选择按钮
 * @param fileBtn     文件按钮
 * @param showEle     图片显示区域
 * @param isImage     是图片还是文件 true || false
 * @param maxSize     图片最大限制  KB
 */
showImage(options)

//滑块拖拽缩放
/**
 *
 * @param range   滑块
 * @param scale   缩放比例
 * @param ele     什么区域进行缩放
 */
rangeToScale(options)

//裁剪
/**
 *
 * @param uploadBtn  上传按钮
 * @param uploadImageBox  拖拽区域
 * @param clipImage  裁剪区域
 * @param range  滑块
 * @param clipSuccess(src)  裁剪回调函数(base64图片)
 */
clipImage(options)

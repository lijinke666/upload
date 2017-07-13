const gulp = require('gulp'),
    auto = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev-append'),
    uglify = require('gulp-uglify');

gulp.task('cssMin',function(){
    gulp.src('./libs/ljkUpload.css')
        .pipe(rev())
        .pipe(auto({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true
            remove:false //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({suffix:'.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('./libs'))
})


gulp.task('jsMin',function(){
    gulp.src('./libs/ljkUpload.js')
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./libs'))
})


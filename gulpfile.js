const gulp = require("gulp"),
        htmlmin = require("gulp-htmlmin"),
        cssmin =require("gulp-clean-css"),
        jsmin  =require("gulp-uglify"),
        babel = require("gulp-babel"),
        connect = require("gulp-connect"),
        sass =require("gulp-sass")

gulp.task("html",()=>{
    gulp.src("src/**/*.html")
    .pipe(
        htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked/>
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS 
        })
    )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("css",()=>{
    gulp.src("src/css/**/*.scss")
    .pipe(sass())
    // .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})


gulp.task("js",()=>{
    gulp.src("src/js/**/*.js")
    .pipe(babel({
        presets: ['@babel/env']
      }))
    .pipe(jsmin())
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

gulp.task("server" , ()=>{
    connect.server({
        root: 'dist',
        livereload:true,
        port:2333
    })
})
gulp.task("img", function(){
    gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})

gulp.task('watch',function(){
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/js/**/*.js', ['js'])
    gulp.watch('src/css/**/*.scss', ['css'])
    gulp.watch('src/images/**/*', ['img'])
})

gulp.task("libs",function(){
    gulp.src("src/libs/**/*")
    .pipe(gulp.dest("dist/libs"))
})
gulp.task("default", ['html', 'js','img', 'css', 'server', 'watch',"libs"]);
var gulp = require('gulp');
var less = require('gulp-less'); 
var webpack = require('webpack-stream');
var typescript = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
 

/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
}); 
/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./src/less/**/*.less' , ['compile-less']);
});




gulp.task('serve', function () {
 
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    }); 
    gulp.watch("./src/**/*.less").on("change", reload);
    gulp.watch("./dist/**/*.html").on("change", reload);
    gulp.watch("./dist/**/*.js").on("change", reload);

});
 
/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);
var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var babel       = require('gulp-babel');
var sourcemaps  = require('gulp-sourcemaps');
var include     = require('gulp-file-include');
var connect     = require('gulp-connect');
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');
var wrap        = require('gulp-wrap');
var watch       = require('gulp-watch');
var plumber     = require('gulp-plumber');

var stylus      = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var changed = require('gulp-changed');

var plumber_handler = {
    errorHandler: function(err) {
        console.log(err);
        this.emit('end'); 
    }
};

gulp.task('html-master',function(){
    return gulp.src(['app/module/**/*.html'],{base: './app/module'})
        .pipe(wrap({src:'app/layout/master.html'}))
        .pipe(include({
            prefix: '@@',
            basepath: './app/component/'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('html',function(){
    return gulp.src(['app/module/**/*.html'],{base: './app/module'})
        .pipe(changed('dist'))
        .pipe(wrap({src:'app/layout/master.html'}))
        .pipe(include({
            prefix: '@@',
            basepath: './app/component/'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('css',function(){
    return gulp.src('app/static/css/main.styl',{base: './app'})
        .pipe(plumber(plumber_handler))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compressed: true
        }))
        .pipe(sourcemaps.write())
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions', 'ie 9', 'Android 4'],
        //     cascade: false
        // }))        
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('javascript', function () {
    return gulp.src(['app/module/**/*.js'],{base: './app/module'})
        .pipe(plumber(plumber_handler))
        .pipe(babel({
            plugins: ['transform-es2015-modules-amd'],
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/page'))
        .pipe(reload({stream: true}));
});

gulp.task('es5',function(){
    return gulp.src('app/static/js/**/*.js',{base: './app'})
        .pipe(changed('dist'))
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('resources',function(){
    gulp.src('app/static/img/**',{base: './app'})
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));

    return gulp.src('app/static/lib/**/*',{base: './app'})
        .pipe(changed('dist/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['css','es5','javascript','html-master','resources'], function() {
    gulp.watch(['app/static/css/**/*.styl','app/module/**/*.styl'], ['css']);
    gulp.watch('app/static/js/**/*.js', ['es5']);
    gulp.watch('app/module/**/*.js', ['javascript']);    
    gulp.watch(['app/layout/master.html'],['html-master']);
    gulp.watch(['app/module/**/*.html'],['html']);
    gulp.watch(['app/static/lib/**/*','app/static/img/**/*'],['resources']);
    
});

gulp.task('server',function(){
    browserSync.init({
        port: 8000,
        open: false,
        server: {
            baseDir: './dist',
            index: 'index.html',
            routes: {
                '/': '/index/'
            }
        }
    });
    gulp.start('serve');
});

gulp.task('clean',function(){
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build',['clean'],function(){
    gulp.start('server');
});

gulp.task('default', ['build']);

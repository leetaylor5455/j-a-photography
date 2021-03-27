const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');



function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            console.log(err);
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        gulp.src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        gulp.src('assets/scss/*.scss', {sourcemaps: true}),
        sass(),
        concat('styles.css'),
        gulp.dest('assets/built/css/', {sourcemaps: '.'}),
        livereload(),
    ], handleError(done)); 
}

function js(done) {
    pump([
        gulp.src('assets/js/*.js', {sourcemaps: true}),
        concat('app.js'),
        //uglify(),
        gulp.dest('assets/built/js/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

const cssWatcher = () => gulp.watch(['assets/scss/*.scss'], css);
const hbsWatcher = () => gulp.watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const jsWatcher = () => gulp.watch(['assets/js/*.js'], js);
const watcher = gulp.parallel(cssWatcher, hbsWatcher, jsWatcher);

const build = gulp.series(css, js);

function zipper(done) {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
        gulp.src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        gulp.dest(targetDir)
    ], done());
}

exports.watch = gulp.series(build, serve, watcher);
exports.stream = watcher;
exports.css = css;
exports.js = js;
exports.zip = zipper;
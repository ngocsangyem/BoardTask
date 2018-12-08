const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');
const notifier = require('node-notifier');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const fs = require('fs');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

const {
	reload
} = browserSync;
const config = require('./config/config');

gulp.task('clean', () => {
	return del([
		'./public/css',
		'./public/js'
	], {
		force: true
	})
})
gulp.task('sass', () => {
	gulp.src(['./public/sass/*.sass',
			'!./public/sass/{**/\_*,**/\_*/**}'
		])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', function (err) {
			showError.apply(this, ['Sass compile error', err])
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('./public/css'))

});
gulp.task('concatJs', () => {
	let plugins = JSON.parse(fs.readFileSync('./plugins.json'));
	return gulp.src(plugins.scripts)
		.pipe(uglify())
		.pipe(concat('core.min.js'))
		.pipe(gulp.dest('./public/js'))
})
gulp.task('scripts', () => {
	gulp.src('./scripts/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/js'))
});
gulp.task('concatCss', () => {
	let plugins = JSON.parse(fs.readFileSync('./plugins.json'));
	return gulp.src(plugins.styles)
		.pipe(sass().on('error', function (err) {
			showError.apply(this, ['Sass compile error', err])
		}))
		.pipe(cssnano())
		.pipe(concat('core.min.css'))
		.pipe(gulp.dest('./public/css'))
})
gulp.task('watch', () => {
	let plugins = JSON.parse(fs.readFileSync('./plugins.json'));
	gulp.watch('./public/sass/**/*.sass', ['sass']);
	gulp.watch('./public/sass/*.sass', ['sass']);
	gulp.watch('./scripts/**/*.js', ['scripts']);
	gulp.watch('./scripts/*.js', ['scripts']);
	// gulp.watch('./plugins/**/**.{css,scss,sass}', ['concatCss']);
	gulp.watch(plugins.styles, ['concatCss']);
	gulp.watch('./plugins.json/*.js', ['concatJs']);
});

gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: `http://localhost:${config.server.port}`,
		files: ['public/**/*.*', '**.js'],
		// browser: 'google chrome',
		port: 7000,
	});
});

gulp.task('nodemon', cb => nodemon({
		exec: 'node --inspect',
		script: 'app.js',
		ext: 'js pug sass',
		env: {
			NODE_ENV: 'development',
			DEBUG: 'myapp:*'
		},
	})
	.once('start', cb)
	.on('restart', () => {
		setTimeout(() => {
			browserSync.reload({
				stream: false
			});
		}, 1000);
	}));

// gulp.task('default', [
// 	'sass',
// 	'concatCss',
// 	'concatJs',
// 	'nodemon',
// 	'watch',
// 	'browser-sync',
// ]);
gulp.task('default', function (callback) {
	runSequence(
		'clean',
		'sass',
		'scripts',
		'concatCss',
		'concatJs',
		'nodemon',
		'watch',
		'browser-sync',
		callback
	);
});


function showError(preffix, err) {
	util.log(util.colors.white.bgRed(' ' + preffix + ' '), util.colors.white.bgBlue(' ' + err.message + ' '));
	notifier.notify({
		title: preffix,
		message: err.message
	});
	this.emit('end');
}

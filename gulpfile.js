var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('webpack-stream');
var webpack2 = require('webpack');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var tsProject = ts.createProject('tsconfig.json');

/* Task to compile less */
gulp.task('compile-less', function () {
	gulp
		.src('./src/less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css/'));
});
/* Task to watch less changes */
gulp.task('watch-less', function () {
	gulp.watch('./src/less/**/*.less', ['compile-less']);
});

var gulp = require('gulp');
var ts = require('gulp-typescript');

var webpackConf = {
	watch: true,
	entry: [
		'whatwg-fetch',
		'babel-polyfill',
		'./src/ts/main.ts',
		//'angular-touch',
	],
	output: {
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devtool: 'cheap-module-eval-source-map',
};

gulp.task('prod', function () {
	return gulp
		.src('./dist/js/main.js')
		.pipe(
			webpack({
				...webpackConf,
				output: {
					filename: 'prod.js',
				},
				plugins: [
					new webpack2.DefinePlugin({
						'process.env': {NODE_ENV: "'production'"},
					}),
					new webpack2.optimize.UglifyJsPlugin(),
				],
			})
		)
		.pipe(gulp.dest('dist/js'));
});

gulp.task('webpack', function () {
	return gulp
		.src('./dist/js/main.js')
		.pipe(webpack(webpackConf))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function () {
	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: './dist/',
		},
	});
	gulp.watch('./dist/**/*.css').on('change', reload);
	gulp.watch('./dist/**/*.html').on('change', reload);
	gulp.watch('./dist/**/*.js').on('change', reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve', 'webpack']);

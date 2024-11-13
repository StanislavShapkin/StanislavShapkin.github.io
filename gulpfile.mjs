import gulp from "gulp";
import del from "del";
import include from "gulp-file-include";
import format Html from "gulp-format-html";
import less from "gulp-less";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import sort Media Queries from "postcss-sort-media-queries";
import minify from "gulp-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";
import imagemin from "gulp-imagemin";
import imagemin_gifsicle from "imagemin-gifsicle";
import imagemin_mozjpeg from "imagemin-mozjpeg";
import imagemin_optipng from "imagemin-optipng";
import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import server from "browser-sync";
const resources = {
html: "src/html/**/*.html",
js Dev: "src/scripts/dev/**/*.js",
js Vendor: "src/scripts/vendor/**/*.js",
images: "src/assets/images/**/*.{png,jpg,jpeg,webp,gif,svg}",
less: "src/styles/**/*.less",
svg Sprite: "src/assets/svg-sprite/*.svg",
static: [
"src/assets/icons/**/*.*
"src/assets/favicons/**/*
"src/assets/fonts/**/*.{woff,woff2}",
"src/assets/video/**/*.{mp4,webm}",
"src/assets/audio/**/*-{mp3,ogg,wav,aac}",
"src/json/**/*.json",
"src/php/**/*.php"
]
};
// Gulp Tasks:
function clean() {
return del("dist");
function include Html() {
return gulp
.src("src/html/*.html")
pipe(plumber())
.pipe(
include({
prefix: "@@",
basepath: "@file"
})
..pipe(format Html())
.pipe(gulp.dest("dist"));
function style() {
return gulp
.src("src/styles/styles.less")
pipe(plumber())
.pipe(less())
pipe(
postcss([
autoprefixer({ override Browsers list: ["last 4 version"]
sort Media Queries({
}),
sort: "desktop-first"
})
l)
)
.pipe(gulp.dest("dist/styles"))
.pipe(minify())
.pipe(rename("styles.min.css"))
.pipe(gulp.dest("dist/styles"));
function js() {
return gulp
.src("src/scripts/dev/*.js")
.pipe(plumber())
pipe(
include({
prefix: "//@0",
basepath: "@file"
})
pipe(gulp.dest("dist/scripts"))
.pipe(terser())
pipe(
rename(function (path) {
path.basename += ".min";
})
)
.pipe(gulp.dest("dist/scripts"));
function scope() {
return gulp
..src(resources.js Vendor)
.pipe(plumber())
.pipe(gulp.dest("dist/scripts"));
function copy() {
return gulp
.src(resources.static, {
base: "src"
})
.pipe(gulp.dest("dist/"));
function images() {
return gulp
basepath: "@file"
})
pipe(gulp.dest("dist/scripts"))
.pipe(terser())
pipe(
rename(function (path) {
path.basename += ".min";
})
)
.pipe(gulp.dest("dist/scripts"));
function scope() {
return gulp
..src(resources.js Vendor)
.pipe(plumber())
.pipe(gulp.dest("dist/scripts"));
function copy() {
return gulp
.src(resources.static, {
base: "src"
})
.pipe(gulp.dest("dist/"));
function images() {
return gulp
const build
= gulp.series(
clean,
сору,
include Html,
style,
js,
js Copy,
images,
svg Sprite
);
function reload Server(done) {
server.reload();
done();
}
function serve() {
server.init({
server: "dist"
});
gulp.watch(resources.html, gulp.series(include Html, reload Server));
gulp.watch(resources.less, gulp.series(style, reload Server));
gulp.watch(resources.js Dev, gulp.series(js, reload Server));
gulp.watch(resources.js Vendor, gulp.series(js Copy, reload Server));
gulp.watch(resources.static, { delay: 500 }, gulp.series(copy, reload Server));
gulp.watch(resources.images, { delay: 500 }, gulp.series(images, reload Server));
gulp.watch(resources.svg Sprite, gulp.series(svg Sprite, reload Server));
const start = gulp.series(build, serve);
//csso
//imagemin
//plumber
// postcss
// autoprefixer
// minify (csso)
// rename
// svg-store (sprite)

var gulp = require("gulp");
var del  = require("del");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync").create();
var run = require("run-sequence");


gulp.task("style", function() {
    gulp.src("./src/sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(server.reload({stream: true}))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("pug", function() {
    gulp.src("./src/pages/**/*.pug")
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./build"))
        .pipe(server.reload({stream: true}));
});

gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(gulp.dest("build/js"))
        .pipe(server.reload({stream: true}));;
});
gulp.task("img", function() {
    return gulp.src("./src/img/**/*.*")
        .pipe(gulp.dest("build/img"))
        .pipe(server.reload({stream: true}));;
});


//BUILD

gulp.task("clean", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
        "src/fonts/**/*.{woff,woff2}",
        // "src/img/**",
        "src/libs/**"
    ], {
        base: "./src"
    })
    .pipe(gulp.dest("build"));
});


gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "img",
        "style",
        "js",
        "pug",
        done
    );
});



gulp.task("serve", function() {
    server.init({
        server: "build/"
    });

    gulp.watch("src/**/*.scss", ["style"]);
    gulp.watch("src/js/*.js", ["js"]);    
    gulp.watch("src/img/**/*.*", ["img"]);
    gulp.watch("src/**/*.pug", ["pug"]);
    // gulp.watch("src/*.html", ["build"]);
})








//OPTIMIZATION IMAGES

// var imagemin = require("gulp-imagemin");

// gulp.task("images", function() {
//     return gulp.src("img/**/*.{png,jpg,svg}")
//         .pipe(imagemin([
//             imagemin.optipng({optimizationLevel: 3}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.svgo()
//         ]))
//         .pipe(gulp.dest("img"));
// });

//GULP webp
// var webp     = require("gulp-webp")

// gulp.task("webp", function() {
//     return gulp.src("img/**/*.{png,jpg}")
//         .pipe(webp({quality: 90}))
//         .pipe(gulp.dest("img"));
// })

// SVG-sprite
// var svgstore = require("gulp-svgstore");

// gulp.task("sprite", function() {
//     return gulp.src("img/icon-*.svg")
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename("sprite.svg"))
//         .pipe(gulp.dest("img"));
// });

//posthtml

// var posthtml = require("gulp-posthtml");
// var include  = require("posthtml-include");

// gulp.task("html", function() {
//     return gulp.src("*.html")
//         .pipe(posthtml([
//             include()
//         ]))
//         .pipe(gulp.dest("."));
// });

// <include src="img/sprite.svg"></include>
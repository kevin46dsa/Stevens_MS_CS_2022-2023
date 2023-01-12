const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass")(require('sass'));
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');

const imgFiles = [
  "./src/images/jordan1.webp",
  "./src/images/jordan2.webp",
  "./src/images/jordan3.webp",
  "./src/images/jordan4.webp",
  "./src/images/jordan5.webp",
  "./src/images/jordan6.webp",
  "./src/images/jordan7.webp",
  "./src/images/jordan8.webp",
  "./src/images/jordan9.webp",
  "./src/images/jordan10.webp"
]



const sassFiles = [
    "./src/styles/variables.scss",
    "./src/styles/custom.scss",
    "./src/styles/bootstrap-4.0.0/scss/_variables.scss"
  ];

const vendorJsFiles = [
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./src/styles/bootstrap-4.0.0/dist/js/bootstrap.js",
  ];


// Gulp task for optimizing sass/css files to create styles.min.css
gulp.task("sass", function (done) {
    gulp
      .src(sassFiles)
      .pipe(gulpSASS())
      .pipe(concatenate("styles.css"))
      .pipe(gulp.dest("./public/css/"))
      .pipe(autoPrefix())
      .pipe(cleanCSS())
      .pipe(rename("styles.min.css"))
      .pipe(gulp.dest("./public/css/"));
    done();
  });

  gulp.task("js:vendor", function (done) {
    gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.js"))
    .pipe(gulp.dest("./public/js/"))
    .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
    done();
  }); 

  gulp.task("image", function (done) {
    gulp
    .src(imgFiles)
		.pipe(imagemin())
		.pipe(gulp.dest("./public/img"))
    done();
  }); 


  gulp.task("build", gulp.parallel(["sass", "js:vendor","image"]));

  gulp.task("watch", function (done) {
    gulp.watch(sassFiles, gulp.series("sass"));
    gulp.watch(vendorJsFiles, gulp.series("js:vendor"));
    done();
  });
  
  gulp.task("default", gulp.series("watch"));
  

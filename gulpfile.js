const gulp            = require('gulp');
const concat            = require('gulp-concat');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS       = require('gulp-clean-css'); 
const uglify      = require('gulp-uglify');
const del = require ('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
] 

const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
] 

// Собираем стили
function styles() {
    return gulp.src(cssFiles)
       .pipe(concat('style.css'))// объединили в один файл
       .pipe(autoprefixer({  //подставили автопрефиксы
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
       .pipe(cleanCSS({level: 2})) //сжали css

       .pipe(gulp.dest('./build/css'))// выплюнули стили
       .pipe(browserSync.stream()); 
}
   
// Собираем скрипты
function scripts() {
    return gulp.src(jsFiles)
      .pipe(concat('script.js')) //объединили в один файл
      .pipe(uglify({
          toplevel: true
      })) //минифицировали js

      .pipe(gulp.dest('./build/js'))// выплюнули стили 
      .pipe(browserSync.stream()); 
}

//Удалить все в указанной папке
function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
       server: {
           baseDir: './'
       }
    });
    // Следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles)
    // Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts)
    // Следить за html файлами
    gulp.watch('./*.html').on('change', browserSync.reload);
}


// Таск, вызывающий функцию styles
gulp.task('styles', styles);

// Таск, вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск, вызывающий функцию clean
gulp.task('del', clean);

// Таск, вызывающий функцию watch
gulp.task('watch', watch);

// Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));





// /* -------  Configuration ------- */

// var paths = {

//     html: 'dist/',
//     styles: {
//         sourceSCSS: 'src/my_components/',
//         produceCSS: 'dist/css/'
//     },
//     js: {
//         source: 'src/js/',
//         produce: 'dist/js/'
//     },
//     images: {
//         source: 'src/images/',
//         produce: 'dist/img/'
//     }

// };

// /* ------- Gulp Tasks ------- */

// gulp.task('serve', function() {
//     browserSync.init({
//         server: "src"
//     });
// });

// gulp.task('watch', function() {
//     gulp.watch('src/my_components' + '*.scss', ['sass']);
//     gulp.watch('src/js' + '*.js', ['js']);
//     gulp.watch('src/images' + '*', ['imgmin']);
//     gulp.watch('src/' + '*.html').on('change', browserSync.reload);
// });

// gulp.task('sass', function() {
//     gulp.src('src/my_components'+ '*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass({outputStyle: 'expanded'}))
//         .pipe(autoprefixer({
//             browsers: ['last 3 versions'],
//             cascade: false
//         }))
//         .pipe(concat('all.css'))
//         .pipe(minifyCSS({
//             advanced: false
//         }))
//         .pipe(sourcemaps.write())
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(gulp.dest(dist/css/all.css))
// });

// gulp.task('js', function() {
//     gulp.src(paths.js.source + '*.js')
//         .pipe(sourcemaps.init())
//         .pipe(concat('all.js'))
//         .pipe(minifyJS())
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(sourcemaps.write('/', {
//             sourceMappingURL: function(file) {
//               return file.relative + '.map';
//             }
//           }))
//         .pipe(gulp.dest(paths.js.produce))
//         .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('imgmin', function () {
//     return gulp.src(['src/images' + '*.png', 'src/images' + '*.jpg'])
//         .pipe(imagemin({
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('dist/img'))
// });

// gulp.task('remove-comments', function () {
//     return gulp.src(paths.styles.css + '*.css')
//         .pipe(stripCssComments())
//         .pipe(gulp.dest(paths.styles.css));
// });
//
// /* ------- Main Gulp Tasks ------- */
//
// gulp.task('default', function() {
//     runSequence(['sprite-png', 'sprite-svg'], ['imgmin', 'sass'], 'serve', 'watch');
// });
// gulp.task('finish', ['remove-comments'], function(){
//     gulp.src('/')
//         .pipe(notify("Ready to commit"));
// })

import path from 'path';
let project_folder = 'logo';
let source_folder = '#src';

import fs from 'fs';

let pathproject = {
   build: {
      html: project_folder + '/',
      css: project_folder + '/css/',
      js: project_folder + '/js/',
      img: project_folder + '/img/',
      fonts: project_folder + '/fonts/'
   },
   src: {
      html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
      css: source_folder + '/scss/style.scss',
      js: source_folder + '/js/*.js',
      img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,ico,webp}',
      fonts: source_folder + '/fonts/*.ttf'
   },
   watch: {
      html: source_folder + '/**/*.html',
      css: source_folder + '/scss/**/*.scss',
      js: source_folder + '/js/**/*.js',
      img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,ico,webp}'
   },
   clean: './' + project_folder + '/'
}

import gulp from 'gulp';
const { src, dest, parallel, series, watch } = gulp;
import browsersync from 'browser-sync';
browsersync.create();
import fileinclude from 'gulp-file-include';
import del from 'del';
import scssGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import group_media from 'gulp-group-css-media-queries';
import clean_css from 'gulp-clean-css';
import scss from 'gulp-dart-sass';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import webphtml from 'gulp-webp-html';
import webpcss from 'gulp-webp-css';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import fonter from 'gulp-fonter';

const browserSync = () => {
   browsersync.init({
      server: {
         baseDir: './' + project_folder + '/'
      },
      port: 3000,
      notify: false
   })
}

export const html = () => {
   return src(pathproject.src.html)
      .pipe(fileinclude())
      .pipe(webphtml())
      .pipe(dest(pathproject.build.html))
      .pipe(browsersync.stream())
}

export const images = () => {
   return src(pathproject.src.img)
      .pipe(
         webp({
            quality: 70
         })
      )
      .pipe(dest(pathproject.build.img))
      .pipe(src(pathproject.src.img))
      .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{ removeViewBox: false }],
         interlaced: true,
         optimizationLevel: 3
      }))
      .pipe(dest(pathproject.build.img))
      .pipe(browsersync.stream())
}

export const js = () => {
   return src(pathproject.src.js)
      .pipe(fileinclude())
      .pipe(dest(pathproject.build.js))
      .pipe(terser())
      .pipe(rename({
         extname: '.min.js'
      }))
      .pipe(dest(pathproject.build.js))
      .pipe(browsersync.stream())
}

export const css = () => {
   return src(pathproject.src.css)
      .pipe(scssGlob())
      .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
      .pipe(group_media())
      .pipe(
         autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
         }))
      .pipe(webpcss({ webpClass: '', noWebpClass: '.no-webp' }))
      .pipe(dest(pathproject.build.css))
      .pipe(clean_css())
      .pipe(rename({
         extname: '.min.css'
      }))
      .pipe(dest(pathproject.build.css))
      .pipe(browsersync.stream())
}

export const fonts = () => {
   src(pathproject.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(pathproject.build.fonts));
   return src(pathproject.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(pathproject.build.fonts));
}


// gulp.task('otf2ttf', function () {
//    return src([source_folder + '../fonts/*.otf'])
//       .pipe(fonter({
//          formats: ['ttf']
//       }))
//       .pipe(dest(source_folder + '../fonts/'))
// })

export const fontsStyle = () => {
   let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
   if (file_content == '') {
      fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
      return fs.readdir(pathproject.build.fonts, function (err, items) {
         if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
               }
               c_fontname = fontname;
            }
         }
      })
   }
}

const cb = () => {

}

const watchFiles = () => {
   watch([pathproject.watch.html], html)
   watch([pathproject.watch.css], css)
   watch([pathproject.watch.js], js)
   watch([pathproject.watch.img], images)
}

const clean = () => {
   return del(pathproject.clean);
}

export default parallel(series(clean, parallel(js, css, html, images, fonts), fontsStyle), watchFiles, browserSync);
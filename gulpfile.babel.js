import {src, dest, watch, parallel, series, task} from 'gulp'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import minifycss from 'gulp-minify-css'

// Build Directories
// ----
const dirs = {
  src: 'src',
  dest: 'dist'
}

// File Sources
// ---- 
const sources = {
  views: `${dirs.src}/**/*.pug`,
  styles: `${dirs.src}/**/*.sass`
}

// Main Tasks
// ----

// Run server
export const server = () => {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  })
  watch(sources.views, buildViews)
  watch(sources.styles, buildStyles)
}

// Styles
export const buildStyles = () => src(sources.styles)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(minifycss())
  .pipe(dest(dirs.dest))
  .pipe(browserSync.stream())

// Views
export const buildViews = () => src(sources.views)
  .pipe(pug())
  .pipe(dest(dirs.dest))
  .pipe(browserSync.stream())

// Development Task
export const dev = series(server)

// Default task
export default dev
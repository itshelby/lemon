import {src, dest, watch, parallel, series, task} from 'gulp'
import browserSync from 'browser-sync'
import pug from 'gulp-pug'

// Build Directories
// ----
const dirs = {
  src: 'src',
  dest: 'dist'
}

// File Sources
// ---- 
const sources = {
  views: `${dirs.src}/**/*.pug`
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
}

// Views
export const buildViews = () => src(sources.views)
  .pipe(pug())
  .pipe(dest(dirs.dest))
  .pipe(browserSync.stream())

// Development Task
export const dev = series(server)

// Default task
export default dev
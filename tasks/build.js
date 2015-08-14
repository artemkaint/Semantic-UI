/*******************************
          Build Task
*******************************/

var
  // dependencies
  gulp         = require('gulp-help')(require('gulp')),
  runSequence  = require('run-sequence'),

  // config
  config       = require('./config/user'),
  install      = require('./config/project/install'),

  // task sequence
  tasks        = []
;


// sub-tasks
if(config.rtl) {
  if(config.rtl === true || /^(yes|both)$/.test(config.rtl.toString().toLowerCase())) {
    require('./collections/rtl')(gulp);
  }
}
require('./collections/build')(gulp);


module.exports = function(callback) {

  console.info('Building Semantic');

  if( !install.isSetup() ) {
    console.error('Cannot find semantic.json. Run "gulp install" to set-up Semantic');
    return;
  }

  if(config.rtl) {
    // check for right-to-left (RTL) language
    if(config.rtl.toString().toLowerCase() == 'both') {
      tasks.push('build-rtl');
    }
    if(config.rtl === true || config.rtl.toString().toLowerCase() === 'yes') {
      gulp.start('build-rtl');
      return;
    }
  }

  tasks.push('build-javascript');
  tasks.push('build-css');
  tasks.push('build-assets');

  runSequence(tasks, callback);
};

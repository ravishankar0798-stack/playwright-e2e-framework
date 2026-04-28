module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/step_definitions/**/*.js',
      'features/support/**/*.js'
    ],
    tags: '@Validation',
    format: ['progress', 'html:cucumber-report.html'],
    publishQuiet: true
  }
};
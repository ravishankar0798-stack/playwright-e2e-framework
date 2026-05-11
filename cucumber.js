module.exports = {
  default: {
    require: [
      "tests/hooks/**/*.ts",
      "tests/step-definitions/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
     format: [
      "progress",
      "json:reports/cucumber-report.json",
      "rerun:@rerun.txt"
    ],
    parallel: 2
  }
};
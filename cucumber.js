module.exports = {
  default: {
    require: [
      "tests/hooks/**/*.ts",
      "tests/step-definitions/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress"]
  }
};
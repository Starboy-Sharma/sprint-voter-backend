module.exports = {
  ...require("ts-jest/jest-preset"),
  ...require("@shelf/jest-mongodb/jest-preset"),
  coveragePathIgnorePatterns: [
    "<rootDir>/tests/util/",
    "<rootDir>/node_modules/"
  ]
};

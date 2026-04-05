module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/database/", "test/e2e/"],
  testPathIgnorePatterns: ["/node_modules/", "test/e2e/"],
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/app.js", "!src/database.js"],
  verbose: true,
};

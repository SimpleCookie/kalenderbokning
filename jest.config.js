module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "@db": "<rootDir>/src/storage/db.ts",
    "@src/(.*)": [
      "<rootDir>/src/$1"
    ]
  },
};
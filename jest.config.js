module.exports = {
  verbose: true,
  roots: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["src"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@db": "<rootDir>/src/storage/db.ts",
    "^@src/(.*)": "<rootDir>/src/$1",
  },
};

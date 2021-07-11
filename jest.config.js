module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleNameMapper: {
    "@db": "<rootDir>/src/storage/db.ts",
    "@src/(.*)": "<rootDir>/src/$1",
  },
};

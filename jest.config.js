module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/sagas/*.js'],
  coveragePathIgnorePatterns: ['node_modules'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testRegex: '__tests__/.*\\.test\\.js$',
  testEnvironment: 'jsdom',
  snapshotSerializers: [],
};

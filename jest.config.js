module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: false,
  collectCoverage: true,
  collectCoverageFrom: ['**'],
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 70,
    },
  },
  rootDir: 'src',
};

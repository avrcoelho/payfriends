module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/dtos/*',
    '!<rootDir>/src/**/models/*',
    '!<rootDir>/src/@types/*',
    '!<rootDir>/src/presentation/assets/**/*',
    '!<rootDir>/src/main/index.tsx',
    '!<rootDir>/src/main/factories/**',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  moduleNameMapper: {
    '\\.(s?css|png|jpe?g)$': '<rootDir>/mocks/emptyFileMock.js',
    '\\.svg$': '<rootDir>/mocks/svgMock.js',
    '@/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.{ts,tsx}'],
  setupFiles: ['<rootDir>/mocks/setupTest.js'],
};

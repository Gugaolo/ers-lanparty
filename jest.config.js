// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Custom Jest config
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // alias @ to root
  },
};

module.exports = createJestConfig(customJestConfig);

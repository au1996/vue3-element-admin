module.exports = {
  moduleFileExtensions: ['vue', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['<rootDir>/tests/**/*.(spec|test).(js|jsx)|**/__tests__/*.(js|jsx)']
}

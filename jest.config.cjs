module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    testMatch: [
        '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'
    ]
};
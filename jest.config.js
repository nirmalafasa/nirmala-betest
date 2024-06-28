module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setupTests.js'],
    moduleNameMapper: {
      '^redisClient$': './__mocks__/redisClient.js',
    },
};
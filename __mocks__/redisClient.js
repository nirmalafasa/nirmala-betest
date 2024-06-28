const redis = require('redis');

const mockRedisClient = {
    get: jest.fn(),
    setEx: jest.fn(),
    flushall: jest.fn(),
    quit: jest.fn(),
};

module.exports = {
    createClient: () => mockRedisClient,
};

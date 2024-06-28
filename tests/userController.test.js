const express = require('express');
const request = require('supertest');
const { getUserByAccountNumber, getUserByRegistrationNumber } = require('../src/controllers/userController');
const UserInfo = require('../src/models/UserInfo');
const redisClient = require('../config/redisClient');

jest.mock('../src/models/UserInfo');
jest.mock('../config/redisClient');

const app = express();
app.use(express.json());

app.get('/api/user/accountNumber/:accountNumber', getUserByAccountNumber);
app.get('/api/user/registrationNumber/:registrationNumber', getUserByRegistrationNumber);

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserByAccountNumber', () => {
        it('should return user info from cache if available', async () => {
            const mockUser = { accountNumber: '12345', fullName: 'Nirmala' };
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, JSON.stringify(mockUser));
            });

            const res = await request(app).get('/api/user/accountNumber/12345');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockUser);
        });

        it('should return user info from database if not in cache', async () => {
            const mockUser = { accountNumber: '12345', fullName: 'Nirmala' };
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, null);
            });
            UserInfo.findOne.mockResolvedValue(mockUser);

            const res = await request(app).get('/api/user/accountNumber/12345');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockUser);
            expect(UserInfo.findOne).toHaveBeenCalledWith({ accountNumber: '12345' });
            expect(redisClient.setEx).toHaveBeenCalledWith(
                'redis_nirmala_betest:12345',
                3600,
                JSON.stringify(mockUser)
            );
        });

        it('should return 404 if user is not found', async () => {
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, null);
            });
            UserInfo.findOne.mockResolvedValue(null);

            const res = await request(app).get('/api/user/accountNumber/12345');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ msg: 'User not found' });
        });
    });

    describe('getUserByRegistrationNumber', () => {
        it('should return user info from cache if available', async () => {
            const mockUser = { registrationNumber: '001A', fullName: 'Faizah' };
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, JSON.stringify(mockUser));
            });

            const res = await request(app).get('/api/user/registrationNumber/001A');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockUser);
        });

        it('should return user info from database if not in cache', async () => {
            const mockUser = { registrationNumber: '001A', fullName: 'Faizah' };
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, null);
            });
            UserInfo.findOne.mockResolvedValue(mockUser);

            const res = await request(app).get('/api/user/registrationNumber/001A');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockUser);
            expect(UserInfo.findOne).toHaveBeenCalledWith({ registrationNumber: '001A' });
            expect(redisClient.setEx).toHaveBeenCalledWith(
                'redis_nirmala_betest:001A',
                3600,
                JSON.stringify(mockUser)
            );
        });

        it('should return 404 if user is not found', async () => {
            redisClient.get.mockImplementation((key, callback) => {
                callback(null, null);
            });
            UserInfo.findOne.mockResolvedValue(null);

            const res = await request(app).get('/api/user/registrationNumber/abc123');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ msg: 'User not found' });
        });
    });
});

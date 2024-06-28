const UserInfo = require('../models/UserInfo');
const redisClient = require('../../config/redisClient');

const CACHE_EXPIRATION = 3600;

exports.getUserByAccountNumber = async (req, res) => {
    const { accountNumber } = req.params;
    try {
        redisClient.get(`redis_nirmala_betest:${accountNumber}`, async (err, data) => {
            if (err) throw err;
            if (data) {
                return res.json(JSON.parse(data));
            } else {
                const user = await UserInfo.findOne({ accountNumber });
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                redisClient.setEx(`redis_nirmala_betest:${accountNumber}`, CACHE_EXPIRATION, JSON.stringify(user));
                res.json(user);
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUserByRegistrationNumber = async (req, res) => {
    const { registrationNumber } = req.params;
    try {
        redisClient.get(`redis_nirmala_betest:${registrationNumber}`, async (err, data) => {
            if (err) throw err;

            if (data) {
                return res.json(JSON.parse(data));
            } else {
                const user = await UserInfo.findOne({ registrationNumber });
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }

                redisClient.setEx(`redis_nirmala_betest:${registrationNumber}`, CACHE_EXPIRATION, JSON.stringify(user));
                res.json(user);
            }
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
};

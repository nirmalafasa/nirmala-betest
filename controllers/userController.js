const UserInfo = require('../models/UserInfo');

exports.getUserByAccountNumber = async (req, res) => {
    const { accountNumber } = req.params;
    try {
        const user = await UserInfo.findOne({ accountNumber });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUserByRegistrationNumber = async (req, res) => {
    const { registrationNumber } = req.params;
    try {
        const user = await UserInfo.findOne({ registrationNumber });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

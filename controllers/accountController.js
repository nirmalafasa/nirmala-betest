const AccountLogin = require('../models/AccountLogin');

exports.getAccountLoginByLastLogin = async (req, res) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    try {
        const logins = await AccountLogin.find({ lastLoginDateTime: { $lt: threeDaysAgo } });
        res.json(logins);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

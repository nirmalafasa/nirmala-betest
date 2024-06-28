const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
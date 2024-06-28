const mongoose = require('mongoose');

const accountLoginSchema = new mongoose.Schema({
    accountId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    lastLoginDateTime: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' },
});

module.exports = mongoose.model('AccountLogin', accountLoginSchema);
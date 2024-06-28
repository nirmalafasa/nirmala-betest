const AccountLogin = require('../models/AccountLogin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserInfo = require('../models/UserInfo');
const { default: mongoose } = require('mongoose');

exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        let account = await AccountLogin.findOne({ userName });
        if (!account || !(await bcrypt.compare(password, account.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        jwt.sign(
            { user: { id: account.userId } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.register = async (req, res) => {
    const { fullName, accountNumber, emailAddress, registrationNumber, userName, password } = req.body;

    try {
        let user = await UserInfo.findOne({ accountNumber });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        user = new UserInfo({
          fullName,
          accountNumber,
          emailAddress,
          registrationNumber,
          userId: new mongoose.Types.ObjectId(),
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const accountLogin = new AccountLogin({
          accountId: new mongoose.Types.ObjectId(),
          userName,
          password: hashedPassword,
          userId: user.userId,
        });

        await user.save();
        await accountLogin.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

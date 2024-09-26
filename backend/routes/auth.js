// Handles user registration and login



const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        newUser.save().then(user => res.json(user));
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'User not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name };
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            } else {
                return res.status(400).json({ password: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;

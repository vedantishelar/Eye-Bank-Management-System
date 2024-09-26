// Handles donor management like adding and listing donors.



const express = require('express');
const Donor = require('../models/Donor');
const router = express.Router();

// Register a new donor
router.post('/add', (req, res) => {
    const { name, age, bloodType, contact } = req.body;

    const newDonor = new Donor({
        name,
        age,
        bloodType,
        contact
    });

    newDonor.save().then(donor => res.json(donor));
});

// List all donors
router.get('/', (req, res) => {
    Donor.find().then(donors => res.json(donors));
});

module.exports = router;

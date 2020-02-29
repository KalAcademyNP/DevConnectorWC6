const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email})
})

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Route POST api/users
//@desc Register a user
//access public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required and must be more than 3 letters')
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
    check('password', 'Password Length must be more than 4').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // checing if errors is not empty
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

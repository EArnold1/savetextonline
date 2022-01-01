const express = require('express');
const router = express.Router();
const Texts = require('../models/Texts');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//Route POST api/texts
//@desc Save a text
//access private
router.post(
  '/',
  [auth, [check('textarea', 'Input something to textarea').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, textarea } = req.body;

    try {
      const newText = new Texts({
        title,
        textarea,
        user: req.user.id,
      });

      const textFile = await newText.save();
      res.json(textFile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//Route GET api/texts
//@desc Read users text
//access private
router.get('/', auth, async (req, res) => {
  try {
    const texts = await Texts.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(texts);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Route PUT api/texts
//@desc update a text
//access private
router.put('/:id', auth, async (req, res) => {
  const { textarea, title, upDate } = req.body;
  //Build a text object
  const textobj = {};
  if (textarea) textobj.textarea = textarea;
  if (title) textobj.title = title;
  textobj.upDate = Date.now();

  try {
    let text = await Texts.findById(req.params.id);
    if (!text) return res.status(404).json({ msg: 'Not found' });

    // User Verification
    if (text.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Texts.findByIdAndUpdate(
      req.params.id,
      { $set: textobj },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Route DELETE api/texts
//@desc delete a text
//access private
router.delete('/:id', auth, async (req, res) => {
  try {
    let text = await Texts.findById(req.params.id);
    if (!text) return res.status(404).json({ msg: 'Not found' });

    // User Verification
    if (text.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Texts.findByIdAndRemove(req.params.id, { useFindAndModify: false });
    res.json({ msg: 'Text Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

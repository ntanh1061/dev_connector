const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");

// @route    POST api/profile
// @desc     Add profile
// @access   Private
router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "skills is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const {
      status,
      skills,
      twitter,
      facebook,
      youtube,
      linkedin,
      instagram,
      ...rest
    } = req.body;

    const profileFields = {
      user: req.user.id,
      skills: skills.split(",").map((i) => i.trim()),
      ...rest,
    };

    const socialFields = { twitter, facebook, youtube, linkedin, instagram };

    for (const [key, value] of Object.entries(socialFields)) {
      socialFields[key] = value;
    }

    profileFields.social = socialFields;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(profile);
    } catch (err) {
      console.error(err.message);

      res.status(500).json("Internal Server Error");
    }
  }
);

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    res.json({ profile });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

// @route    PUT api/profile/add-experience
// @desc     Add Experience
// @access   Private
router.put("/add-experience", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

// @route    PUT api/profile/add-education
// @desc     Add Education
// @access   Private
router.put("/add-education", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;

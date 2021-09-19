const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
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

// @route DELETE api/profile
// @desc Delete Account and Profile
// @access Private
router.delete("/delete-account", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    await Promise.all([
      Profile.findByIdAndRemove({ user: req.user.id }),
      User.findByIdAndRemove({ user: req.user.id }),
    ]);

    res.json({ msg: "Delete successfully" });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

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

    res.json({ profile });
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

    res.json({ profile });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

// @route DELETE api/profile/delete-education
// @desc Delete Education
// @access Private
router.delete("/delete-education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = await profile.education.filter((item) => {
      return item._id.toString() !== req.params.education_id;
    });

    await profile.save();

    res.json({ profile });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

// @route DELETE api/profile/delete-experience
// @desc Delete Experience
// @access Private
router.delete("/delete-experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = await profile.experience.filter((item) => {
      return item._id.toString() !== req.params.experience_id;
    });

    await profile.save();

    res.json({ profile });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;

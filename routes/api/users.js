const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validatingregister = require("../../validation/register");
const validatingrlogin = require("../../validation/login");

const User = require("../../models/User");
router.get("/demo", (req, res) => res.json({ msg: "user api Works" }));

router.post("/register", (req, res) => {
  const { errors, isValid } = validatingregister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already registered" });
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validatingrlogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json("No user with this email");
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; 

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;

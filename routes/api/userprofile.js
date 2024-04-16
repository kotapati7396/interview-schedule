const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/userprofile");
const validateExperienceInput = require("../../validation/experience");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//test api
router.get("/demo", (req, res) =>
    res.json({
        msg: "Profile Works"
    })
);
//get request
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const errors = {};
        Profile.findOne({
            user: req.user.id
        })
            .populate("user", ["name"])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "no profile exists for this person";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);
router.get("/all", (req, res) => {
    Profile.find()
        .populate("user", ["name"])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = "no profiles";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err =>
            res.status(404).json({
                profile: "no profiles"
            })
        );
});
router.get("/profilename/:profilename", (req, res) => {
    const errors = {};

    Profile.findOne({
        profilename: req.params.profilename
    })
        .populate("user", ["name"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});
router.get("/users/:users_id", (req, res) => {
    Profile.findOne({
        user: req.params.user_id
    })
        .populate("user", ["name"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "there is no profile";
                res.status(400).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const fields = {};
        fields.user = req.user.id;

        if (req.body.profilename) fields.profilename = req.body.profilename;
        if (req.body.company) fields.company = req.body.company;
        if (req.body.location) fields.location = req.body.location;
        if (req.body.contact) fields.contact = req.body.contact;

        if (typeof req.body.skills !== "undefined")
            fields.skills = req.body.skills.split(",");


        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            if (profile) {
                Profile.findOneAndUpdate(
                    {
                        user: req.user.id
                    },
                    {
                        $set: fields
                    },
                    {
                        new: true
                    }
                ).then(profile => res.json(profile));
            } else {
                Profile.findOne({
                    profilename: fields.profilename
                }).then(profile => {
                    if (profile) {
                        errors.profilename = "profile already there";
                        res.status(400).json(errors);
                    }
                    new Profile(fields)
                        .save()
                        .then(profile => res.json(profile));
                });
            }
        });
    }
);

router.post(
    "/experience",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            const newExperience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,

                description: req.body.description
            };

            profile.experience.unshift(newExperience);

            profile.save().then(profile => res.json(profile));
        });
    }
);

router.delete(
    "/experience/:exp_id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                const remove = profile.experience
                    .map(item => item.id)
                    .indexof(req.params.exp_id);
                profile.experience.splice(remove, 1);

                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateOffresInput = require("../../validation/offres");
const offres = require("../../models/offres");
const User = require("../../models/User");
router.get("/demo", (req, res) =>
    res.json({
        msg: "Offres Works"
    })
);
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const errors = {};
        offres.findOne({
            user: req.user.id
        })
            .populate("user", ["name"])
            .then(offre => {
                if (!offre) {
                    errors.nooffre = "no offre exists for this company";
                    return res.status(404).json(errors);
                }
                res.json(offre);
            })
            .catch(err => res.status(404).json(err));
    }
);
router.get("/all", (req, res) => {
    offres.find()
        .populate("user", ["name"])
        .then(offres => {
            if (!offres) {
                errors.nooffre = "no offres";
                return res.status(404).json(errors);
            }
            res.json(offres);
        })
        .catch(err =>
            res.status(404).json({
                offre: "no offres"
            })
        );
});
router.get("/jobTitle/:jobTitle", (req, res) => {
    const errors = {};

    offres.findOne({
        jobTitle: req.params.jobTitle
    })
        .populate("user", ["name"])
        .then(offre => {
            if (!offre) {
                errors.nooffre = "There is no offre for this user";
                res.status(404).json(errors);
            }

            res.json(offres);
        })
        .catch(err => res.status(404).json(err));
});
router.get("/users/:users_id", (req, res) => {
    offres.findOne({
        user: req.params.user_id
    })
        .populate("user", ["name"])
        .then(offre => {
            if (!offre) {
                errors.nooffre = "there is no offre";
                res.status(400).json(errors);
            }
            res.json(offre);
        })
        .catch(err => res.status(404).json(err));
});
router.post(
    "/",
   
    (req, res) => {
      
        const fields = {};
        console.log(req.body)
        new offres(req.body).save()
        res.json(offres)


    }
);



module.exports = router;

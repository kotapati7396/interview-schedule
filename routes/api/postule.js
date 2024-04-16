const router = require("express").Router();
const advancedResults = require("../../middleware/advancedResults");
const mongoose = require("mongoose");
const passport = require("passport");
const news = require("../../models/postuleModel");


const {
    getNewsletters,
    createNewsletter,
    getNewsletter,
    updateNewsletter,
    deleteNewsletter
}= require("../../controllers/postuleC");
router.route("/").get(advancedResults(news), getNewsletters).post(createNewsletter);
router.route("/:id").get(getNewsletter).put(updateNewsletter);
router.route("/:id").delete(deleteNewsletter);
module.exports = router;


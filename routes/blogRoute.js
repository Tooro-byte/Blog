const express = require("express");
const router = express.Router();

const blogModel = require("../model/blogModel");
router.get("/blog", (req, res) => {
  res.render("blog");
});

// A post route to send Data to the Data Base.
router.post("/blog", async (req, res) => {
  try {
    console.log(req.body);
    const newBlog = new blogModel(req.body);
    await newBlog.save();
  } catch (error) {
    console.error(error);
    res.status(400).render("blog");
  }
});
module.exports = router;

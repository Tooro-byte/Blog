const express = require("express");
const router = express.Router();

const blogModel = require("../model/blogModel"); // Correct model import

// Route to render the form for creating a new blog post
router.get("/blog", (req, res) => {
  res.render("blog");
});
// A get route to retrieve data from the data base
router.get("/bloglists", async (req, res) => {
  try {
    let blog = await blogModel.find().sort({ $natural: -1 });
    res.render("blogLists", { blog });
  } catch (error) {
    res.status(400).send("Unable to find requested Blog Post");
  }
});

// Posting a blog Post to the Data Base.
router.post("/blog", async (req, res) => {
  try {
    console.log(req.body);
    const newBlog = new blogModel(req.body);
    await newBlog.save();
    res.redirect("/blogLists"); // Redirect after successful creation
  } catch (error) {
    console.error(error);
    // It's good practice to send a meaningful response or render with an error message
    res.status(400).render("blog", { error: "Failed to create blog post." });
  }
});

// GET route for displaying the update form (fetches existing blog data)
router.get("/updateblog/:id", async (req, res) => {
  try {
    const updateBlog = await blogModel.findOne({ _id: req.params.id });
    if (!updateBlog) {
      // If blog not found, respond with 404
      return res.status(404).send("Blog not found.");
    }
    res.render("updateBlog", { blog: updateBlog });
  } catch (error) {
    console.error("Error finding blog for update:", error.message);
    res
      .status(500)
      .send("Internal Server Error: Unable to find Blog in the Database.");
  }
});

// POST route for submitting the updated blog data
router.post("/updateblog/:id", async (req, res) => {
  // FIX: Added the missing 'try {' block here
  try {
    const updatedBlog = await blogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).send("Blog to update not found.");
    }
    res.redirect("/blogLists"); // Redirect after successful update
  } catch (error) {
    // This 'catch' now correctly belongs to the 'try' above it
    console.error("Error updating blog:", error.message);
    res.status(500).send("Update Failed: Internal Server Error");
  }
});

// Deleting Blog Post
router.post("/deleteblog/:id", async (req, res) => {
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).send("Blog to delete not found.");
    }
    res.redirect("/bloglists");
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).send("Unable to delete Your Blog, Please try Again");
  }
});
module.exports = router;

//1a:  Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
require("dotenv").config();

//1b: Importing Routes
const blogRoute = require("./routes/blogRoute");
const { error } = require("console");

// 2: Instantiations
const app = express();
const port = 3004;

//3:  Configurations
app.locals.moment = moment;
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log(`Secure Connection has been established for Mongoose`);
  })
  .on("error", () => {
    console.error(error.message);
  });
//Setting up a templating Engine!
//Setting pug as the view Engine!
app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views")); // Specify a folder containing frontend files
app.use(express.static("views")); // Collect pug files from the views folder.

//4a: Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//4b: Using Imported routes from the routes folder
app.use("/", blogRoute);

//Handling Non -existing routes.
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6: Bootstrapping the Server
//Always put this line of code at the enf of the index.js file.
app.listen(port, () => {
  console.log(`Server has started running on Port ${port} Feel Good.`);
});

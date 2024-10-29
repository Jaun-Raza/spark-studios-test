//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const homeStartingContent = "Spark's Book is a captivating collection of moral stories and poetry curated to inspire and uplift readers. Through heartfelt narratives and lyrical verses, this book delves into themes of compassion, resilience, and the beauty of the human spirit. With each page, readers are invited to explore the depths of morality and the power of words to evoke profound emotions and reflections. Spark's Book is a timeless treasure trove, offering wisdom and solace for readers of all ages.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/" + "sparkBook");

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  date: String
})

const Post = new mongoose.model("Posts", postSchema)


app.get("/", async function (req, res) {

  const allPosts = await Post.find({});

  res.render("home", {
    startingContent: homeStartingContent,
    posts: allPosts
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const date = new Date(Date.now());

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    date: date
  });

  post.save().then(() => {
    res.redirect("/");
  })

});


app.get("/posts/:postName", async function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  const allPosts = await Post.find({});

  allPosts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        postId: post._id,
        title: post.title,
        content: post.content,
        date: post.date
      });
    }
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

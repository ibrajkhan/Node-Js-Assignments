const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const methodOverride = require("method-override");
const app = express();

app.set("views", "./views");
app.set("views engine", "ejs");

mongoose.connect("mongodb://localhost:27017/assignment_4");

app.use(methodOverride("_method"));

app.use(bodyParser());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let users = await User.find();
  res.render("index.ejs", { users });
});

app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.post("/users/add", async (req, res) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    isPromoted: req.body.isPromoted,
  });
  console.log(user);
  res.redirect("/");
});

app.put("/users/:id", async (req, res) => {
  await User.updateOne({ _id: req.params.id }, [
    { $set: { isPromoted: { $not: "$isPromoted" } } },
  ]);
  console.log("updated");
  res.redirect("/");
});

app.delete("/users/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

app.listen("3000", () => console.log("server is listining"));

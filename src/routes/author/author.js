const express = require("express");
const mongoose = require("mongoose");
const Author = require("./schema");
const { authenticate } = require("../../weapons/AuthTools");
const { generateJWT } = require("../../weapons/AuthTools");

const route = express.Router();
/*
 CREATE CRUD FOR AUTHOR AND TEST IF IT IS WORKING OK



*/

// route.get("/me", authenticate, async (req, res, next) => {
//   try {
//     res.status(200).send(req.user);
//   } catch (error) {
//     console.log(error);
//   }
// });

route.post("/", async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body);

    const { _id } = newAuthor;

    const token = await generateJWT({ id: _id });

    console.log("---->", token);

    await newAuthor.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
  }
});

route.get("/", async (req, res, next) => {
  try {
    const author = await Author.find();

    res.status(201).send(author);
  } catch (error) {
    console.log(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);

    res.status(201).send(author);
  } catch (error) {
    console.log(error);
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const modifiedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).send(modifiedAuthor);
  } catch (error) {
    console.log(error);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const deletedArtic = await Author.findByIdAndDelete(req.params.id);
    res.status(200).send("DELETED");
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;

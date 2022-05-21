const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json([notes]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", " Enter a valid title").isLength({ min: 3 }),
    body("description", " Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await notes.save();
      res.json([savenote]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("NOT ALLOWED");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }

    note = await Note.findOneAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("NOT ALLOWED");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;

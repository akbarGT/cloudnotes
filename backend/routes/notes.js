const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Fetch All Notes From DB [Requires Login]
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured. File= notes.js");
  }
});

//Route 2: Add New a Note To DB [Requires Login]
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      ////Data Validition>>>>
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array() + "Title/Description Too Small" });
      }
      /////Data Validition<<<<
      let { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured. File=notes.js");
    }
  }
);

//Route 3: Update Existing Note [Requires Login]
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    let { title, description, tag } = req.body;
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

    ///Find The Note To Update;
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found.");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Now Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured. File= notes.js");
  }
});

//Route 4: Delete Existing Note [Requires Login]
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    ///Find The Note To Be Deleted;
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found.");
    }
    ///Check Note Owner
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Now Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send(
        "Internal Server Error Occured. File= notes.js, Cannot Delete Note"
      );
  }
});

module.exports = router;

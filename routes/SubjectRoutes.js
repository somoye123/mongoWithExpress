const express = require("express");
const SubjectModel = require("../models/SubjectModel");
const router = express.Router();

// creating a subject
router.post("/", async function(req, res) {
  try {
    const subject = await SubjectModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: subject
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while creating subject"
    });
  }
});

// Update a subject
router.put("/:id", async function(req, res) {
  try {
    const updatedSubject = await SubjectModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedSubject) {
      res.status(404).json({
        status: "error",
        message: "Subject does not exist"
      });
    }

    res.json({
      status: "success",
      data: updatedSubject
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while updating the subject"
    });
  }
});

// Delete a subject
router.delete("/:id", async function(req, res) {
  try {
    const deletedSubject = await SubjectModel.findOneAndDelete({
      _id: req.params.id
    });

    if (!deletedSubject) {
      res.status(404).json({
        status: "error",
        message: "Sorry you cannot delete a subject that does not exist"
      });
      return;
    }

    res.json({
      status: "success",
      message: "Successfully deleted subject"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while deleting the subject"
    });
  }
});

router.get("/:id", async function(req, res) {
  try {
    const subject = await SubjectModel.findOne({ _id: req.params.id });

    if (!subject) {
      res.status(404).json({
        status: "error",
        message: "The subject was not found"
      });
      return;
    }

    res.json({
      status: "success",
      data: subject
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while showing the subject"
    });
  }
});

module.exports = router;

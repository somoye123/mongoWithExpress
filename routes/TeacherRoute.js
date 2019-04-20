const express = require("express");
const bcrypt = require("bcrypt");
const TeacherModel = require("../models/TeacherModel");
const router = express.Router();

router.post("/", async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const teacher = await TeacherModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: teacher
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while creating a teacher account"
    });
  }
});

// Update a teacher
router.put("/:email", async function(req, res) {
  try {
    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    if (!updatedTeacher) {
      res.status(404).json({
        status: "error",
        message: `Sorry ${req.body} does not exist`
      });
    }

    res.json({
      status: "success",
      data: updatedTeacher
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while updating the teacher"
    });
  }
});

router.delete("/:email", async function(req, res) {
  try {
    const deletedTeacher = await TeacherModel.findOneAndDelete({
      email: req.params.email
    });

    if (!deletedTeacher) {
      res.status(404).json({
        status: "error",
        message: "Sorry you cannot delete a teacher that does not exist"
      });
      return;
    }

    res.json({
      status: "success",
      message: "Successfully deleted teacher"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while deleting the teacher"
    });
  }
});
router.get("/:email", async function(req, res) {
  try {
    const teacher = await TeacherModel.findOne({ email: req.params.email });

    if (!teacher) {
      res.status(404).json({
        status: "error",
        message: "The teacher was not found"
      });
      return;
    }

    res.json({
      status: "success",
      data: teacher
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "An error occured while showing the teacher"
    });
  }
});
module.exports = router;

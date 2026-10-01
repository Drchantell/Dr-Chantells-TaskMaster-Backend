const express = require("express");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const Task = require("../../models/Task");
const authMiddleware = require("../../utils/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required." });
    }

    const project = await Project.create({
      name,
      description,
      user: req.user.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating project." });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error while getting projects." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You do not have permission to view this project." });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while getting project." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You do not have permission to update this project." });
    }

    if (req.body.name !== undefined) project.name = req.body.name;
    if (req.body.description !== undefined) project.description = req.body.description;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating project." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You do not have permission to delete this project." });
    }

    await Task.deleteMany({ project: project._id });
    await project.deleteOne();

    res.json({ message: "Project and its tasks deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting project." });
  }
});

module.exports = router;

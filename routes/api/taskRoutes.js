const express = require("express");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const Task = require("../../models/Task");
const authMiddleware = require("../../utils/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

const findOwnedProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    return { error: "notFound" };
  }

  if (project.user.toString() !== userId) {
    return { error: "forbidden" };
  }

  return { project };
};

router.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const result = await findOwnedProject(projectId, req.user.userId);

    if (result.error === "notFound") {
      return res.status(404).json({ message: "Project not found." });
    }

    if (result.error === "forbidden") {
      return res.status(403).json({ message: "You do not have permission to add tasks to this project." });
    }

    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }

    const task = await Task.create({
      title,
      description,
      status,
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating task." });
  }
});

router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const result = await findOwnedProject(projectId, req.user.userId);

    if (result.error === "notFound") {
      return res.status(404).json({ message: "Project not found." });
    }

    if (result.error === "forbidden") {
      return res.status(403).json({ message: "You do not have permission to view tasks for this project." });
    }

    const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error while getting tasks." });
  }
});

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const result = await findOwnedProject(task.project, req.user.userId);

    if (result.error === "notFound") {
      return res.status(404).json({ message: "Parent project not found." });
    }

    if (result.error === "forbidden") {
      return res.status(403).json({ message: "You do not have permission to update this task." });
    }

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.status !== undefined) task.status = req.body.status;

    await task.save();
    res.json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error while updating task." });
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const result = await findOwnedProject(task.project, req.user.userId);

    if (result.error === "notFound") {
      return res.status(404).json({ message: "Parent project not found." });
    }

    if (result.error === "forbidden") {
      return res.status(403).json({ message: "You do not have permission to delete this task." });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting task." });
  }
});

module.exports = router;

const express = require("express");
const taskControllers = require("../controllers/taskControllers");
const { protect } = require("../controllers/userControllers");

const taskRouter = express.Router();

taskRouter
  .route("/")
  .post(protect, taskControllers.addTask)
  .get(protect, taskControllers.getTask);
taskRouter
  .route("/:id")
  .delete(protect, taskControllers.deleteTask)
  .patch(protect, taskControllers.modifiedTask);

module.exports = taskRouter;

import express from "express";
const router = express.Router();
import {
  getProjects,
  getProjectById,
  getProjectsByUser,
  createProject,
  deleteProject,
  updateProjectTitle,
  createProjectComment,
  updateProjectToPublish,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProjects).post(protect, createProject);
router.route("/user").get(protect, getProjectsByUser);
router.route("/comment/:id").post(protect, createProjectComment);
router.route("/:id").get(getProjectById).delete(protect, deleteProject);
router.put("/update/:id", protect, updateProjectTitle);
router.put("/publish/:id", protect, updateProjectToPublish);

export default router;

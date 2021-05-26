import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  res.json(projects);
});

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

// @desc    Fetch  projects by user
// @route   GET /api/projects/user/
// @access  Public
const getProjectsByUser = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });

  if (projects?.length) {
    res.json(projects);
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/
const createProject = asyncHandler(async (req, res) => {
  const { title, images, docs } = req.body;
  const project = new Project({
    title,
    images,
    user: req.user._id,
    docs,
    name: req.user.name,
    isPublished: false,
  });

  const createdproject = await project.save();
  res.status(201).json(createdproject);
});

// @desc    Delete a project
// @route   DELETE /api/project/:id
// @access  Private/
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.remove();
    res.json({ message: "Project removed" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Update a project title
// @route   PUT /api/projects/update/:id
// @access  Private

const updateProjectTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const project = await Project.findById(req.params.id);
  console.log(req.user, project.user);
  if (project) {
    console.log(req.user, project.user);
    if ((project.user === req.user._id, "wwow")) {
      project.title = title;
      const updatedproject = await project.save();
      res.json(updatedproject);
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

// @desc    Update a project title
// @route   PUT /api/projects/publish/:id
// @access  Private

const updateProjectToPublish = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.isPublished = true;
    const updatedproject = await project.save();
    res.json(updatedproject);
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

// @desc    Create new comment on prejcts
// @route   POST /api/projects/comment/:id
// @access  Private
const createProjectComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    const alreadyCommented = project.comments.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyCommented) {
      res.status(400);
      throw new Error("Already made a comment");
    }

    const newComment = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    project.comments.push(newComment);

    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } else {
    res.status(404);
    throw new Error("project not found");
  }
});

export {
  getProjects,
  getProjectById,
  getProjectsByUser,
  createProject,
  deleteProject,
  updateProjectTitle,
  updateProjectToPublish,
  createProjectComment,
};

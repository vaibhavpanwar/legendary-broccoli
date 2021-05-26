import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    docs: {
      type: Array,
      required: true,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", projectSchema);

export default Project;

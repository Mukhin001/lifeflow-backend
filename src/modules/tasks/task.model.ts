import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: {
      type: Date,
    },

    // userId: {
    //   // type: mongoose.Schema.Types.ObjectId,
    //   type: String,
    //   default: "guest-user",
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", taskSchema);

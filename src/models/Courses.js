const { Schema, models, model } = require("mongoose");

const CoursesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    courseImage: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },
    isPublished: {
      type: Boolean,
    },
    isPurchase: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Courses = models?.Courses || model("Courses", CoursesSchema);

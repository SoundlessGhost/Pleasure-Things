const { Schema, models, model } = require("mongoose");

const ChaptersSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isFree: {
      type: Boolean,
    },
    isPublished: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Chapters = models?.Chapters || model("Chapters", ChaptersSchema);

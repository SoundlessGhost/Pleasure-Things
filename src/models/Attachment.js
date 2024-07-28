const { Schema, models, model } = require("mongoose");

const AttachmentSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Attachment =
  models?.Attachment || model("Attachment", AttachmentSchema);

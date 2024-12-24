import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: [mongoose.Schema.Types.ObjectId],  // Optionally specify types for better validation
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Messages", MessageSchema);

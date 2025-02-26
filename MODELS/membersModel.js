import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Single reference to User
  totalPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: { // Fixed incorrect field name
    type: Date,
    required: true,
    default: function () {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Default to 30 days later
    },
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "canceled"], // Allowed values
    default: "active", // New memberships start as "active"
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;

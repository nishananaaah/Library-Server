import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of references
  // membershipId: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" }, // Reference to Membership
  totalPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endStart: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentId: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;

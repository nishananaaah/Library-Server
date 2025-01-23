import mongoose from "mongoose"
const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: [String], required: true },
    bgColor: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;

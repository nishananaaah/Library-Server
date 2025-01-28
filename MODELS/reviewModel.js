import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating
    max: 5, // Maximum rating
  },
  content: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;

import Products from "../MODELS/productModel.js";
import User from "../MODELS/userModel.js";
import Review from "../MODELS/reviewModel.js"; // Import the Review model

export const addReview = async (req, res, next) => {
  const { userId, productId } = req.params;
  const { rating, content } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Create a new review
    const review = new Review({
      userId,
      productId: productId, // Assuming books are stored in the `Products` collection
      rating,
      content,
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getReview = async(req,res,next)=>{
    const reviews = await Review.find()
    if(!reviews){
        res.status(500).json({message:"Reviews not found"})
    }
    res.status(200).json(reviews)
}
import express from "express";
import Products from "../MODELS/productModel.js";
import Review from "../MODELS/reviewModel.js";
const app = express();
app.use(express.json());

//adminAddproduct
export const addProduct = async (req, res, next) => {
  const result = await req.body;
  console.log(result);
  if (!result) {
    return res.status(403).json({ message: "validation error on add product" });
  }

  const newProdut = new Products({
    name: result.name,
    description: result.description,
    price: result.price,
    category: result.category,
    image: result.image,
    author: result.author,
  });

  await newProdut.save();
  return res.status(200).json({ message: "product added successfully" });
};

//View all products
export const adminviewProduct = async (req, res, next) => {
  const allproduct = await Products.find();
  if (!allproduct) {
    res.status(404).json({ Error: "not found", message: "Product not found" });
  }
  res.status(200).json(allproduct);
};

//View productbyId
export const adminviewProductbyid = async (req, res, next) => {
  const { productbyId } = req.params;
  const product = await Products.findById(productbyId);
  console.log(productbyId);
  if (!product) {
    res.status(404).json({ Error: "not found", message: "Product not found" });
  }
  res.status(200).json(product);
};

//View productbycategory
export const adminproductbycategery = async (req, res) => {
  const { categoryname } = req.params;

  console.log(categoryname, "cattttt");

  try {
    // Validate `categoryname` input
    if (!categoryname || typeof categoryname !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid category name provided" });
    }

    // Find products by `category` or `name`, excluding `_id` casting
    const products = await Products.find({
      $or: [
        { category: { $regex: new RegExp(`^${categoryname}$`, "i") } }, // Case-insensitive exact match
        { name: { $regex: new RegExp(categoryname, "i") } }, // Case-insensitive partial match
      ],
    }).select("name category price"); // Return only specified fields

    // Handle no results found
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found in the given category" });
    }

    // Return the matching products
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle `CastError` explicitly
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        status: "failure",
        message: "Invalid identifier format",
        error_message: error.message,
      });
    }

    // Generic error handling
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};

//Editproduct
export const admineditProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Products.findById(productId);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  const { name, author, category, price } = req.body;
  if (name) product.name = name;
  if (author) product.author = author;
  if (category) product.category = category;
  if (price) product.price = price;

  await product.save();
  res.status(200).json({ message: "Product successfully updated" });
};

//Deleteproduct
export const admindeleteProductbyid = async (req, res, next) => {
  const { productId } = req.params;

  const productdelete = await Products.findByIdAndDelete(productId);
  if (!productdelete) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
};

//getreviews
export const admincangetReview = async (req, res, next) => {   
  const reviews = await Review.find()
    .populate({
      path: "userId", // Populate user details
      select: "username email", // Only include username and email
    })
    .populate({
      path: "productId", // Populate product details
      select: "name author price image", // Only include specific fields
    });
  if (!reviews) {
    res.status(404).json({ message: "Reviews not found" });
  }
  res.status(200).json(reviews);
};

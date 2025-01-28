import Memeber from "../MODELS/membersModel.js"
import Products from "../MODELS/productModel.js"
// import User from "../MODELS/userModel.js";
import Borrow from "../MODELS/borrowModel.js"
import User from "../MODELS/userModel.js"
import Review from "../MODELS/reviewModel.js"
import Authors from "../MODELS/authorModel.js"

export const viewproduct = async (req,res)=>{

    const product = await Products.find()
   

    if(!product){
       return res.status(404).json({message:"Unable to get product"})
   }
  return res.status(200).json({status:"success",message:"Successfully fetched data",data:product})

}
// //addproduct
// export const addProduct=async(req,res,next)=>{
//     const result = await req.body
//     console.log(result)
//     if(!result){
//      return res.status(403).json({message:"validation error on add product"})
//     }
 
//     const newProdut=new Products({
//      name:result.name,
//      description:result.description,
//      price:result.price,
//      category:result.category,
//      image:result.image,
//      author:result.author
    
//     });
 
//     await newProdut.save()
//     return res.status(200).json({message:'product added successfully'})
//  }

 //ProductbyId
 export const productByid = async(req,res,next)=>{
    const productId = req.params.id
    const product = await Products.findById(productId)
    if(!product){
       return res.status(404).json({Error:"not found",message:"Product not found"})
    }
   return res.status(200).json(product)
 }

 //Productbycategory
 export const productbyCategory = async(req,res,next)=>{
    const {categoryname} = req.params
    const product=await Products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    })   
    
    if(!product){
       return  res.status(404).json({message:"Product not found by category"})
    }
      return  res.status(200).json(product)
 }

 export const borrowbyId = async (req, res) => {
    const { userId, productId } = req.params; // Extract userId and productId from the request body
  
    try {
        // Check if the product exists and is available
        const product = await Products.findById(productId);
        if (!product || !product.availablity || product.isDeleted || product.isBorrowed) {
            return res.status(400).json({ message: 'Product not available for borrowing.' });
        }
  
        // Check if the user is a member
        const member = await Memeber.findOne({ userId });
        if (!member) {
            return res.status(400).json({ message: 'User is not a member. Please take a membership.' });
        }
  
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
  
        // Set the borrowing duration and calculate the due date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 14-day borrowing period
  
        // Create a new Borrow entry
        const borrow = await Borrow.create({
            userId: user._id,
            productId: product._id,
            totalPrice: product.price, // Assuming product has a price field
            status: 'Borrowed',
            dueDate,
        });
  
        // Update the product's borrowed status
        product.isBorrowed = true;
        product.availablity = false;
        await product.save();
  
        // Update the user's borrow list
        user.borrow.push(borrow._id);
        await user.save();
  
        // Respond with success message
        res.status(200).json({ message: 'Product borrowed successfully.', borrow });
    } catch (error) {
        console.error('Error in borrowing product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

  

//Unborrow
export const unborrowById = async(req,res,next)=>{
    const {productId} = req.params;
    // Inside your unborrowing route logic:
const product = await Products.findById(productId);
if (!product) {
  return res.status(404).json({ message: "Product not found" });
}

// Update the product's borrowed status
   product.isBorrowed = false;
await product.save();
  const prodcutunborrow = Borrow.findByIdAndUpdate({_id:productId},{$set:{availabilty:false}})

    if(!prodcutunborrow){
        res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"Product unborrow successfully"})
}
 

//Return the book 
export const returnById = async (req, res) => {
    const { userId, productId } = req.params;

    // console.log("Request received:", { userId, productId });
console.log("Borrow record updated.");
    try {
        const borrow = await Borrow.findOne({ userId, productId, status: 'Borrowed' });
        // console.log("Borrow record found:", borrow);

        if (!borrow) {
            return res.status(400).json({ message: 'No active borrow record found for this product and user.' });
        }

        borrow.status = 'Returned';
        borrow.returnDate = new Date();
        await borrow.save();
        

        const product = await Products.findById(productId);
        console.log("Product found:", product);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        product.isBorrowed = false;
        product.availablity = true;
        await product.save();
        console.log("Product updated.");

        const user = await User.findById(userId);
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.borrow = user.borrow.filter((id) => id.toString() !== borrow._id.toString());
        await user.save();
        console.log("User updated.");

        res.status(200).json({ message: 'Product returned successfully.', borrow });
    } catch (error) {
        console.error('Error in returning product:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


  

//Borrowgetbyadmin


export const admingetborrows = async (req, res, next) => {
  try {
    const borrows = await Borrow.find()
      .populate({
        path: 'userId', // Populate user details
        select: 'username email', // Only include username and email
      })
      .populate({
        path: 'productId', // Populate product details
        select: 'name author price image', // Only include specific fields
      });

    if (!borrows || borrows.length === 0) {
      return res.status(404).json({ message: "Borrows not found" });
    }

    return res.status(200).json(borrows);
  } catch (error) {
    console.error("Error fetching borrows:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

//Borrowgetbyuser


export const getUserBorrows = async (req, res, next) => {
    const { borrowId } = req.params;

    try {
        // Find the user and populate the borrow records
        const userWithBorrows = await User.findById(borrowId)
            .populate({
                path: 'borrow', // Populate the borrow array
                populate: {
                    path: 'productId', // Populate the bookId within each borrow
                    model: 'Product', // Specify the Book model
                    select: 'title  name  image price  dueDate borrowDate author availableCopies', // Include specific fields
                },
            });

        if (!userWithBorrows) {
            return res.status(404).json({ message: 'User or borrow records not found.' });
        }

        return res.status(200).json(userWithBorrows);
    } catch (error) {
        console.error('Error fetching borrow details:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};





//Review of the product
export const reviewsofproduct = async (req, res, next) => {
    const {contend} = req.body
    const { userId,productId } = req.params; // Extract userId and productId from params

    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await Memeber.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Take Membership" });
        }

        // Create a new Borrow entry
        const newReview = new Review({
            userId: user._id,
            productId: product._id,
            contend:contend.contend,
           
            // Assuming product has a price field
            status: "borrowed",
        });

        await newReview.save();
        return res.status(200).json(newReview);
    } catch (error) {
        console.error("Error in borrowing product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//Add author 
// export const addauthors =  async(req,res,next) =>{
//     const authors = await req.body;
//     if(!authors){
//         res.status(403).json({message:"Error occured to add authors"})
//     }
    
//     const newAuthors=new Authors({
//      name:authors.name,
//      age:authors.age,
//      image:authors.image,
//      category:authors.category,
//     });
//      await newAuthors.save()
//      res.status(200).json({message:"Authors added successfully"})

// }

//View authors
export const viewAuthors = async(req,res,next)=>{
    const authors = await Authors.find();
    if(!authors){
      return   res.status(404).json({message:"Authors not found"})
    }
   return res.status(200).json(authors)
}

//product search 
export const productSearch = async(req,res,next)=>{
    try {
        const { query } = req.query; // Get the search query from the query string
        const searchRegex = new RegExp(query, 'i'); // Create a case-insensitive regex
    
        const results = await Products.find({
          $or: [
            { name: searchRegex }, // Search in the name field
            { category: searchRegex }, // Search in the category field
          ],
        });
    
       return   res.status(200).json(results);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error'});
 }
    
}

export const viewAllusers = async (req,res,next)=>{
    const users = await User.find()

    if(users.length==0){
       return res.status(404).json({message:"No users in database"})
    }
   return res.status(200).json(users)
}
//userbyid
export const userByid = async (req,res,next)=>{
    const {userId} = req.params

    const user  = await User.findById(userId);
    if(!user){
      return  res.status(404).json({message:"User not found"})
    }
   return res.status(200).json(user)

}


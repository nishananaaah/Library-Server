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

 export const borrowbyId = async (req, res, next) => {
    const { userId, productId } = req.params; // Extract userId and productId from params

    try {
        // Check if product exists
        // Inside your borrowing route logic:
const product = await Products.findById(productId);
if (!product) {
  return res.status(404).json({ message: "Product not found" });
}

// Update the product's borrowed status
product.isBorrowed = true;
await product.save();


        // Check if user is a member
        const user = await Memeber.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "Take Membership" });
        }

        // Check if user exists
        const users = await User.findById(userId);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new Borrow entry
        const newOrder = new Borrow({
            userId: user._id,
            productId: product._id,
            totalPrice: product.price, // Assuming product has a price field
            status: "borrowed",
        });

        await newOrder.save();

        // Update user borrow list
        users.borrow.push(newOrder._id);
        await users.save();

        // Respond with success message
        return res.status(200).json({ message: "Product borrowed successfully" });
    } catch (error) {
        console.error("Error in borrowing product:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
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
 


//Borrowgetbyadmin
export const admingetborrows = async(req,res,next)=>{
    const borrows = await Borrow.find().populate({
        path:'productId',
        
    });
    if(borrows.length===0){
       return res.status(404).json({message:"Borrows not found"})
    }
      return  res.status(200).json(borrows)
}

//Borrowgetbyuser
export const userGetborrows = async (req, res, next) => {
    const { borrowId } = req.params;

    try {
        // Find the user by ID and populate the borrow array, including the productId field within each borrow
        const userWithBorrows = await User.findById(borrowId)
            .populate({
                path: 'borrow', // Populate the borrow array
                populate: {
                    path: 'productId', // Populate the productId within each borrow
                },
            });

        if (!userWithBorrows) {
            return res.status(404).json({ message: "Borrow not found" });
        }

        return res.status(200).json(userWithBorrows);
    } catch (error) {
        console.error("Error fetching borrow details:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
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


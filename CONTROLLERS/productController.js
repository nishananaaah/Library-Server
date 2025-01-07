import Memeber from "../MODELS/membersModel.js"
import Products from "../MODELS/productModel.js"
// import User from "../MODELS/userModel.js";
import Borrow from "../MODELS/borrowModel.js"
import User from "../MODELS/userModel.js"
import Review from "../MODELS/reviewModel.js"

export const viewproduct = async (req,res)=>{

    const product = await Products.find()
    console.log(product)

    if(!product){
        res.status(404).json({message:"Unable to get product"})
   }
   res.status(200).json({status:"success",message:"Successfully fetched data",data:product})

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
        res.status(404).json({Error:"not found",message:"Product not found"})
    }
    res.status(200).json(product)
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
 }

 export const borrowbyId = async (req, res, next) => {
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
        const newOrder = new Borrow({
            userId: user._id,
            productId: product._id,
            totalPrice: product.price, // Assuming product has a price field
            status: "borrowed",
        });

        await newOrder.save();
        return res.status(200).json({ message: "Product borrowed successfully" });
    } catch (error) {
        console.error("Error in borrowing product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//Borrowgetbyid
export const admingetborrows = async(req,res,next)=>{
    const borrows = await Borrow.find().populate({
        path:'productId'
    });
    if(!borrows.length===0){
       return res.status(404).json({message:"Borrows not found"})
    }
    res.status(200).json(borrows)
}

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

import Products from "../MODELS/productModel.js"
// import User from "../MODELS/userModel.js";

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
    const product=await products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    })    
 }
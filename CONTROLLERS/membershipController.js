import Membership from "../MODELS/membershipModel.js"

export const addMembership = async(req,res,next)=>{
    const { name, price, features, bgColor } = req.body;

    if (!name || !price || !features || !bgColor) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const membership = new Membership({
        name,
        price,
        features,
        bgColor,
      });

      await membership.save()
      res.status(200).json({message:"Membership added successfully"})
}

export const getMmebership = async(req,res,next) =>{
    const membership = await Membership.find();

    if(!membership){
        res.status(404).json({message:"Membership not found"})
    }
    res.status(200).json(membership)
}
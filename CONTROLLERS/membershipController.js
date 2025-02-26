import Membership from "../MODELS/membershipModel.js"
import Member from "../MODELS/membersModel.js";

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

// get membershipstatusbyid
export const getMembershipByid = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all membership records for the user
    const memberships = await Member.find({ userId }).populate("userId", "name email"); // Populate user details

    if (!memberships || memberships.length === 0) {
      return res.status(404).json({ message: "Membership not found" });
    }

    // Sum the total price of all memberships
    const totalPrice = memberships.reduce((sum, membership) => sum + membership.totalPrice, 0);

    // Send the first membership with user details, but include the total sum of all memberships
    const response = {
      user: memberships[0].userId, // User details
      totalPrice, // Sum of all membership payments
      memberships,
       // List of all membership records
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching membership:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

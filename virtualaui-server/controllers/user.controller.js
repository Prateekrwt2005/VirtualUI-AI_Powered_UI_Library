import { User } from "../models/user.model.js";


export const getcurrentUser= async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"Current user", user});
    }catch(error){
        return res.status(500).json({message:`failed to get current user: ${error}`});
    }   
}


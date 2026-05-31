import {User} from '../models/user.model.js';
import { genToken } from "../configs/token.js";

export const googleAuth= async (req,res)=>{
    try{
          console.log("GOOGLE AUTH HIT");
        const {name,email}=req.body
        let user=await User.findOne({email})
        if(!user){
            user=await User.create({name,email})
        }
        
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({message:"Login successful",token,user})

    }catch(error){
        
        return res.status(500).json({message:`google Auth error: ${error}`});
    }
}


export const logOut= async(req,res)=>{

    try{
        await res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
        return res.status(200).json({message:"Logout successful"})
    }catch(error){
        return res.status(500).json({message:`failed to logout: ${error}`});
    }
}

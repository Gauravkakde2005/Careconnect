import mongoose, { isValidObjectId } from "mongoose"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponce.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Allergy } from "../models/allergy.model.js"

const createAllergy = asyncHandler(async (req, res) => {
    const {allergy,allergyDesc} = req.body
    if(!allergy || !allergyDesc ){
        throw new ApiError(404,"All fields are required !")
    }
    const  userAllergy = await Allergy.create({
        allergy,
        allergyDesc,
        owner : req.user._id
    })

    if(!userAllergy){
        throw new ApiError(403,"Failed to create Allergy !")
    }

    res.status(200).json(new ApiResponse(200,userAllergy,"Allergy Added Successfully !"))
})

const updateAllergy = asyncHandler(async(req,res)=>{
    const {allergyId} = req.params

    if(!isValidObjectId(allergyId)){
        throw new ApiError(404,"Invalid Allergy Id")
    }
    const {allergy,allergyDesc} = req.body
    
    if(!allergy || !allergyDesc){
        throw new ApiError(404,"all fields are required !")
    }

    const userAllergy = await Allergy.findByIdAndUpdate(allergyId,
        {
            allergy,
            allergyDesc
        },{new:true})

    if(!userAllergy){
        throw new ApiError(404,"failed to update allergy..!")
    }

    return res.status(200).json(
        new ApiResponse(200,userAllergy,"alllergy updated successfully")
    )

})

const deleteAllergy = asyncHandler(async(req,res)=>{
    const {allergyId} = req.params

    if(!isValidObjectId(allergyId)){
        throw new ApiError(404,"allergy Id is not found")
    }
    
    const allergy = await Allergy.findByIdAndDelete(allergyId) 

    if(!allergy){
        throw new ApiError(404,"allergy not exist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Allergy delete successfully"))

})

const getUserAllergy = asyncHandler(async (req, res) => {
    const {userId} = req.params

    if(!isValidObjectId(userId)){
        throw new ApiError(400,"user id not found")
    }
    
   
    const allergy  = await Allergy.aggregate([
        {
            $match: {
                owner : new mongoose.Types.ObjectId(userId)
            }
        }
    ])
    // console.log(allergy)

    res.status(200)
    .json( new ApiResponse(200,allergy,"Allergy fetched successfully..!"))
})

      


export {
    createAllergy , updateAllergy ,deleteAllergy , getUserAllergy
}
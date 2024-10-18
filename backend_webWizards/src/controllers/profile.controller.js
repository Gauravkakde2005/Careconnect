import { Profile } from "../models/profile.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import mongoose, { isValidObjectId } from "mongoose"

// const createProfile = asyncHandler(async(req, res) => {
//     const { firstName, middleName, lastName, email, mobileNum, age, bloodGroup, dob, gender, weight, height, diseases, emeName, emeMob, address } = req.body

//     if (!firstName || !middleName || !lastName || !email || !mobileNum || !age || !bloodGroup || !dob || !gender || !weight || !height || !diseases || !emeName || !emeMob || !address) {
//         return res.json(new ApiError(401, "All fields are required !")) 
//     }

//     const profile = await Profile.create({
//         firstName,
//         middleName,
//         lastName,
//         email,
//         mobileNum,
//         age,
//         bloodGroup,
//         dob,
//         gender,
//         weight,
//         height,
//         diseases,
//         emeName,
//         emeMob,
//         address,
//         owner: req.user._id
//     })

//     if (!profile) {
//         return res.json(new ApiError(404, "Failed to create Profile !"))
//     }

//     return res
//         .json(new ApiResponse(200, profile, "Profile created Successfully !"))
// });

const createProfile = asyncHandler(async (req, res) => {
    const { firstName, middleName, lastName, email, mobileNum, age, bloodGroup, dob, gender, weight, height, diseases, emeName, emeMob, address } = req.body

    if (!firstName || !middleName || !lastName || !email || !mobileNum || !age || !bloodGroup || !dob || !gender || !weight || !height || !diseases || !emeName || !emeMob || !address) {
        return res.json(new ApiError(401, "All fields are required !"))
    }

    const existedProfile = await Profile.findOne({
        owner: req.user._id
    })
    // if (existedProfile) {
    //     throw new ApiError(409, "User with email exists");
    // }
    if (existedProfile) {
        await Profile.findByIdAndDelete(existedProfile._id)
    }
    const profile = await Profile.create({
        firstName,
        middleName,
        lastName,
        email,
        mobileNum,
        age,
        bloodGroup,
        dob,
        gender,
        weight,
        height,
        diseases,
        emeName,
        emeMob,
        address,
        owner: req.user._id
    })

    if (!profile) {
        return res.json(new ApiError(404, "Failed to create Profile !"))
    }

    return res
        .json(new ApiResponse(200, profile, "Profile created Successfully !"))
});

const updateProfile = asyncHandler(async (req, res) => {

    const { profileId } = req.params

    if (!isValidObjectId(profileId)) {
       return res.json(new ApiError(404, "profile Id is not found")) 
    }

    const { firstName, middleName, lastName, email, mobileNum, age, bloodGroup, dob, gender, weight, height, diseases, emeName, emeMob, address } = req.body

    if (!firstName || !middleName || !lastName || !email || !mobileNum || !age || !bloodGroup || !dob || !gender || !weight || !height || !diseases || !emeName || !emeMob || !address) {
        return res.json(new ApiError(401, "All fields are required !"))
    }

    const profile = await Profile.findByIdAndUpdate(profileId,
        {
            $set: {
                firstName,
                middleName,
                lastName,
                email,
                mobileNum,
                age,
                bloodGroup,
                dob,
                gender,
                weight,
                height,
                diseases,
                emeName,
                emeMob,
                address
            }
        }, { new: true })

    if (!profile) {
        return res.json(new ApiError(404, "Failed to update profile !"))
    }
   return res
        .status(200)
        .json(new ApiResponse(200, profile, "profile update successfully"))
});

const deleteProfile = asyncHandler(async function (req, res) {

    const { profileId } = req.params

    if (!isValidObjectId(profileId)) {
        return res.json(new ApiError(404, "profile Id is not found"))
    }

    const profile = await Profile.findByIdAndDelete(profileId)
    if (!profile) {
        return res.json(new ApiError(404, "profile not exist")) 
    }

    res
        .status(200)
        .json(new ApiResponse(200, { deletedProfile: profile }, "profile delete successfully"))
});




const getUserProfile = asyncHandler(async function (req, res) {

    // const { email } = req.body

    // if (!email) {
    //     throw new ApiError(404, "email not found")
    // }

    const profile = await Profile.findOne({
        owner: req.user._id
    })

    if (!profile) {
        res.json(new ApiError(405, "profile not found ."))
    }



    res.status(200)
        .json(new ApiResponse(200, profile, "profile fetched successfully"))
});


export { createProfile, updateProfile, deleteProfile, getUserProfile }
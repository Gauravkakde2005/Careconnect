import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        middleName: {
            type: String,
            required: true,

            trim: true
        },
        lastName: {
            type: String,
            required: true,

            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobileNum: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        diseases: {
            type: String,
            required: true,
        },
        emeName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        emeMob: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    }
)

export const Profile = mongoose.model("Profile", profileSchema)
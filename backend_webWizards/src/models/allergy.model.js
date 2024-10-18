import mongoose, { Schema } from "mongoose";

const allergySchema = new Schema({
        allergy: {
                type: String,
                require: true,
        },
        allergyDesc: {
                type: String,
                require: true,
        },

        owner: {
                type: Schema.Types.ObjectId,
                ref: "User"
        }
});

export const Allergy = mongoose.model("Allergy", allergySchema)
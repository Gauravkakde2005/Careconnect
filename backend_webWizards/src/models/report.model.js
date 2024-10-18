import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reportType: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    pdfFile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },



    }

}, { timestamps: true })


export const Report = mongoose.model("Report", reportSchema)
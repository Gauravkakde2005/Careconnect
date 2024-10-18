import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema({
    disease: {
        type: String,
        require: true,
    },
    medicine: {
        type: String,
        require: true,
    },
    scheduleType:{
        type: String,
        require: true,
    },
    timing :{
        type: String,
        require: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Schedule = mongoose.model("Schedule", scheduleSchema)

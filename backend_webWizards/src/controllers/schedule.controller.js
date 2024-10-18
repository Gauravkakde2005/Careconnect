import mongoose, { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponce.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Schedule } from "../models/schedule.model.js"
import cron from 'node-cron'
import nodemailer from 'nodemailer'

const createSchedule = asyncHandler(async (req, res) => {
    const { disease, medicine, scheduleType, timing } = req.body

    if (!disease || !medicine || !scheduleType || !timing) {
        throw new ApiError(407, "all fields are reuired.!")
    }

    const schedule = await Schedule.create({
        disease,
        medicine,
        scheduleType,
        timing,
        owner: req.user._id
    })

    if (!schedule) {
        throw new ApiError(404, "failed to create schedule")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, schedule, "schedule created successfully !")
        )
})

const deleteSchedule = asyncHandler(async (req, res) => {
    const { scheduleId } = req.params

    if (!isValidObjectId(scheduleId)) {
        throw new ApiError(404, "schedule Id is not found")
    }

    const schedule = await Schedule.findByIdAndDelete(scheduleId)

    if (!schedule) {
        throw new ApiError(404, "schedule not exist")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "schedule delete successfully"))

})

const getUserSchedule = asyncHandler(async (req, res) => {




    const schedule = await Schedule.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        }
    ])
    if(!schedule){
        throw new ApiError(406,"failed to fectch schedule")
    }

    res.status(200)
        .json(new ApiResponse(200, schedule, "Schedule fetched successfully..!"))
})

const sendEmailCorn = asyncHandler(async (req, res) => {
    const { scheduleId } = req.params

    if (!isValidObjectId(scheduleId)) {
        throw new ApiError(400, "Schedule id not found")
    }
    
    const schedule = await Schedule.findById(scheduleId)

    if (!schedule) {
        throw new ApiError(400, "Schedule  not found")
    }
    cron.schedule(schedule.scheduleType, () => {
        console.log("sdbffbedbgbef");
        console.log(schedule.scheduleType)
        console.log(req.user.email)
        const text = `It's time to take your ${schedule.medicine}`;


        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
    
        const mailOptions = {
            from: "CareConnect <webwizards24@gmail.com>",
            to: req.user.email,
            subject: `Time to take ${schedule.medicine}`,
            text
        };
    
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) throw new ApiError(500, "Something went wrong while sending Email");
    
            res.json(new ApiResponse(200, "Email sent Successfully...!"))
        });
        return res.status(200).json(new ApiResponse(200,{},"DONE...!"))
    })


})


export {
    createSchedule, deleteSchedule, getUserSchedule, sendEmailCorn
}
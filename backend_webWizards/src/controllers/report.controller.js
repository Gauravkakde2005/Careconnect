import { Report } from "../models/report.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import mongoose, { isValidObjectId } from "mongoose"
import { uploadOnCloudinary, deleteOnCloudinary, uploadCoverImageOnCloudinary } from '../utils/cloudinary.js'
import nodemailer from 'nodemailer'
import {Profile} from '../models/profile.model.js'


 
const isUserOwner = async (reportId, req) => {
    const report = await Report.findById(reportId);

    if (report?.owner?.toString() !== req.user?._id.toString()) {
        return false;
    }

    return true;

}

const createReport = asyncHandler(async function (req, res) {
    const { title, description, reportType } = req.body

    if (!title) {
        throw new ApiError(400, "title is required")
    }
    if (!description) {
        throw new ApiError(401, "description is required")
    }
    if (!reportType) {
        throw new ApiError( 402, "report Type is required")
    }
    console.log(req.file);

    const pdfFileLocalPath = req?.file?.path

    console.log(pdfFileLocalPath);

    if (!pdfFileLocalPath) {
        throw new ApiError(409, "pdf file is required")
    }


    const pdfFile = await uploadOnCloudinary(pdfFileLocalPath)
    console.log(pdfFile);

    if (!pdfFile) {
        throw new ApiError(406, "failed to upload pdf on cloudinary")
    }



    const report = await Report.create({
        title,
        description,
        reportType,
        owner: req?.user?._id,
        pdfFile: {
            public_id: pdfFile?.public_id,
            url: pdfFile?.secure_url,
        }
    })

    if (!report) {
        throw new ApiError(408, "failed to create report")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, report, "report created successfully"))
});

const updateReport = asyncHandler(async function (req, res) {
    const { reportId } = req.params
    const { title, description, reportType } = req.body

    if (!isValidObjectId(reportId)) {
       throw new ApiError(404, "In valid report Id !")
    }
    if (!title) {
       throw new ApiError(400, "title is required")
    }
    if (!description) {
       throw new ApiError(401, "description is required")
    }
    if (!reportType) {
       throw new ApiError(402, "report Type is required")
    }

    const pdfFileLocalPath = req?.file?.path

    const authorized = await isUserOwner(reportId, req)

    if (!authorized) {
       throw new ApiError(400, "Unauthorized Access")
    }

    const previousReport = await Report.findOne(
        {
            _id: reportId
        }
    )

    if (!previousReport) {
       throw new ApiError(404, 'previous report not found')
    }

    let pdfFile;
    if (pdfFileLocalPath) {
        await deleteOnCloudinary(previousReport?.pdfFile?.public_id)

        pdfFile = await uploadCoverImageOnCloudinary(pdfFileLocalPath)

        if (!pdfFile) {
           throw new ApiError(404, "pdf File is not upload on cloudinary")
        }
    }
    if (!pdfFileLocalPath) {
        const report = await Report.findByIdAndUpdate(reportId,
            {
                $set: {
                    title,
                    description,
                    reportType
                }
            }, { new: true })

        if (!report) {
           throw new ApiError(400, "failed to update report")
        }
        return res.status(200)
            .json(new ApiResponse(200, report, "report updated successfully."))
    } else {
        const report = await Report.findByIdAndUpdate(reportId,
            {
                $set: {
                    title,
                    description,
                    reportType,
                    pdfFile: {
                        public_id: pdfFile?.public_id,
                        url: pdfFile?.url
                    }
                }
            }, { new: true })
        if (!report) {
           throw new ApiError(400, "failed to update report")
        }
        return res.status(200)
            .json(new ApiResponse(200, report, "report updated successfully."))
    }
});

const deleteReport = asyncHandler(async function (req, res) {
    const { reportId } = req.params

    if (!isValidObjectId(reportId)) {
       throw new ApiError(400, "Invalid report Id")
    }

    const authorized = await isUserOwner(reportId, req)
    if (!authorized) {
       throw new ApiError(404, "unAuthorize user")
    }

    const previousReport = await Report.findOne({
        _id: reportId
    })

    if (!previousReport) {
       throw new ApiError(401, "previous report not found")
    }
    if (previousReport) {
        const pdfdelete = await deleteOnCloudinary(previousReport?.pdfFile?.public_id, "raw")

        if (!pdfdelete) {
           throw new ApiError(402, "failed to delete  pdfFile")
        }
        // console.log(pdfdelete)
    }

    const report = await Report.findByIdAndDelete(reportId)
    if (!report) {
       throw new ApiError(405, "failed to delete pdf")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, report, "pdf file deleted successfully"))
});

const getUserReportById = asyncHandler(async function (req, res) {
    const { reportId } = req.params

    if (!isValidObjectId(reportId)) {
       throw new ApiError(400, "Invalid report Id")
    }

    const report = await Report.findById(reportId)

    const authorized = isUserOwner(reportId, req)
    if (!authorized) {
       throw new ApiError(404, "unAuthorize user")
    }
    if (!report) {
       throw new ApiError(400, "failed to fetch pdf")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, report, "report fetched successfully"))
});

const getUserAllReport = asyncHandler(async function (req, res) {
    const report = await Report.find(
        {
            owner: req?.user?._id
        }
    )

    if (!report) {
       throw new ApiError(404, "failed to find user report")
    }

    return res
        .json(new ApiResponse(200, report, "All report fetched successfully !"))
});

  
const sendPatientReports = asyncHandler(async (req, res, next) => {
    const patientReport = await Report.find({ owner: req.params.userId });
    const userBelongingToReport = await Profile.find({owner:req.params.userId});
    // patientReport.owner = userBelongingToReport;

    res
      .json(new ApiResponse(200,{ patientReport , userBelongingToReport}, "All report fetched successfully !"));
});


const sendEmail = asyncHandler(async (req , res ) =>{
    
    const url = `${process.env.FRONTEND_URL}/doctor/${req.params.userId}`

    console.log(url);

    const text = `PatientReport\n${url}`;


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
        to : req.body.to ,
        subject : "Report Link : ",
        text
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) throw new ApiError(500 , "Something went wrong while sending Email");
        
        res.json(new ApiResponse(200, "Email sent Successfully...!"))
      });

})

const sendSingleEmail = asyncHandler(async (req , res ) =>{
   
    const url = `${process.env.FRONTEND_URL}/doctor/report/${req.params.reportId}`

    console.log(url);

    const text = `PatientReport\n${url}`;


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
        to : req.body.to ,
        subject : "Report Link : ",
        text
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) throw new ApiError(500 , "Something went wrong while sending Email");
        
        res.json(new ApiResponse(200, "Email sent Successfully...!"))
      });

})


// router.route("/report/:reportId");


const sendSingleReport = asyncHandler(async  (req, res)=> {

  const report = await Report.findById(req.params.reportId);
  const userId = report.owner

  const profile = await Profile.find({owner:userId});

  res.status(200).json(new ApiResponse(200,{report,profile},"User report and profile fetched successfully..!"));
});


export { createReport, updateReport, deleteReport, getUserReportById, getUserAllReport, sendPatientReports, sendEmail , sendSingleReport ,sendSingleEmail }
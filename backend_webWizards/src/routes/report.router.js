import { Router } from "express";
import {
  createReport,
  updateReport,
  deleteReport,
  getUserReportById,
  getUserAllReport,
  sendPatientReports,
  sendEmail,
  sendSingleReport,
  sendSingleEmail
} from "../controllers/report.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// router.use(verifyJWT);

router.route("/getAllreports")
  .get(verifyJWT, getUserAllReport);

router.route("/create")
  .post(upload.single("pdfFile"), verifyJWT, createReport);

router
  .route("/:reportId")
  .get(verifyJWT, getUserReportById)
  .patch(upload.single("pdfFile"), verifyJWT, updateReport)
  .delete(verifyJWT, deleteReport)


router
  .route("/user/:userId")
  .get(sendPatientReports)

router
  .route('/email/:userId')
  .post(verifyJWT, sendEmail)

router
  .route("/report/:reportId")
  .get(sendSingleReport)

router
  .route("/email/report/:reportId")
  .post(verifyJWT,sendSingleEmail)

export default router;

import { Router } from 'express';
import { createSchedule , deleteSchedule , getUserSchedule , sendEmailCorn} from "../controllers/schedule.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); 

router.route("/").post(createSchedule);

router.route("/getUserSchedule").get(getUserSchedule);

router.route("/:scheduleId").delete(deleteSchedule).post( sendEmailCorn );

export default router
import { Router } from 'express';
import { createAllergy , updateAllergy , deleteAllergy , getUserAllergy } from "../controllers/allergy.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); 

router.route("/").post(createAllergy);
router.route("/user/:userId").get(getUserAllergy);

router.route("/:allergyId").patch(updateAllergy).delete(deleteAllergy);

// .delete(deleteTweet);

export default router
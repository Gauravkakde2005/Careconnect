import { Router } from 'express';
import { createProfile, updateProfile, deleteProfile, getUserProfile } from "../controllers/profile.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT)

router.route("/").post(createProfile);
router.route("/:profileId").patch(updateProfile).delete(deleteProfile)
router.route("/getProfile").get(getUserProfile)


export default router
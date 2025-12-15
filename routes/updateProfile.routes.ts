import { Router } from "express";
import { validate } from "../middlewares/validate";
import { protectedRoute } from "../middlewares/protectedRoute";
import { updateUserSchema } from "../validations/userProfile.schema";
import { updateUser } from "../controllers/user.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.patch(
  "/me",
  protectedRoute,
  upload,
  validate(updateUserSchema),
  updateUser
);

export default router;

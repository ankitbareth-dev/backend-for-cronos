import { Router } from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller";
import { signupSchema, loginSchema } from "../validations/auth.schema";
import { validate } from "../middlewares/validate";
import { protectedRoute } from "../middlewares/protectedRoute";

const router = Router();

router.get("/check-auth", protectedRoute, checkAuth);

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

router.post("/logout", protectedRoute, logout);

export default router;

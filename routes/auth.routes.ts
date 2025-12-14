import { Router } from "express";
import { googleAuth, logout, checkAuth } from "../controllers/auth.controller";
import { protectedRoute } from "../middlewares/protectedRoute";
import { googleAuthSchema } from "validations/auth.schema";
import { validate } from "middlewares/validate";

const router = Router();

router.post("/google", validate(googleAuthSchema), googleAuth);
router.get("/check-auth", protectedRoute, checkAuth);
router.get("/logout", logout);

export default router;

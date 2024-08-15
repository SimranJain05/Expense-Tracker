import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  getUser,
  googleOAuth,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/get/user", authenticate, getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/signout", authenticate, signout);
router.post("/google-oauth", googleOAuth);

export default router;

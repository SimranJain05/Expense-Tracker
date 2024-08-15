import mongoose from "mongoose";
import errorHandler from "../errors/error.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.cookies["access_token"];
  if (!token) return next(errorHandler(401, "Please login to continue."));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return next(errorHandler(404, "Invalid User"));
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(errorHandler(401, "Invalid token, please login again."));
  }
};

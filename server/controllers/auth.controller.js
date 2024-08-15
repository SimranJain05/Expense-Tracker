import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../errors/error.js";
import { generateStrongPassword } from "../utils/auth.utils.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = parseInt(process.env.SALT);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(201)
      .send({ user, success: true, message: "User Registered" });
  } catch (error) {
    if (error.code === 11000) {
      next(errorHandler(400, "Email already registered"));
    } else {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send({ user, success: true, message: "User Logged in" });
  } catch (error) {
    next(error);
  }
};

export const googleOAuth = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // Signup with Google OAuth
      const password = generateStrongPassword();
      const salt = parseInt(process.env.SALT);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...userWithoutPassword } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(201)
        .send({
          user: userWithoutPassword,
          success: true,
          message: "User Registered",
        });
    } else {
      // Signin with Google OAuth
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...userWithoutPassword } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .send({
          user: userWithoutPassword,
          success: true,
          message: "User Logged in",
        });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.cookie("access_token", null);
    res.clearCookie("access_token");
    res.status(200).send({ success: true, message: "Signed out" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    res
      .status(200)
      .send({ success: true, message: `Welcome to ExpTacker ${user.name}`, user });
  } catch (error) {
    next(error);
  }
};

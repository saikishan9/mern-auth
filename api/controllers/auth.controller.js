import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: `User created successfully` });
  } catch (error) {
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({
      email,
    });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Login Credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, __v, ...rest } = validUser._doc;

    //Examples:
    // "Remember Me" for 15 minutes res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    // save as above res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })

    res
      .cookie("access_token", token, { maxAge: 36_00_000, httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};

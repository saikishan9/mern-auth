import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashesPassword = bcryptjs.hashSync(password);
  const newUser = new User({ username, email, password: hashesPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: `User created successfully` });
  } catch (error) {
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};

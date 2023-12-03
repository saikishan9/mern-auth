import bcryptjs from "bcryptjs";

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: `API is working!` });
};

export const updateUser = async (req, res, next) => {
  const { user, params, body } = req;

  if (user.id !== params.id) {
    return next(errorHandler(401, `You can update only your account`));
  }

  try {
    if (body.passowrd) {
      body.passowrd = bcryptjs.hashSync(body.passowrd, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        $set: {
          ...body,
        },
      },
      {
        new: true,
      }
    );

    const { password, __v, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

import STATUS_CODE from "../constants/statusCode.js";
import User from "../models/userModel.js";
import { hash, compare } from "bcrypt";

// @desc     Register new user
// @route    POST /api/v1/users
// @access   Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please add all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("User already exists");
    }
    // hash password
    const hashedPassword = await hash(password, 10);
    //Creat authUser
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(STATUS_CODE.CREATED).send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};


// @desc     Authenticate a user
// @route    POST /api/v1/users/login
// @access   Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await compare(password, user.password))) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
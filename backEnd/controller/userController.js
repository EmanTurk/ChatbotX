import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/userSchema.js";
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

// @desc     get all users
// @route    GET /api/v1/users
// @access   Public
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // const users = await User.find({}).populate("activity"); // Populate the 'activity' field
    res.status(STATUS_CODE.OK);
    res.send(users);
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// @desc     get a User ById
// @route    GET /api/v1/users/:id
// @access   Public
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such user in the db");
    }
    res.send(user);
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// @desc     update an existing user
// @route    PUT /api/v1/users/:id
// @access   Public
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such user in the db");
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// @desc     delete an existing user
// @route    DELETE /api/v1/users/:id
// @access   Public

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(STATUS_CODE.OK).send(deletedUser);
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// @desc     gets the users with the highest match based on a given user id
// @route    GET /api/v1/users/getMostMatchUsers/:id
// @access   Public

export const getMostMatchUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const users = await User.find({ _id: { $ne: id } });
    const arrangedUsers = arrangeObjectsByCommonality(users, user);
    res.status(STATUS_CODE.OK).send(arrangedUsers);
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

function arrangeObjectsByCommonality(objectsArray, givenObject) {
  // Convert the array of strings in the given object to a JSON string for comparison
  const givenObjectString = JSON.stringify(givenObject);

  // Create an array of objects with commonality information
  const objectsWithCommonality = objectsArray.map((obj) => {
    // Convert the array of strings in the current object to a JSON string for comparison
    const objString = JSON.stringify(obj);

    // Calculate the commonality by counting common elements
    const commonality = obj.skills.reduce((count, skill) => {
      return count + (givenObject.skills.includes(skill) ? 1 : 0);
    }, 0);

    return {
      object: obj,
      commonality: commonality,
    };
  });

  // Sort the array in descending order based on commonality
  const sortedObjects = objectsWithCommonality.sort(
    (a, b) => b.commonality - a.commonality
  );

  return sortedObjects;
}

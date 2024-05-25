import { User } from "../models/userModel.js";
import { generateToken, verifyToken } from "../Utils/TokenGenerators.js";

const loginUser = async (req, res) => {
  //code to login the user

  const { email, password } = req.body;

  try {
    const user = await User.loginStatic(email, password);

    const token = generateToken(user._id);

    return res
      .status(200)
      .json({
        success: true,
        userId: user._id,
        token,
        message: "Logged in successfully",
      });
  } catch (e) {
   return  res.status(400).json({ error: e.message });
  }
};

const signUpUser = async (req, res) => {
  //code to sign up the user

  const { name, email, password, address, phoneNumber } = req.body;

  try {
    const user = await User.signUpStatic(
      name,
      email,
      password,
      address,
      phoneNumber
    );

    const token = generateToken(user._id);

   return res
      .status(200)
      .json({
        success: true,
        userId: user._id,
        token,
        message: "SignUp SuccessFull",
      });
  } catch (e) {
   return  res.status(400).json({ error: e.message });
  }
};

const getUser = async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];

  // console.log(token)

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access token is required to get the access" });
  }

  const { _id } = verifyToken(token);

  if (!_id) {
    return res.status(401).json({ error: "Token is Not Valid -Expired" });
  }

  const user = await User.findById(_id).select("-password").populate("carts");

  if (!user) {
    return res
      .status(401)
      .json({ error: "You are not authorized to view this resource." });
  }

 return res.status(200).json({ success: true, user });
};
const UpdateProfile = async (req, res) => {
  for (const key in req.body) {
    if (!req.body[key]) {
      return res
        .status(400)
        .json({ success: false, message: `${key} cannot be empty or null` });
    }

    if (key === "address") {
      if (req.body[key].length < 6) {
        return res
          .status(400)
          .json({
            success: false,
            message: `${key} must be at least 6 characters`,
          });
      }
    }
    if (key === "phoneNumber") {
      if (req.body[key].length != 10) {
        return res
          .status(400)
          .json({
            success: false,
            message: `${key} must be at least 6 characters`,
          });
      }
    }
    if (key === "name") {
      if (req.body[key].length < 3 || req.body[key].length > 16) {
        return res
          .status(400)
          .json({
            success: false,
            message: `${key} must be at least 3-16 characters long.`,
          });
      }
    }
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { new: true }
    ).select("-password -carts -_id");

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Update failed" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Update successful", updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const GetAllUsers = async (req, res) => {
  //Get all users from the database
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({
        success: false,
        message: "You are not authorized to perform this action",
      });
  }
  try {
    const users = await User.find()
      .select("-password -carts")
      .sort({ createdAt: -1 });
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }
    return res
      .status(200)
      .json({ success: true, users, message: "Users Fetched Successfully!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { loginUser, signUpUser, getUser, UpdateProfile, GetAllUsers };

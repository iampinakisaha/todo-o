import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 1;
const createToken = (email, userId) => {
  console.log("creating new token", userId);
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const logoutController = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = User.findById(userId);

    if (!user) {
      return res.status(409).send("User not Found");
    }

    const token = createToken(user.email, user._id);
    console.log("token created", token);
    res.cookie("jwtToken", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    res.status(201).send("User Logged out Successfully.");
  } catch (error) {
    req.status(500).send(error);
  }
};

export default logoutController;

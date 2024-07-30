import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  console.log("creating new token", userId);
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

export const logInController = async (req, res, next) => {
  console.log("request recived at backed", req.body);

  try {
    console.log("email & password received", req.body);
    const { email, password } = req.body;
    console.log("email & password received", email);
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(409)
        .send("User doesn't exist. Please signup to continue");
    }

    const token = createToken(email, user._id);
    console.log("token created", token);
    res.cookie("jwtToken", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default logInController;

import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  console.log("creating new token", userId)
  return jwt.sign({email, userId}, process.env.JWT_SECRET_KEY, { expiresIn: maxAge})
}

export const signUpController = async (req, res, next) => {

  console.log("request recived at backed", req.body)

  try {
    console.log("email & password received", req.body)
    const {email, password } = req.body;
    console.log("email & password received", email)
    if(!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const user = await User.findOne({email});

    if(user) {
      return res.status(409).send("Email already exist. Please signin or try a different email");
    }
    console.log("no user exist with sane email")
    const newUser = await User.create(req.body);
    console.log("new user created", newUser)
    const token = createToken(email, newUser._id);
    console.log("token created", token)
    res.cookie("jwtToken", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    })
    console.log("new user created", newUser)
    res.status(201).json({
      date: {id: newUser._id, email: newUser.email, profileSetup: newUser.profileSetup},
      message: "User Created Successfully."
    })


  }catch (error) {
    res.status(500).send(error)
  }

}

export default signUpController;
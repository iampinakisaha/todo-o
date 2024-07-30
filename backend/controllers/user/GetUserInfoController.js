import User from "../../models/UserModel.js";

export const getUserInfoController = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User with given ID not found.");
    }

    res.status(200).json({
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

export default getUserInfoController;

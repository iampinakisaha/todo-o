import moment from "moment";
import User from "../../models/UserModel.js";


export const updateUserInfoController = async (req, res, next) => {
  console.log("update profile request received at backend", req.body);
  try {
    const { id } = req.body;
    const {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      color,
    } = req.body;
   
    if (!firstName || !lastName || !dateOfBirth || !phoneNumber) {
      return res.state(400).send("Please fill up the details.");
    } 
    const payload = {
      ...(firstName, { firstName: firstName }),
      ...(lastName, { lastName: lastName }),
      ...(dateOfBirth, { dateOfBirth: dateOfBirth }),
      ...(phoneNumber, { phoneNumber: phoneNumber }),
      ...(color, { color: color }),
      profileSetup: true,
    };

    const saveData = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    console.log("save data",saveData)
    const dob = saveData.dateOfBirth ? moment(saveData.dateOfBirth).format("YYYY-MM-DD") : null;
    res.status(200).json({
      id: saveData._id,
      email: saveData.email,
      firstName: saveData.firstName,
      lastName: saveData.lastName,
      dateOfBirth: dob,
      phoneNumber: saveData.phoneNumber,
      image: saveData.image,
      color: saveData.color,
      profileSetup: saveData.profileSetup,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserProfileImageController = async (req, res, next) => {
  console.log("update profile request received at backend", req.body);
  try {
    const { id } = req.body;
    const { image } = req.body;

    const payload = {
      ...(image, { image: image }),
    };

    const saveData = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    const dob = saveData.dateOfBirth ? moment(saveData.dateOfBirth).format("YYYY-MM-DD") : null;
    res.status(200).json({
      id: saveData._id,
      email: saveData.email,
      firstName: saveData.firstName,
      lastName: saveData.lastName,
      dateOfBirth: dob,
      phoneNumber: saveData.phoneNumber,
      image: saveData.image,
      color: saveData.color,
      profileSetup: saveData.profileSetup,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default updateUserInfoController;

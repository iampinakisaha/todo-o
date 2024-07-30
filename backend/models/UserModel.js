import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
    unique: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid 10 digit phone number!`,
    }
  },
  image: {
    type: String,
    default: "",
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
},{timestamps: true});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await hashSync(this.password, salt);
  next();
})

const User = mongoose.model("User", userSchema);

export default User
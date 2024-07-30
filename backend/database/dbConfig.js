import mongoose from "mongoose";


export const dbConnect = async () => {

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connecting to Database...")
  }catch(error) {
    console.log(error)
  }
} 


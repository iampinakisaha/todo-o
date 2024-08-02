import express, { json } from "express";
import "dotenv/config";
import { dbConnect } from "./database/dbConfig.js";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryRoutes from "./routes/CloudinaryRoutes.js";
import subTodoRoutes from "./routes/SubTodoRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser()); 
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/sub-todo", subTodoRoutes);

dbConnect().then(() => {
  console.log("Connected to Database.");
  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
  });
});

export default app;

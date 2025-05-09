import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import path from "path"; // import path module
import { fileURLToPath } from "url"; // Import fileURLToPath from 'url'

import AdminRoute from "./routes/admin.route.js";
import AttractionRoute from "./routes/attraction.route.js";
import FoodRoute from "./routes/food.route.js";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000", // Adjust for your frontend URL
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/admin", AdminRoute);
app.use("/api/attraction", AttractionRoute);
app.use("/api/food", FoodRoute);

if (process.env.NODE_ENV === "production") {
  // Serve static files for the frontend build
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route to serve the index.html
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

import { app } from "./app";
import http from "http";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db";
import { initSocketServer } from "./socketServer";
require("dotenv").config();
const server = http.createServer(app);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);
// create server
// const PORT = process.env.PORT || 8000; 

// server.listen(PORT, () => {
//   console.log(`Server is running on the port ${PORT}`);
//   connectDB();
// });

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server is connected on the PORT:${process.env.PORT}`);
  });
});

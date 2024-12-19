import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { upload } from "./middleware/multer.js";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const __dirname= path.resolve();

app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)



// for image or file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      // Respond with the URL to the uploaded image
      res.json({
        message: 'File uploaded successfully!',
        fileUrl: `/uploads/${req.file.filename}`
      });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
});
app.use('/uploads', express.static('uploads'));

// Set the limit to a larger value, e.g., 50mb


if(process.env.NODE_ENV=== "production"){
  app.use(express.static(path.join(__dirname,"../../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
  })
}

server.listen(port, () => {
    console.log(`Authorization Server running on ${port}...`)
    connectDB()
})
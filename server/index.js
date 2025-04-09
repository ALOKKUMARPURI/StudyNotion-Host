const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

// 🔐 Load .env before anything
dotenv.config({ path: '/server/.env'});

// 🚀 DB Connect before routes
database.connect();

const app = express();
const PORT = process.env.PORT || 4000;

// 🔧 Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true,
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// ☁️ Cloudinary connection
cloudinaryConnect();

// 🛣️ API Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// 🏠 Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// ▶️ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGODB_URL);
console.log("RZP KEY:", process.env.REACT_APP_RAZORPAY_KEY);
 
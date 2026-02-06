const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files and public images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public"))); // for default images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

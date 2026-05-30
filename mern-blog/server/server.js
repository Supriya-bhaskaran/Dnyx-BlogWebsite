const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
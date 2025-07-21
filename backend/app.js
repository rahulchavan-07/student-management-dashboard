const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const connection = require("../backend/connection");
const studentRoutes = require("../backend/routes/stud");

app.use(cors({
  origin: "https://student-management-dashboard-frontend.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// ✅ API routes
app.use("/api", studentRoutes);

// ✅ Connect to MongoDB
connection();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

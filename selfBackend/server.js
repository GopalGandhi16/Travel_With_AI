const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes import
const listingRoutes = require('./routes/listings');

// use routes
app.use("/api/listings", listingRoutes);

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
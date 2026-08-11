require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/user");
const listingRoutes = require('./routes/listingsRoute');
const app = express();
const destinationRoutes = require("./routes/destinations");
const hotelRoutes = require("./routes/hotels");
const paymentRoutes = require("./routes/paymentRoutes");
const tripRoutes = require("./routes/trip");

app.use(cors());
app.use(express.json());

// routes import


// use routes
app.use("/api/listings", listingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trips", tripRoutes);
// DB connect 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
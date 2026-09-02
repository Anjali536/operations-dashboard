require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");


const customerRoutes = require("./routes/customerRoutes");
const mechanicRoutes = require("./routes/mechanicRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/customers", customerRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require("express");

const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookings);

router.get("/:id", getBookingById);

router.post("/", createBooking);

router.patch("/:id", updateBooking);

module.exports = router;
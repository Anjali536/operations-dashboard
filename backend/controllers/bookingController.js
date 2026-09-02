const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Vehicle = require("../models/Vehicle");
const Mechanic = require("../models/Mechanic");
const Service = require("../models/Service");


const populateBooking = (query) => {
    return query
        .populate("customer", "name email phone")
        .populate("vehicle", "registrationNumber make model")
        .populate("mechanic", "name status")
        .populate("service", "name category");
};

const getBookings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const search = req.query.search?.trim() || "";
        const status = req.query.status || "";

        const skip = (page - 1) * limit;

        const query = {};

        // Status filter
        if (status && status !== "All") {
            query.status = status;
        }

        // Search across related collections
        if (search) {
            const [
                customers,
                vehicles,
                mechanics,
                services
            ] = await Promise.all([
                Customer.find({
                    name: { $regex: search, $options: "i" }
                }).select("_id"),

                Vehicle.find({
                    $or: [
                        {
                            registrationNumber: {
                                $regex: search,
                                $options: "i"
                            }
                        },
                        {
                            make: {
                                $regex: search,
                                $options: "i"
                            }
                        },
                        {
                            model: {
                                $regex: search,
                                $options: "i"
                            }
                        }
                    ]
                }).select("_id"),

                Mechanic.find({
                    name: { $regex: search, $options: "i" }
                }).select("_id"),

                Service.find({
                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: "i"
                            }
                        },
                        {
                            category: {
                                $regex: search,
                                $options: "i"
                            }
                        }
                    ]
                }).select("_id")
            ]);

            query.$or = [
                {
                    bookingId: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    customer: {
                        $in: customers.map(customer => customer._id)
                    }
                },
                {
                    vehicle: {
                        $in: vehicles.map(vehicle => vehicle._id)
                    }
                },
                {
                    mechanic: {
                        $in: mechanics.map(mechanic => mechanic._id)
                    }
                },
                {
                    service: {
                        $in: services.map(service => service._id)
                    }
                }
            ];
        }

        const [bookings, totalBookings] = await Promise.all([
            populateBooking(
                Booking.find(query)
                    .sort({ scheduledAt: -1 })
                    .skip(skip)
                    .limit(limit)
            ),

            Booking.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalBookings / limit);

        res.status(200).json({
            bookings,
            pagination: {
                currentPage: page,
                totalPages,
                totalBookings,
                limit
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
};
const getBookingById = async (req, res) => {
    try {
        const booking = await populateBooking(
            Booking.findById(req.params.id)
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch booking",
            error: error.message
        });
    }
};

const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        const populatedBooking = await populateBooking(
            Booking.findById(booking._id)
        );

        res.status(201).json(populatedBooking);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create booking",
            error: error.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await populateBooking(
            Booking.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update booking",
            error: error.message
        });
    }
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking
};
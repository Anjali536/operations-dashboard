const Booking = require("../models/Booking");
const Mechanic = require("../models/Mechanic");
const Customer = require("../models/Customer");

const getDashboardData = async (req, res) => {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const [
                totalBookings,
                todaysBookings,
                completedBookings,
                pendingBookings,
                cancelledBookings,
                revenueResult,
                activeMechanics,
                newCustomers,
                bookingsOverTime,
                bookingStatus,
                revenueOverTime,
                serviceBreakdown
            ] = await Promise.all([
                Booking.countDocuments(),

                Booking.countDocuments({
                    scheduledAt: {
                        $gte: startOfToday,
                        $lt: startOfTomorrow
                    }
                }),

                Booking.countDocuments({
                    status: "Completed"
                }),

                Booking.countDocuments({
                    status: "Pending"
                }),

                Booking.countDocuments({
                    status: "Cancelled"
                }),

                // 6. Revenue
                Booking.aggregate([
                    {
                        $match: {
                            status: "Completed"
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: {
                                $sum: "$amount"
                            }
                        }
                    }
                ]),

                // 7. Active mechanics
                Mechanic.countDocuments({
                    status: {
                        $in: ["Available", "Busy"]
                    }
                }),

                // 8. New customers
                Customer.countDocuments({
                    createdAt: {
                        $gte: startOfToday,
                        $lt: startOfTomorrow
                    }
                }),

                // 9. Bookings over time
                Booking.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$scheduledAt"
                                }
                            },
                            bookings: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $sort: {
                            _id: 1
                        }
                    }
                ]),

                // 10. Booking status
                Booking.aggregate([
                    {
                        $group: {
                            _id: "$status",
                            count: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $sort: {
                            count: -1
                        }
                    }
                ]),

                // 11. Revenue over time
                Booking.aggregate([
                    {
                        $match: {
                            status: "Completed"
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$scheduledAt"
                                }
                            },
                            revenue: {
                                $sum: "$amount"
                            }
                        }
                    },
                    {
                        $sort: {
                            _id: 1
                        }
                    }
                ]),

                // 12. Service breakdown
                Booking.aggregate([
                    {
                        $lookup: {
                            from: "services",
                            localField: "service",
                            foreignField: "_id",
                            as: "service"
                        }
                    },
                    {
                        $unwind: "$service"
                    },
                    {
                        $group: {
                            _id: "$service.category",
                            count: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $sort: {
                            count: -1
                        }
                    }
                ])
            ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        res.status(200).json({
            kpis: {
                totalBookings,
                todaysBookings,
                completedBookings,
                pendingBookings,
                cancelledBookings,
                totalRevenue,
                activeMechanics,
                newCustomers
            },
            bookingsOverTime,
            bookingStatus,
            revenueOverTime,
            serviceBreakdown
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardData
};
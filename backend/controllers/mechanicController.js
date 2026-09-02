const Mechanic = require("../models/Mechanic");
const Booking = require("../models/Booking");

const getMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();

        const mechanicsWithBookings = await Promise.all(
            mechanics.map(async (mechanic) => {

                // Find the latest booking assigned to this mechanic
                const latestBooking = await Booking.findOne({
                    mechanic: mechanic._id
                })
                    .sort({ scheduledAt: -1 })
                    .select("bookingId status scheduledAt");

                return {
                    ...mechanic.toObject(),

                    currentBooking: latestBooking
                        ? {
                              bookingId: latestBooking.bookingId,
                              status: latestBooking.status,
                              scheduledAt: latestBooking.scheduledAt
                          }
                        : null
                };
            })
        );

        res.status(200).json(mechanicsWithBookings);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch mechanics",
            error: error.message
        });
    }
};

module.exports = {
    getMechanics
};


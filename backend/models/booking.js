const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        mechanic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mechanic",
            required: true
        },

        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "Mechanic On The Way",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        scheduledAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
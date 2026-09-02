const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Available", "Busy", "Off Duty"],
            default: "Available"
        },

        jobsCompleted: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
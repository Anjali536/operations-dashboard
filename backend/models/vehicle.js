const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        make: {
            type: String,
            required: true,
            trim: true
        },

        model: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
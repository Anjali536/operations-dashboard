const Vehicle = require("../models/Vehicle");

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
            .populate("customer", "name email phone");

        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch vehicles",
            error: error.message
        });
    }
};

module.exports = {
    getVehicles
};
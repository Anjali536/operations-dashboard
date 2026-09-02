const Service = require("../models/Service");

const getServices = async (req, res) => {
    try {
        const services = await Service.find();

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch services",
            error: error.message
        });
    }
};

module.exports = {
    getServices
};
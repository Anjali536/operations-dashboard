const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch customers",
            error: error.message
        });
    }
};

const createCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const customer = await Customer.create({
            name,
            email,
            phone
        });

        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create customer",
            error: error.message
        });
    }
};

module.exports = {
    getCustomers,
    createCustomer
};
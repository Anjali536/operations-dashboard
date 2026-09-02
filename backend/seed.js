require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const connectDB = require("./config/db");

const Customer = require("./models/Customer");
const Vehicle = require("./models/vehicle");
const Mechanic = require("./models/mechanic");
const Service = require("./models/service");
const Booking = require("./models/booking");

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");

        await Booking.deleteMany({});
        await Vehicle.deleteMany({});
        await Mechanic.deleteMany({});
        await Service.deleteMany({});
        await Customer.deleteMany({});

        console.log("Existing data cleared.");

        // Services
        const services = await Service.insertMany([
            {
                name: "Full Car Service",
                category: "Maintenance",
                basePrice: 2499
            },
            {
                name: "Oil Change",
                category: "Maintenance",
                basePrice: 999
            },
            {
                name: "Brake Inspection",
                category: "Repair",
                basePrice: 799
            },
            {
                name: "Battery Replacement",
                category: "Electrical",
                basePrice: 3499
            },
            {
                name: "AC Service",
                category: "AC & Cooling",
                basePrice: 1599
            },
            {
                name: "Tyre Replacement",
                category: "Tyres",
                basePrice: 4999
            }
        ]);

        console.log(`${services.length} services created.`);

        // Customers
        const customerData = [];

        for (let i = 0; i < 60; i++) {
            customerData.push({
                name: faker.person.fullName(),
                email: `customer${i}@example.com`,
                phone: faker.string.numeric(10)
            });
        }

        const customers = await Customer.insertMany(customerData);

        console.log(`${customers.length} customers created.`);

        // Vehicles
        const vehicleData = [];

        const carModels = [
            ["Hyundai", "Creta"],
            ["Maruti", "Swift"],
            ["Tata", "Nexon"],
            ["Honda", "City"],
            ["Toyota", "Fortuner"],
            ["Mahindra", "XUV700"]
        ];

        for (let i = 0; i < 100; i++) {
            const customer =
                customers[Math.floor(Math.random() * customers.length)];

            const [make, model] =
                carModels[Math.floor(Math.random() * carModels.length)];

            vehicleData.push({
                customer: customer._id,
                registrationNumber: `UP${10 + Math.floor(Math.random() * 80)}${faker.string.alpha({ length: 2, casing: "upper" })}${faker.string.numeric(4)}`,
                make,
                model,
                year: faker.number.int({ min: 2018, max: 2025 })
            });
        }

        const vehicles = await Vehicle.insertMany(vehicleData);

        console.log(`${vehicles.length} vehicles created.`);

        // Mechanics
        const mechanicData = [];

        for (let i = 0; i < 25; i++) {
            mechanicData.push({
                name: faker.person.fullName(),
                phone: faker.string.numeric(10),
                status: faker.helpers.arrayElement([
                    "Available",
                    "Busy",
                    "Off Duty"
                ]),
                jobsCompleted: faker.number.int({
                    min: 10,
                    max: 150
                })
            });
        }

        const mechanics = await Mechanic.insertMany(mechanicData);

        console.log(`${mechanics.length} mechanics created.`);

        // Bookings
        const bookingData = [];

        const statuses = [
            "Pending",
            "Assigned",
            "Mechanic On The Way",
            "Completed",
            "Cancelled"
        ];

        for (let i = 0; i < 600; i++) {
            const customer =
                customers[Math.floor(Math.random() * customers.length)];

            const customerVehicles = vehicles.filter(
                (vehicle) =>
                    vehicle.customer.toString() === customer._id.toString()
            );

            const vehicle =
                customerVehicles.length > 0
                    ? customerVehicles[
                          Math.floor(Math.random() * customerVehicles.length)
                      ]
                    : vehicles[Math.floor(Math.random() * vehicles.length)];

            const mechanic =
                mechanics[Math.floor(Math.random() * mechanics.length)];

            const service =
                services[Math.floor(Math.random() * services.length)];

            const status =
                statuses[Math.floor(Math.random() * statuses.length)];

            bookingData.push({
                bookingId: `BK${String(i + 1).padStart(5, "0")}`,
                customer: customer._id,
                vehicle: vehicle._id,
                mechanic: mechanic._id,
                service: service._id,
                status,
                amount: service.basePrice + faker.number.int({ min: 0, max: 1500 }),
                scheduledAt: faker.date.between({
                    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
            });
        }

        await Booking.insertMany(bookingData);

        console.log(`${bookingData.length} bookings created.`);

        console.log("Database seeded successfully!");

        await mongoose.connection.close();

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedDatabase();
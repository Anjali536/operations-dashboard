const express = require("express");

const { getVehicles } = require("../controllers/vehicleController");

const router = express.Router();

router.get("/", getVehicles);

module.exports = router;
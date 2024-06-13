// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  employeeId: String,
  vehicleNo: String, 
  startTime: Date,
  endTime: Date,
  startLocation: String,
  endLocation: String,
});

module.exports = mongoose.model('Trip', tripSchema);

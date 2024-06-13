// server/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

router.post('/start-trip', async (req, res) => {
  try {
    const { employeeId, vehicleNo, startLocation } = req.body;
    const newTrip = new Trip({
      employeeId,
      vehicleNo,
      startLocation,
      startTime: new Date(),
    });
    await newTrip.save();
    res.status(200).json({ tripId: newTrip._id });
  } catch (error) {
    console.error('Error starting trip:', error.message);
    res.status(500).json({ error: 'Failed to start trip' });
  }
});

router.post('/end-trip', async (req, res) => {
  try {
    const { tripId, endLocation } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    await Trip.findByIdAndUpdate(tripId, { endTime: new Date(), endLocation });
    res.status(200).send('Trip ended successfully');
  } catch (error) {
    console.error('Error ending trip:', error.message);
    res.status(500).json({ error: 'Failed to end trip' });
  }
});

router.get('/generate-report', async (req, res) => {
  try {
    const trips = await Trip.find();
    const fields = ['employeeId', 'vehicleNo', 'startLocation', 'endLocation', 'startTime', 'endTime'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(trips);

    res.header('Content-Type', 'text/csv');
    res.attachment('monthly_report.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error generating report:', error.message);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;

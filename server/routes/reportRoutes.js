// server/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { Parser } = require('json2csv');

router.get('/monthly-report', async (req, res) => {
  const { month, year } = req.query;
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const trips = await Trip.find({
    startTime: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  const fields = ['employeeId', 'vehicleNo', 'startTime', 'endTime', 'startLocation', 'endLocation', 'distance'];
  const parser = new Parser({ fields });
  const csv = parser.parse(trips);

  res.header('Content-Type', 'text/csv');
  res.attachment('monthly_report.csv');
  res.send(csv);
});

module.exports = router;

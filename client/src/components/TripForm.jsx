import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

function TripForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  const [tripId, setTripId] = useState(null);

  const handleStartTrip = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
      const response = await axios.post('http://localhost:5000/api/start-trip', {
        employeeId,
        vehicleNo,
        startLocation,
      });
      setTripId(response.data.tripId);
      setAlert({ show: true, severity: 'success', message: 'Trip started successfully' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error starting trip:', error);
      setAlert({ show: true, severity: 'error', message: 'Failed to start trip' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Hide after 3 seconds
    }
  };

  const handleEndTrip = async (event) => {
    event.preventDefault(); // Prevent form submission default behavior

    try {
      await axios.post('http://localhost:5000/api/end-trip', {
        tripId,
        endLocation,
      });
      setTripId(null); // Reset tripId after ending trip
      setAlert({ show: true, severity: 'success', message: 'Trip ended successfully' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error ending trip:', error);
      setAlert({ show: true, severity: 'error', message: 'Failed to end trip' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Hide after 3 seconds
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/generate-report', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'monthly_report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
      setAlert({ show: true, severity: 'error', message: 'Failed to generate report' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Hide after 3 seconds
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false }); // Close the alert immediately
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <form onSubmit={tripId ? handleEndTrip : handleStartTrip}>
          <div>
            <TextField
              id="employee-id"
              label="Employee ID"
              variant="outlined"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              id="vehicle-no"
              label="Vehicle Number"
              variant="outlined"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              required
            />
          </div>
          <div>
            <TextField
              id="start-location"
              label="Start Location"
              variant="outlined"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              required
            />
          </div>
          {tripId && (
            <div>
              <TextField
                id="end-location"
                label="End Location"
                variant="outlined"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                required
              />
            </div>
          )}
          <br />
          <Button variant="contained" type="submit">
            {tripId ? 'End Trip' : 'Start Trip'}
          </Button>
        </form>
        <br />
        <Button variant="outlined" onClick={handleGenerateReport}>
          Generate Monthly Report
        </Button>
        
        {alert.show && (
          <Stack sx={{ width: '100%', mt: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Alert severity={alert.severity} onClose={handleCloseAlert}>
              {alert.message}
            </Alert>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

export default TripForm;

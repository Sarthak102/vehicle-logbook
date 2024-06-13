import React from 'react';
import './App.css';
import TripForm from './components/TripForm.jsx';
import Typography from '@mui/material/Typography';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <br /><br /><br />
      <Typography variant="h2" gutterBottom>
        Vehicle Trip Log
      </Typography>
      <br />
      <TripForm />
    </div>
  );
}

export default App;

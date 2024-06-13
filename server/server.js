// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const tripRoutes = require('./routes/tripRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Ensure CORS is enabled

app.use('/api', tripRoutes);
app.use('/api/reports', reportRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

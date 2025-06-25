const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const farmerRoutes = require('./routes/farmer');
const agronomistRoutes = require('./routes/agronomist');
const supplierRoutes = require('./routes/supplier');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/farmer', farmerRoutes);
app.use('/api/agronomist', agronomistRoutes);
app.use('/api/supplier', supplierRoutes);

// Swagger setup
require('./swagger')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
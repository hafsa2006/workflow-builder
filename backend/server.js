const express = require('express');
const cors = require('cors');
require('dotenv').config();

const generateRoute = require('./routes/generate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/generate', generateRoute);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT} (0.0.0.0)`);
});

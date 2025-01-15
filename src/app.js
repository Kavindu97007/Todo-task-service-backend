const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Task-Service DB'))
  .catch((err) => console.error('DB connection error:', err));

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Task-Service running on port ${PORT}`));
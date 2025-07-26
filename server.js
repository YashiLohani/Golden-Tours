const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  dateOfTravel: String,
  adults: Number,
  children: Number,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', async (req, res) => {
  try {
    const newEntry = new Contact(req.body);
    await newEntry.save();
    res.json({ message: 'Form submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

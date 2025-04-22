
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173', // Removed trailing slash
  origin: 'https://weather-gold-five-26.vercel.app', // Removed trailing slash
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL || "mongodb+srv://bv2611999:NCThDyvPursWfPqs@cluster0.nxrzg.mongodb.net/weather";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Entry Schema and Model
const entrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  mood: String,
  note: String,
  weather: {
    temp: Number,
    condition: String,
  },
}, { timestamps: true });

const Entry = mongoose.model('Entry', entrySchema);

// Routes
app.post('/entries', async (req, res) => {
  try {
    console.log('Received entry data:', req.body); // Log incoming data
    const newEntry = new Entry(req.body);
    const savedEntry = await newEntry.save();
    console.log('Saved entry:', savedEntry); // Log saved data
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ error: 'Failed to save entry', details: err.message });
  }
});

app.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// app.delete('/entries/:id', async (req, res) => {
//   try {
//     await Entry.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Entry deleted' });
//   } catch (err) {
//     console.error('Error deleting entry:', err);
//     res.status(500).json({ error: 'Failed to delete entry' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
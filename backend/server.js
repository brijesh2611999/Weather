
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


app.post('/entries', async (req, res) => {
  try {
    console.log('Received entry:', req.body);
    const savedEntry = await Entry.create(req.body);
    console.log('Saved to DB:', savedEntry);
    res.status(201).json({ 
      success: true,
      data: savedEntry
    });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Database save failed'
    });
  }
});

// app.get('/entries', async (req, res) => {
//   try {
//     const entries = await Entry.find().sort({ date: -1 });
//     return res.json(entries);
//   } catch (err) {
//     console.error('Error fetching entries:', err);
//     res.status(500).json({ error: 'Failed to fetch entries' });
//   }
// });
// Improved entries route with better error handling and logging
app.get('/entries', async (req, res) => {
  try {
    console.log('Fetching entries from database...');
    const entries = await Entry.find().sort({ date: -1 }).lean();
    
    // Log how many entries were found
    console.log(`Found ${entries.length} entries`);
    
    // Add validation for the data structure
    const validatedEntries = entries.map(entry => ({
      date: entry.date || new Date(),
      mood: entry.mood || 'unknown',
      note: entry.note || '',
      weather: entry.weather || {}
    }));
    
    return res.json({
      success: true,
      count: validatedEntries.length,
      data: validatedEntries
    });
    
  } catch (err) {
    console.error('Error fetching entries:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to fetch entries',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
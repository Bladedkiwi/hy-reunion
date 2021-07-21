// Sequence model for the Sequence Generator
const mongoose = require('mongoose');

const sequence = new mongoose.Schema({
  maxScheduleEventId: {type: Number},
});

module.exports = mongoose.model('Sequence', sequence);

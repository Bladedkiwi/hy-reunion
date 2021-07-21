// Schedule Event model for the schedules route
const mongoose = require('mongoose');

const scheduleEvent = new mongoose.Schema({
  id: {type: String},
  day: {type: String},
  assignment: {type: String},
  time: {type: String},
  meal: {
    name: {type: String},
    mealItems: [{type: String}],
    mealRecipe: {type: String},
    mealInstructions: {type: String},
    mealUrl: {type: String}

  } | null,
  plannedEvent: {
    name: {type: String},
    imageUrl: {type: String},
    url: {type: String},
    details: [{type: String}],
    subject: {type: String},
    notes: {type: String},
    location: {type: String}
  } | null
});

module.exports = mongoose.model('ScheduleEvent', scheduleEvent);

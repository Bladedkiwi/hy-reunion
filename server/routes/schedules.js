const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const ScheduleEvent = require('../models/scheduleEvent');


router.get('/', function (req, res) {
  // Retrieve List
  ScheduleEvent.find()
    .populate('group')
    // Success
    .then(eventList => {
      res.status(200).json(eventList);
      // Fail
    }).catch(error => {
    res.status(500).json({
      message: "Schedule Event retrieval failed",
      error: error
    })
  });
});

router.post('/', (req, res, next) => {
  // Find the Max Id
  const maxScheduleEventId = sequenceGenerator.nextId("scheduleEvent");

  const schedulePlannedEvent = new ScheduleEvent({
    id: maxScheduleEventId,
    day: req.body.day,
    assignment: req.body.assignment,
    time: req.body.time,
    meal: null,
    plannedEvent: {
      name: req.body.plannedEvent.name,
      imageUrl: req.body.plannedEvent.imageUrl,
      url: req.body.plannedEvent.url,
      details: req.body.plannedEvent.details,
      subject: req.body.plannedEvent.subject,
      notes: req.body.plannedEvent.notes,
      location: req.body.plannedEvent.location,
    },
  });

  schedulePlannedEvent.save()

    // Success
    .then(newEvent => {
      res.status(201).json(newEvent);
    })
    // Fail
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred with creating a new Event',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  console.log('put has been accessed');
  // Find the desired contact by id
  ScheduleEvent.findOne({id: req.params.id})
    // Success
    .then(updateEvent => {
      console.log(updateEvent.id);
      updateEvent.id = req.body.id;
      updateEvent.day = req.body.day;
      updateEvent.assignment = req.body.assignment;
      updateEvent.time = req.body.time;
      if (req.body.plannedEvent != null) {
        updateEvent.meal = null;
        updateEvent.plannedEvent.name = req.body.plannedEvent.name;
        updateEvent.plannedEvent.imageUrl = req.body.plannedEvent.imageUrl;
        updateEvent.plannedEvent.url = req.body.plannedEvent.url;
        updateEvent.plannedEvent.details = req.body.plannedEvent.details;
        updateEvent.plannedEvent.subject = req.body.plannedEvent.subject;
        updateEvent.plannedEvent.notes = req.body.plannedEvent.notes;
        updateEvent.plannedEvent.location = req.body.plannedEvent.location;
      }
      if (req.body.meal != null) {
        updateEvent.plannedEvent = null;
        updateEvent.meal.name = req.body.meal.name;
        updateEvent.meal.mealItems = req.body.meal.mealItems;
        updateEvent.meal.mealRecipe = req.body.meal.mealRecipe;
        updateEvent.meal.mealUrl = req.body.meal.mealUrl;
      }
      console.log(updateEvent);
      ScheduleEvent.updateOne({id: req.params.id}, updateEvent)
        .then(result => {
          res.status(204).json({
            message: 'Event updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred with updating one Event',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Event not found.',
        error: {contact: 'Event not found'}
      });
    });
});


router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  ScheduleEvent.findOne({id: req.params.id})
    .then(scheduleEvent => {
      ScheduleEvent.deleteOne({id: req.params.id})
        .then(result => {
          res.status(204).json({
            message: "Scheduled Event deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred with deleting the scheduled event',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Scheduled event not found.',
        error: {contact: 'Scheduled Event not found'}
      });
    });
});

module.exports = router;

const Sequence = require('../models/sequence');

var maxScheduleEventId;
var sequenceId = null;


function SequenceGenerator() {

/*
Must export the model from the Sequence model to use the Model functions
Exec() is the same as the callback method
 */
  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxScheduleEventId = sequence.maxScheduleEventId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  maxScheduleEventId++;
  updateObject = {maxScheduleEventId: maxScheduleEventId};
  nextId = maxScheduleEventId;

  // switch (collectionType) {
  //   case 'documents':
  //     maxDocumentId++;
  //     updateObject = {maxDocumentId: maxDocumentId};
  //     nextId = maxDocumentId;
  //     break;
  //   case 'messages':
  //     maxMessageId++;
  //     updateObject = {maxMessageId: maxMessageId};
  //     nextId = maxMessageId;
  //     break;
  //   case 'contacts':
  //     maxContactId++;
  //     updateObject = {maxContactId: maxContactId};
  //     nextId = maxContactId;
  //     break;
  //   default:
  //     return -1;
  // }

  Sequence.updateOne({id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator() ;

const mongoose = require('mongoose');


/**
 * document Schema
 **/
const documentSchema = mongoose.Schema({
  documentType: {
    type: String,
    enum: ["FILE", "VIDEO", "URL", "IMAGE", "SOUND"],
    required: true
  },
  documentPath: {
    type: String,
    required: true
  }
});

/**
 * Content Schema
 **/
const contentSchema = mongoose.Schema({
  contentType: {
      type: String,
      enum: ["DOCUMENTATION", "TASK", "QUESTIONNAIRE"],
      required: true
  },
  content: {
    type: String
  },
  documents: [documentSchema],

});

/**
 * chapter Schema
 **/
const chapterSchema = mongoose.Schema({
  chapterName: {
      type: String,
      required: true
  },
  content: [contentSchema]

});

/**
 * course Schema
 **/
const courseSchema = mongoose.Schema({
    courseName: {
      type:String,
      required: true
    },
    courseDescription: {
      type: String,
    },
    chapters: [chapterSchema],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
});

module.exports = mongoose.model("Chapter", chapterSchema);
module.exports = mongoose.model("Content", contentSchema);
module.exports = mongoose.model("Document", documentSchema);


module.exports = mongoose.model("Course", courseSchema);

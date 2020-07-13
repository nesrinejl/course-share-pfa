const mongoose = require('mongoose');

/**
 * comment Schema
 **/

const commentSchema = mongoose.Schema({
    commentContent: {
        type: String,
        // required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });


/**
 * post Schema
 **/

const postSchema = mongoose.Schema({
    postContent: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [commentSchema]
}, { timestamps: true });

/**
 * document Schema
 **/
const documentSchema = mongoose.Schema({
    documentType: {
        type: String,
        enum: ["FILE", "VIDEO", "URL", "IMAGE", "SOUND"],
        required: true
    },
    file: {
        type: String,
        //required: true
    }
}, { timestamps: true });

/**
 * Content Schema
 **/
const contentSchema = mongoose.Schema({
    contentTitle: {
        type: String,
        //required: true
    },
    contentType: {
        type: String,
        enum: ["DOCUMENTATION", "TASK", "QUESTIONNAIRE"],
        required: true
    },
    content: {
        type: String
    },
    documents: [documentSchema],

}, { timestamps: true });

/**
 * chapter Schema
 **/
const chapterSchema = mongoose.Schema({
    chapterName: {
        type: String,
        required: true
    },
    content: [contentSchema]

}, { timestamps: true });

/**
 * course Schema
 **/
const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
    },
    chapters: [chapterSchema],
    posts: [postSchema],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model("Chapter", chapterSchema);
module.exports = mongoose.model("Content", contentSchema);
module.exports = mongoose.model("Document", documentSchema);
module.exports = mongoose.model("Post", postSchema);

module.exports = mongoose.model("Course", courseSchema);

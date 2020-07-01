const mongoose = require('mongoose');


const enrollmentSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }

}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
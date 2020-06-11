const express = require('express');

const CourseController = require('../controllers/course.controller');

const router = express.Router();

/**
 * create Course
 */

router.post('/course', CourseController.createCourse);


module.exports = router;

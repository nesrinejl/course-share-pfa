const express = require('express');

const CourseController = require('../controllers/course.controller');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

/**
 * create Course
 */

router.post('/new-course', checkAuth, CourseController.createCourse);

/**
 * get courses by userId
 */
router.get('/', checkAuth, CourseController.getCoursesByUserId);

module.exports = router;
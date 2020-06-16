const express = require('express');

const CourseController = require('../controllers/course.controller');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

/**
 * create Course route
 */

router.post('/new-course', checkAuth, CourseController.createCourse);

/**
 * get courses by userId route
 */
router.get('/', checkAuth, CourseController.getCoursesByUserId);
/**
 * get course by Id route
 */
router.get('/:courseId', checkAuth, CourseController.getCourseById);

/**
 * add chapter to course route
 */
router.post('/:courseId/chapters', checkAuth, CourseController.addChapter);

module.exports = router;
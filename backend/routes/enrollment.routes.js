const express = require('express');

const EnrollmentController = require('../controllers/enrollment.controller');

const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

/**
 * add student to course
 */

router.post('/', checkAuth, EnrollmentController.addStudentToCourse);

/**
 * get students by courseId
 */

router.get('', checkAuth, EnrollmentController.getStudentsByCourseId);

/**
 * get students by courseId
 */

router.get('', checkAuth, EnrollmentController.getStudentsNumber);


module.exports = router;

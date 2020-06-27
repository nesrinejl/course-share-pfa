const express = require('express');

const EnrollmentController = require('../controllers/enrollment.controller');

const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

/**
 * send email invitation
 */
router.post('/:courseId/send-email', checkAuth, EnrollmentController.addStudentToCourse);

module.exports = router;
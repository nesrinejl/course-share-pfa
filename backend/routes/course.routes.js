const express = require('express');

const CourseController = require('../controllers/course.controller');

const checkAuth = require('../middleware/checkAuth');
const extractFile = require('../middleware/file.middleware');
const multer = require('multer');

var upload = multer({ dest: 'backend/uploads/' });

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

/**
 * add content to chapter route
 */
router.post('/:courseId/chapters/:chapterId/add-content', checkAuth, extractFile.array('documents', 12), CourseController.addContent);
/**
 * get chapter by Id route
 */
router.get('/:courseId/chapters/:chapterId', checkAuth, extractFile.array('documents', 12), CourseController.getChapterById);
/**
 * get chapters by courseId route
 */

router.get('/:courseId/chapters', checkAuth, CourseController.getChaptersByCourseId);
module.exports = router;

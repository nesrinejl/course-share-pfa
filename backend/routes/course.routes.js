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
router.get('/', checkAuth, CourseController.getCoursesByCreatorId);
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

/**
 * get courses by studentId
 */

router.get('', checkAuth, CourseController.getCoursesByStudentId);

/**
 * get creator by courseId
 */

router.get('/:courseId', checkAuth, CourseController.getCreatorByCourseId);

/**
 * add posts to course route
 */
router.post('/:courseId/posts', checkAuth, CourseController.addPost);

/**
 * get posts by courseId route
 */

router.get('/:courseId/posts', checkAuth, CourseController.getPostsByCourseId);

/**
 * add comments
 */
router.post('/:courseId/posts/:postId', checkAuth, CourseController.addComment);


/**
 * get comments by postId
 */
router.get('/:courseId/posts/:postId/comments', checkAuth, CourseController.getCommentsByPostId);
module.exports = router;

const mongoose = require("mongoose");


const Course = require('../models/course.model');
const Chapter = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');
const Comment = require('../models/course.model');
const { timeStamp } = require("console");
/**
 * create course
 */
exports.createCourse = (req, res, next) => {

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        courseName: req.body.courseName,
        courseDescription: req.body.courseDescription,
        chapters: req.body.chapters,
        creator: req.body.creator,
    });
    course.save().then(createdCourse => {
            res.status(201).json({
                message: 'Course added successfully!',
                course: {
                    ...createdCourse,
                    id: createdCourse._id,
                }
            });
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
}

/**
 * get courses by creatorId
 */
exports.getCoursesByCreatorId = (req, res, next) => {

    if (req.query.creatorId == undefined) {
        return next();
    }
    const creatorId = req.query.creatorId;

    Course
        .find({ creator: creatorId })
        .then(
            courses => {
                if (!courses) {
                    return res.status(404).json({
                        message: "Course not found !",
                    })
                }
                res.status(200).json(
                    courses,

                );
            })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
        );
}

/**
 * get course by Id
 */
exports.getCourseById = async(req, res, next) => {

    const courseId = req.params.courseId;
    try {
        course = await Course.findById(courseId).select("courseName courseDescription chapters posts creator");

        if (!course) {
            return res.status(404).json({
                message: "Course not found !",
            })
        }
        return res.status(200).json({
            course,
            creator: await User.findOne({ _id: course.creator })

        });
    } catch (err) {
        console.log(err)
    }

}


/**
 * add chapter to course
 */

exports.addChapter = (req, res, next) => {
    const courseId = req.params.courseId;

    Course.findByIdAndUpdate({ _id: courseId }, { $addToSet: { chapters: req.body.chapters } })
        .exec()
        .then(
            result => {
                console.log(result);
                if (!result) {
                    return res.status(404).json({
                        message: "Course not found !",
                    })
                }
                res.status(200).json({
                    message: "Chapter created successfully!",
                    result
                });
            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );
}

/**
 * add content to chapter
 */

exports.addContent = async(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');

    const chapterId = req.params.chapterId;
    const courseId = req.params.courseId;
    try {
        const course = await Course.findOne({
            _id: courseId
        });

        for (let i = 0; i < course.chapters.length; i++) {
            if (course.chapters[i]._id == chapterId) {

                var documents = [];
                var documentTypes = req.body.documentTypes;
                const documentFiles = req.files;
                console.log(documentFiles);
                if (documentFiles.length >= 1) {
                    if (Array.isArray(documentTypes)) {
                        for (let j = 0; j < documentTypes.length; j++) {
                            filePath = url + '/uploads/' + documentFiles[j].filename;
                            documents.push({
                                documentType: documentTypes[j],
                                file: filePath
                            });
                        }
                    } else {
                        documentTypes = [req.body.documentTypes];
                        for (let j = 0; j < documentTypes.length; j++) {
                            filePath = url + '/uploads/' + documentFiles[j].filename;
                            documents.push({
                                documentType: documentTypes[j],
                                file: filePath
                            });
                        }
                    }
                }

                console.log(req.body.contentTitle);

                course.chapters[i].content.push({
                    contentTitle: req.body.contentTitle,
                    contentType: req.body.contentType,
                    content: req.body.content,
                    documents: documents,
                });
            }
        }
        course.save().then(
            data => {
                return res.status(200).json({
                    message: 'ok',
                    data: data
                });
            }
        ).catch(
            err => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        next(err);
    }

}

/**
 * get chapter by Id
 */
exports.getChapterById = (req, res, next) => {
    const chapterId = req.params.chapterId;
    const courseId = req.params.courseId;

    Course.findById(courseId)
        .select("chapters")
        .exec()
        .then(course => {

            if (!course) {
                return res.status(404).json({
                    message: "Course not found !",
                })
            }
            for (let i = 0; i < course.chapters.length; i++) {
                if (course.chapters[i]._id == chapterId) {
                    chapter = course.chapters[i];
                }
            }
            res.status(200).json(
                chapter
            );
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );
}

/**
 * get chapters by courseId
 */
exports.getChaptersByCourseId = (req, res) => {
    const courseId = req.params.courseId;
    Course
        .findById(courseId)
        .select("chapters")
        .then(
            chapters => {

                if (!chapters) {
                    return res.status(404).json({
                        message: "Chapters not found !",
                    })
                }

                res.status(200).json(
                    chapters
                );
            })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
        );
}

/**
 * get course by studentId
 */
exports.getCoursesByStudentId = async(req, res, next) => {

    const studentId = req.query.studentId;
    if (studentId == undefined) {
        return next();
    }
    console.log(studentId);
    try {
        const enrollment = await Enrollment.find({ studentId: studentId });

        var courseIds = enrollment.map((enrollment) => enrollment.courseId);

        console.log(courseIds);

        return res.status(200).json({
            courses: await Course.find({ '_id': { $in: courseIds } })
        });
    } catch (err) {
        next(err);
    }
}

/**
 * get creator by courseId
 */
exports.getCreatorByCourseId = async(req, res, next) => {

    if (req.params.courseId == undefined) {
        return next();
    }
    console.log(req.params.courseId);
    try {
        const course = await Course.findById(req.params.courseId);
        return res.status(200).json({
            creator: await User.findById(course.creator)
        });
    } catch (err) {
        next(err);
    }
}

/**
 * ads posts to course
 */
exports.addPost = (req, res, next) => {

    const courseId = req.params.courseId;

    Course.findByIdAndUpdate({ _id: courseId }, { $addToSet: { posts: req.body.posts } })
        .exec()
        .then(
            result => {
                console.log(result);
                if (!result) {
                    return res.status(404).json({
                        message: "Course not found !",
                    })
                }
                res.status(200).json({
                    message: "Post added successfully!",
                    result
                });
            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );
}

/**
 * get posts by courseId
 */
exports.getPostsByCourseId = async(req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId).select('posts');
        postAuthorIds = course.posts.map((post) => post.author);
        var posts = [];
        for (let i = 0; i < course.posts.length; i++) {

            posts.push({
                _id: course.posts[i]._id,
                postContent: course.posts[i].postContent,
                comments: course.posts[i].comments,
                createdAt: course.posts[i].createdAt,
                author: await User.findOne({ _id: course.posts[i].author })
            });

        }
        res.status(200).json(
            posts
        );
    } catch (err) {
        res.status(500).json({
            error: err
        });
        console.log(err)
    }

}

/**
 * add comments to post
 */
exports.addComment = async(req, res, next) => {

    const postId = req.params.postId;
    const courseId = req.params.courseId;
    const io = req.app.get('io');

    try {
        const course = await Course.findOne({
            _id: courseId
        });

        for (let i = 0; i < course.posts.length; i++) {
            if (course.posts[i]._id == postId) {

                course.posts[i].comments.push({
                    commentContent: req.body.commentContent,
                    author: req.body.author
                });

            }
        }

        course.save().then(
            (data) => {
                io.emit('newCommentAdded', {
                    message: 'ok',
                    data: data
                });
            }
        ).catch(
            err => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        next(err);
    }

}

/**
 * get comments by postId
 */
exports.getCommentsByPostId = async(req, res, next) => {


    const courseId = req.params.courseId;
    const postId = req.params.postId;
    try {
        course = await Course.findById(courseId).select("posts");

        if (!course) {
            return res.status(404).json({
                message: "Course not found !",
            })
        }
        var comments = [];

        for (let i = 0; i < course.posts.length; i++) {
            if (course.posts[i]._id == postId) {

                for (let j = 0; j < course.posts[i].comments.length; j++) {
                    comments.push({
                        commentContent: course.posts[i].comments[j].commentContent,
                        createdAt: course.posts[i].comments[j].createdAt,
                        author: await User.findOne({ _id: course.posts[i].comments[j].author })
                    });
                }

            }
        }
        return res.status(200).json(
            comments
        );
    } catch (err) {
        console.log(err)
    }

}

const mongoose = require("mongoose");

const Course = require('../models/course.model');

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
 * get courses by userId
 */
exports.getCoursesByUserId = (req, res) => {
        const userId = req.query.userId;
        Course
            .find({ creator: userId })
            .then(
                courses => {
                    if (!courses) {
                        return res.status(404).json({
                            message: "Course not found !",
                        })
                    }
                    res.status(200).json(
                        courses
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
exports.getCourseById = (req, res, next) => {
    const courseId = req.params.courseId;

    Course.findById(courseId)
        .select("courseName courseDescription chapters")
        .exec()
        .then(course => {

            if (!course) {
                return res.status(404).json({
                    message: "Course not found !",
                })
            }
            res.status(200).json(

                course,
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
 * add chapter to course
 */

exports.addChapter = (req, res, next) => {
    const courseId = req.params.courseId;
    console.log(req.body.chapters)

    Course.update({ _id: courseId }, { $addToSet: { chapters: req.body.chapters } })
        .exec()
        .then(result => {
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
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );

}
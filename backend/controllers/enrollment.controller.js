const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const User = require('../models/user.model');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');

exports.addStudentToCourse = async(req, res, next) => {

    const email = req.body.email;
    const courseId = req.body.courseId;

    try {
        const course = await Course.findOne({
            _id: courseId
        });
        console.log(course.creator);

        if (!email) {
            return res.status(400).send({
                'error': {
                    'message': 'Email required'
                }
            });
        }
        let transporter = nodeMailer.createTransport({
            service: "gmail.com",
            host: 'smtp.gmail.com',
            port: 456,
            secure: true,
            auth: {
                user: 'course.share.app@gmail.com',
                pass: 'Operating012$'
            }
        });
        const student = await User.findOne({
            email: email
        });
        if (student && student.role !== 'Student') {
            return res.status(404).json({
                message: "You are not student!"
            });
        }

        if (!student) {

            const token = jwt.sign({
                    email: email,
                },
                'secret', {
                    expiresIn: "48h",
                }
            );
            const url = 'http://localhost:4200/auth/sign-up;courseId=' + courseId + ';token=' + token;

            let mailOptions = {
                    from: '"Course Share" <course.share.app@gmail.com>',
                    to: email,
                    subject: 'Invitation',
                    html: '<b>Vous êtes invité à rejoindre le course' + course.courseName + '</b> <br>' +
                        '<p>Cliquez sur le lien ci-dessous</p></br>' +
                        '<p>' + url + '</p>'
                }
                // verify connection configuration
            transporter.verify(function(error, success) {
                if (error) {
                    throw new Error('Something went wrong')
                    console.log(error);
                } else {
                    console.log("Server is ready to take our messages");
                }
            });
            transporter.sendMail(mailOptions, (error, data) => {
                if (error) {
                    //throw new Error('Something went wrong');
                    console.log(error);
                }
                console.log(data);
                return res.status(200).send({
                    "status": true,
                    "message": "Email send successfully."
                });

            });

        } else {
            const fetchedEnrollment = Enrollment.find({ studentId: student._id, courseId: req.params.courseId });

            if ((await fetchedEnrollment).length >= 1) {
                return res.status(409).json({
                    message: 'This student already exist in this course!',
                })
            } else {
                const enrollment = new Enrollment({
                    _id: new mongoose.Types.ObjectId(),
                    studentId: student._id,
                    courseId: req.body.courseId,
                });

                enrollment
                    .save()
                    .then(createdEnrollment => {
                        console.log(student._id)
                        res.status(201).json({
                            message: 'Student added to this course successfully!',
                            enrollment: {
                                ...createdEnrollment,
                                id: createdEnrollment._id,
                            }
                        })
                    })
                    .catch(
                        err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            "error": {
                "message": "Something went wrong"
            }
        });
    }
}

exports.getStudentsByCourseId = async(req, res, next) => {

    const courseId = req.query.courseId;
    try {
        const enrollment = await Enrollment.find({ courseId: courseId });

        var studentIds = enrollment.map((enrollment) => enrollment.studentId);

        return res.status(200).json({
            students: await User.find({ '_id': { $in: studentIds } })
        });
    } catch (err) {
        next(err);
    }
}

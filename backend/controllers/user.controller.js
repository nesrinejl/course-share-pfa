const User = require('../models/user.model');
const Enrollment = require('../models/enrollment.model');
const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userValidator = require('../validators/user.validator');

/**signup */
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            if (req.body.role == 'Student') {
                try {
                    const token = req.headers.authorization.split(" ")[1];
                    console.log(token);
                    // to verify token is valid or not
                    const decodedToken = jwt.verify(token, 'secret');

                    const user = new User({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        role: req.body.role,
                        password: hash
                    });

                    user.password = hash;
                    user.save()
                        .then(result => {

                            const enrollment = new Enrollment({
                                _id: new mongoose.Types.ObjectId(),
                                studentId: result._id,
                                courseId: req.body.courseId,
                            });

                            enrollment
                                .save()
                                .then(createdEnrollment => {
                                    res.status(201).json({
                                        message: 'Student added to this course successfully!',
                                        enrollment: createdEnrollment
                                    })
                                })
                                .catch(
                                    err => {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        })
                                    });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Invalid authentication credentials",
                                error: err
                            })
                        });

                } catch (error) {
                    console.log(error);
                    return res.status(500).send({
                        "error": {
                            "message": "Something went wrong"
                        }
                    });
                }
            } else {

                const user = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: req.body.role,
                    password: hash
                });
                user.password = hash;
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'Teacher created successfully',
                            result: result,
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Invalid authentication credentials",
                            error: err
                        })
                    });
            }

        });
}


/**login */

exports.login = (req, res, next) => {

    let fetchedUser;

    User.findOne({ email: req.body.email })
        .exec()
        .then(
            user => {
                if (!user) {
                    return res.status(404).json({
                        message: "User Not Found"
                    });
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: fetchedUser.email,
                                userId: fetchedUser._id
                            },
                            'secret', {
                                expiresIn: "24h",
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token,
                            expiresIn: 86400
                        });
                    }
                    res.status(401).json({
                        message: "Invalid authentication credentials!"
                    });
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}

// get user by email
exports.getUserByEmail = (req, res, next) => {

    if (req.query.email == undefined) {
        return next();
    }

    User.find({ email: req.query.email })
        .exec()
        .then(user => {

            if (!user) {
                return res.status(404).json({
                    message: "User not found !",
                })
            }
            return res.status(200).json(
                user[0]
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

}

// get user by ID
exports.getUserById = (req, res, next) => {

    if (req.query.userId == undefined) {
        return next();
    }

    User.findById(req.query.userId)
        .exec()
        .then(user => {

            if (!user) {
                return res.status(404).json({
                    message: "User not found !",
                })
            }

            return res.status(200).json(
                user
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

}

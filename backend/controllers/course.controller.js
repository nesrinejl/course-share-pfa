const Course = require('../models/course.model');

const mongoose = require("mongoose");


exports.createCourse = (req, res, next) => {

  //const url = req.protocol + '://' + req.get('host');

  const course = new Course({
      _id: new mongoose.Types.ObjectId(),
      courseName: req.body.courseName,
      description: req.body.description,
      chapters: req.body.chapters,
      user: req.body.user,
  });
  course.save()
        .then(result => {
          res.status(201).json({
              message: "Course created successfully",
              createdCourse: {
                  courseName: result.courseName,
                  description: result.description,
                  chapters: result.chapters,
                  user: result.user,
                  _id: result._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:3000/courses/' + result._id
                  }
              },
          });
        })
      .catch(
          err => {
              console.log(err);
              res.status(500).json({
                  error: err
              })
      });
};

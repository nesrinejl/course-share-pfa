const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');

const app = express();


/**Mongo DB connection */
const uri = "mongodb+srv://sirinenesrine:Operating0@pfa-cluster-m5tsl.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log("DB Connection Error:" + err.message);
  });
  mongoose.Promise = global.Promise;
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

/**handling CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH");
      return res.status(200).json({});
  }
  next();

});

/**Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * user routes
 */
app.use('/api/v1/user', userRoutes);
/**
 * course routes
 */
app.use('/api/v1/courses', courseRoutes);

module.exports = app;

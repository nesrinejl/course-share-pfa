const express = require('express');

const UserController = require('../controllers/user.controller');

const router = express.Router();

/**sign up */
router.post('/sign-up', UserController.signup);

/**Login */
router.post('/login', UserController.login);

// get user by email
router.get("/", UserController.getUserByEmail);

// get user byId
router.get("", UserController.getUserById);

module.exports = router;
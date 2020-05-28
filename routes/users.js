const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* Error handler for async / await functions */
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * AUTH ROUTES: /api
 */

// Register
router.post(
  '/signup',
  userController.validateSignup,
  catchErrors(userController.signup)
);

// Login
router.post('/signin', userController.signin);

// Logout
router.get('/signout', userController.signout);

module.exports = router;

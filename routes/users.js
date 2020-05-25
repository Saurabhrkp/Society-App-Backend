const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { catchErrors } = require('../controllers/controlHelper');

/**
 * AUTH ROUTES: /api/auth
 */

// Register
router.post(
  '/auth/signup',
  userController.validateSignup,
  catchErrors(userController.signup)
);

// Login
router.post('/auth/signin', userController.signin);

// Logout
router.get('/auth/signout', userController.signout);

module.exports = router;

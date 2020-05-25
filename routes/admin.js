const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../controllers/controlHelper');

/**
 * Admin ROUTES: /admin
 */

router.get('/', catchErrors(indexController.getPosts));

router.param('recordID', userController.getRecordByID);

router.param('flatID', indexController.getFlatBySlug);

router
  .route('/:recordID')
  .get(userController.checkAuth, catchErrors(adminController.getAllPosts))
  .post(userController.checkAuth, catchErrors(adminController.savePost));

router
  .route('/:flatID')
  .delete(userController.checkAuth, catchErrors(adminController.deletePost))
  .put(
    userController.checkAuth,
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'photos', maxCount: 6 },
    ]),
    catchErrors(saveFile),
    catchErrors(adminController.updatePost)
  );

router.get(
  '/all/users',
  userController.checkAuth,
  catchErrors(adminController.getUsers)
);

module.exports = router;

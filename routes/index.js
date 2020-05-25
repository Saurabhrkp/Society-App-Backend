const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../controllers/controlHelper');

/**
 * POST ROUTES: /posts/
 */
router.get(
  '/',
  userController.checkAuth,
  catchErrors(indexController.month_display)
);

// POST request for creating Month Records.
router.post(
  '/month/create',
  userController.checkAuth,
  catchErrors(indexController.month_create_post)
);

// GET request to delete Month Records.
router.get(
  '/month/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.month_delete_get)
);

// POST request to delete Month Records.
router.post(
  '/month/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.month_delete_post)
);

// GET request to update Month Records.
router.get(
  '/month/:id/update',
  userController.checkAuth,
  catchErrors(indexController.month_update_get)
);

// POST request to update Month Records.
router.post(
  '/month/:id/update',
  userController.checkAuth,
  catchErrors(indexController.month_update_post)
);

// GET request for one Month Records.
router.get(
  '/month/:id',
  userController.checkAuth,
  catchErrors(indexController.month_detail)
);

// GET request for list of all Month Records.
router.get(
  '/months',
  userController.checkAuth,
  catchErrors(indexController.month_list)
);

// POST request for creating Flat.
router.post(
  '/flat/create',
  userController.checkAuth,
  catchErrors(indexController.flat_create_post)
);

// GET request to delete Flat.
router.get(
  '/flat/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.flat_delete_get)
);

// POST request to delete Flat.
router.post(
  '/flat/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.flat_delete_post)
);

// GET request to update Flat.
router.get(
  '/flat/:id/update',
  userController.checkAuth,
  catchErrors(indexController.flat_update_get)
);

// POST request to update Flat.
router.post(
  '/flat/:id/update',
  userController.checkAuth,
  catchErrors(indexController.flat_update_post)
);

// GET request for one Flat.
router.get(
  '/flat/:id',
  userController.checkAuth,
  catchErrors(indexController.flat_detail)
);

// GET request for list of all Flat.
router.get(
  '/flats',
  userController.checkAuth,
  catchErrors(indexController.flat_list)
);

// POST request for creating Record.
router.post(
  '/record/create',
  userController.checkAuth,
  catchErrors(indexController.record_create_post)
);

// GET request to delete Record.
router.get(
  '/record/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.record_delete_get)
);

// POST request to delete Record.
router.post(
  '/record/:id/delete',
  userController.checkAuth,
  catchErrors(indexController.record_delete_post)
);

// GET request to update Record.
router.get(
  '/record/:id/update',
  userController.checkAuth,
  catchErrors(indexController.record_update_get)
);

// POST request to update Record.
router.post(
  '/record/:id/update',
  userController.checkAuth,
  catchErrors(indexController.record_update_post)
);

// GET request for one Record.
router.get(
  '/record/:id',
  userController.checkAuth,
  catchErrors(indexController.record_detail)
);

// GET request for list of all Record.
router.get(
  '/records',
  userController.checkAuth,
  catchErrors(indexController.record_list)
);

module.exports = router;

const express = require('express');
const router = express.Router();
const monthController = require('../controllers/monthController');
const flatController = require('../controllers/flatController');
const recordController = require('../controllers/recordController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../controllers/controlHelper');

// POST request for creating Month Records.
router.post(
  '/month/create',
  userController.checkAuth,
  catchErrors(monthController.month_create_post)
);

// GET request to delete Month Records.
router.get(
  '/month/:id/delete',
  userController.checkAuth,
  catchErrors(monthController.month_delete_get)
);

// DELETE request to delete Month Records.
router.delete(
  '/month/:id/delete',
  userController.checkAuth,
  catchErrors(monthController.month_delete)
);

// GET request to update Month Records.
router.get(
  '/month/:id/update',
  userController.checkAuth,
  catchErrors(monthController.month_update_get)
);

// PUT request to update Month Records.
router.put(
  '/month/:id/update',
  userController.checkAuth,
  catchErrors(monthController.month_update_put)
);

// GET request for one Month Records.
router.get(
  '/month/:id',
  userController.checkAuth,
  catchErrors(monthController.month_detail)
);

// GET request for list of all Month Records.
router.get(
  '/months',
  userController.checkAuth,
  catchErrors(monthController.month_list)
);

// POST request for creating Flat.
router.post(
  '/flat/create',
  userController.checkAuth,
  catchErrors(flatController.flat_create_post)
);

// GET request to delete Flat.
router.get(
  '/flat/:id/delete',
  userController.checkAuth,
  catchErrors(flatController.flat_delete_get)
);

// DELETE request to delete Flat.
router.delete(
  '/flat/:id/delete',
  userController.checkAuth,
  catchErrors(flatController.flat_delete)
);

// GET request to update Flat.
router.get(
  '/flat/:id/update',
  userController.checkAuth,
  catchErrors(flatController.flat_update_get)
);

// PUT request to update Flat.
router.put(
  '/flat/:id/update',
  userController.checkAuth,
  catchErrors(flatController.flat_update_put)
);

// GET request for one Flat.
router.get(
  '/flat/:id',
  userController.checkAuth,
  catchErrors(flatController.flat_detail)
);

// GET request for list of all Flat.
router.get(
  '/flats',
  userController.checkAuth,
  catchErrors(flatController.flat_list)
);

// POST request for creating Record.
router.post(
  '/record/create',
  userController.checkAuth,
  catchErrors(recordController.record_create_post)
);

// GET request to delete Record.
router.get(
  '/record/:id/delete',
  userController.checkAuth,
  catchErrors(recordController.record_delete_get)
);

// DELETE request to delete Record.
router.delete(
  '/record/:id/delete',
  userController.checkAuth,
  catchErrors(recordController.record_delete)
);

// GET request to update Record.
router.get(
  '/record/:id/update',
  userController.checkAuth,
  catchErrors(recordController.record_update_get)
);

// PUT request to update Record.
router.put(
  '/record/:id/update',
  userController.checkAuth,
  catchErrors(recordController.record_update_put)
);

// GET request for one Record.
router.get(
  '/record/:id',
  userController.checkAuth,
  catchErrors(recordController.record_detail)
);

// GET request for list of all Record.
router.get(
  '/records',
  userController.checkAuth,
  catchErrors(recordController.record_list)
);

module.exports = router;

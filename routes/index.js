const express = require('express');
const router = express.Router();
const monthController = require('../controllers/monthController');
const flatController = require('../controllers/flatController');
const recordController = require('../controllers/recordController');
const userController = require('../controllers/userController');

/* Error handler for async / await functions */
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

const setSearchID = (req, res, next, ID) => {
  req.searchID = ID;
  next();
};

// GET home page.
router.get('/', userController.checkAuth, catchErrors(monthController.index));

// Getting ID from Params and setting SearchIDs
router.param('id', setSearchID);

// POST request for creating Month Records.
router.post(
  '/month/create',
  userController.checkAuth,
  catchErrors(monthController.month_create_post)
);

// DELETE request to delete Month Records.
// PUT request to update Month Records.
// GET request for one Month Records.
router.route('/month/:id').delete(
  userController.checkAuth,
  catchErrors(monthController.month_delete)
).put(
  userController.checkAuth,
  catchErrors(monthController.month_update_put)
).get(
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

// DELETE request to delete Flat.
// PUT request to update Flat.
// GET request for one Flat.
router.route('/flat/:id').delete(
  userController.checkAuth,
  catchErrors(flatController.flat_delete)
).put(
  userController.checkAuth,
  catchErrors(flatController.flat_update_put)
).get(
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

// DELETE request to delete Record.
// PUT request to update Record.
// GET request for one Record.
router.route('/record/:id').delete(
  userController.checkAuth,
  catchErrors(recordController.record_delete)
).put(
  userController.checkAuth,
  catchErrors(recordController.record_update_put)
).get(
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

const Month = require('../models/Month');
const Flat = require('../models/Flat');
const Record = require('../models/Record');
const { body, validationResult } = require('express-validator');
const async = require('async');

// Display list of all Flats.
exports.flat_list = async (req, res, next) => {
  try {
    const list_flats = await Flat.find();
    res.json({ title: 'Flat Record List', list_flats });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Flat.
exports.flat_detail = async (req, res, next) => {
  try {
    const flat = await Flat.findById(req.searchID);
    res.json({ title: flat.title, flat });
  } catch (error) {
    return next(error);
  }
};

// Handle Flat create on POST.
exports.flat_create_post = async (req, res, next) => {
  // Validate fields.
  await body('flatno', 'Flat no. must not be empty.')
    .trim()
    .isNumeric()
    .run(req);
  await body('name', 'Ower/Resident of flat must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .run(req);
  await body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .run(req);
  await body('email').trim().isEmail().normalizeEmail().run(req);
  let regex = /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/;
  await body('phone').trim().matches(regex).run(req);
  await body('rental').trim().toBoolean().run(req);
  await body('bhk').trim().isNumeric().run(req);
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Flat object with escaped and trimmed data.
  let flat = new Flat({
    flatno: req.body.flatno,
    name: req.body.name,
    description: req.body.description,
    email: req.body.email || '',
    phone: req.body.phone,
    rental: req.body.rental,
    bhk: req.body.bhk,
  });

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: 'Create Flat',
      flat: flat,
      errors: errors.array(),
    });
    return;
  } else {
    // Data from form is valid. Save flat.
    flat.save((error) => {
      if (error) {
        return next(error);
      }
      // Successful - redirect to new flat record.
      res.redirect(flat.url);
    });
  }
};

// Handle Flat delete on POST.
exports.flat_delete = async (req, res, next) => {
  // Assume the post has valid id (ie no validation/sanitization).
  try {
    const results = await async.parallel({
      records: (callback) => {
        Record.find({ idOfFlat: req.searchID }).exec(callback);
      },
    });
    await Flat.findByIdAndRemove(req.searchID);
    let recordsArray = results.records;
    recordsArray.forEach(async (element) => {
      const record = await Record.findByIdAndRemove(element.id);
      await Month.findOneAndUpdate(
        { _id: record.recordOfMonth.id },
        { pull: { records: record.id } }
      );
    });
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

// Handle Flat update on POST.
exports.flat_update_put = async (req, res, next) => {
  // Validate fields.
  await body('flatno', 'Flat no. must not be empty.')
    .trim()
    .isNumeric()
    .run(req);
  await body('name', 'Ower/Resident of flat must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .run(req);
  await body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .run(req);
  await body('email').trim().isEmail().normalizeEmail().run(req);
  let regex = /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/;
  await body('phone').trim().matches(regex).run(req);
  await body('rental').trim().toBoolean().run(req);
  await body('bhk').trim().isNumeric().run(req);
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Flat object with escaped and trimmed data.
  let flat = {
    flatno: req.body.flatno,
    name: req.body.name,
    description: req.body.description,
    email: req.body.email || '',
    phone: req.body.phone,
    rental: req.body.rental,
    bhk: req.body.bhk,
  };

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: req.body.name,
      flat: flat,
      errors: errors.array(),
    });
    return;
  } else {
    // Data from form is valid. Update the record.
    Flat.findByIdAndUpdate(req.searchID, flat, {}, (error, updatedFlat) => {
      if (error) {
        return next(error);
      }
      // Successful - redirect to month detail page.
      res.redirect(updatedFlat.url);
    });
  }
};

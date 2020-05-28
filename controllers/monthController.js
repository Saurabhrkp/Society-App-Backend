const Month = require('../models/Month');
const Flat = require('../models/Flat');
const Record = require('../models/Record');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require('async');

exports.index = async (req, res, next) => {
  try {
    const results = await async.parallel({
      month_count: (callback) => {
        Month.countDocuments(callback);
      },
      flat_count: (callback) => {
        Flat.countDocuments(callback);
      },
      record_count: (callback) => {
        Record.countDocuments(callback);
      },
    });
    res.json({ title: 'Home', results });
  } catch (error) {
    return next(error);
  }
};

// Display list of all Months.
exports.month_list = async (req, res, next) => {
  try {
    const list_months = await Month.find();
    res.json({ title: 'Month Record List', list_months });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Month.
exports.month_detail = async (req, res, next) => {
  try {
    const month = await Month.findById(req.searchID);
    res.json({ title: month.title, month });
  } catch (error) {
    return next(error);
  }
};

// Handle Month create on POST.
exports.month_create_post = async (req, res, next) => {
  // Validate fields.
  await body('title', 'Title must not be empty.')
    .isLength({ min: 1 })
    .trim()
    .run(req);
  await body('description', 'Description must not be empty.')
    .isLength({ min: 1 })
    .trim()
    .run(req);
  // Sanitize fields.
  sanitizeBody('*').escape();
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Month object with escaped and trimmed data.
  let month = new Month({
    title: req.body.title,
    description: req.body.description,
  });

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: 'Create Month',
      month: month,
      errors: errors.array(),
    });
    return;
  } else {
    try {
      // Data from form is valid. Save month.
      await month.save();
      // Successful - redirect to new month record.
      res.redirect(month.url);
    } catch (error) {
      next(error);
    }
  }
};

// Handle Month delete on POST.
exports.month_delete = async (req, res, next) => {
  // Assume the post has valid id (ie no validation/sanitization).
  try {
    const results = await async.parallel({
      records: (callback) => {
        Record.find({ recordOfMonth: req.searchID }).exec(callback);
      },
    });
    await Month.findByIdAndRemove(req.searchID);
    let recordsArray = results.records;
    recordsArray.forEach(async (element) => {
      const record = await Record.findByIdAndRemove(element.id);
      await Flat.findOneAndUpdate(
        { _id: record.idOfFlat.id },
        { pull: { records: record.id } }
      );
    });
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
};
/**
  //? assuming openFiles is an array of file names and saveFile is a function
  //? to save the modified contents of that file:
    async.each(openFiles, saveFile, function(error){
  //? if any of the saves produced an error, error would equal that error
    });
 */

// Handle Month update on POST.
exports.month_update_put = async (req, res, next) => {
  // Validate fields.
  await body('title', 'Title must not be empty.')
    .isLength({ min: 1 })
    .trim()
    .run(req);
  await body('description', 'Description must not be empty.')
    .isLength({ min: 1 })
    .trim()
    .run(req);
  // Sanitize fields.
  sanitizeBody('*').escape();
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);
  // Create a Month object with escaped and trimmed data.

  let month = {
    title: req.body.title,
    description: req.body.description,
  };

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: req.body.title,
      description: req.body.description,
      errors: errors.array(),
    });
    return;
  } else {
    try {
      // Data from form is valid. Update the record.
      let updatedMonth = await Month.findByIdAndUpdate(req.searchID, month, {});
      // Successful - redirect to month detail page.
      res.redirect(updatedMonth.url);
    } catch (error) {
      next(error);
    }
  }
};

const Month = require('../models/Month');
const Flat = require('../models/Flat');
const Record = require('../models/Record');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require('async');

exports.index = (req, res) => {
  async.parallel(
    {
      month_count: (callback) => {
        Month.countDocuments(callback);
      },
      flat_count: (callback) => {
        Flat.countDocuments(callback);
      },
      record_count: (callback) => {
        Record.countDocuments(callback);
      },
    },
    (err, results) => {
      res.json({
        title: 'Home',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Months.
exports.month_list = (req, res) => {
  Month.find().exec((err, list_months) => {
    if (err) {
      return next(err);
    }
    res.json({ title: 'Month Record List', month_list: list_months });
  });
};

// Display detail page for a specific Month.
exports.month_detail = (req, res) => {
  async.parallel(
    {
      month: (callback) => {
        Month.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.month == null) {
        // No results.
        var err = new Error('Month record not found');
        err.status = 404;
        return next(err);
      }
      res.json({
        title: results.month.title,
        month: results.month,
      });
    }
  );
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
    // Data from form is valid. Save month.
    month.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new month record.
      res.redirect(month.url);
    });
  }
};

// Display Month delete form on GET.
exports.month_delete_get = (req, res) => {
  async.waterfall(
    {
      month: (callback) => {
        Month.findById(req.params.id).exec(callback);
      },
      records: (callback) => {
        Record.find({ recordOfMonth: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.month == null) {
        // No results.
        res.redirect('/months');
      }
      // Successful, so render.
      res.json({
        title: results.month.title,
        month: results.month,
        records: results.records,
      });
    }
  );
};

// Handle Month delete on POST.
exports.month_delete = (req, res) => {
  // Assume the post has valid id (ie no validation/sanitization).
  async.parallel(
    {
      month: (callback) => {
        Month.findById(req.params.id).exec(callback);
      },
      records: (callback) => {
        Record.find({ recordOfMonth: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      // Month has no MonthInstance objects. Delete object and redirect to the list of months.
      Month.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
          return next(err);
        }
      });
      let recordsArray = results.records;
      recordsArray.forEach((element) => {
        Record.findByIdAndRemove(element.id, async (err, data) => {
          if (err) {
            return next(err);
          }
          await Flat.findOneAndUpdate(
            { _id: data.id },
            { pull: { records: data.id } },
            (err) => {
              if (err) {
                return next(err);
              }
            }
          );
        });
      });
    }
  );
};

// Display Month update form on GET.
exports.month_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Month update GET');
};

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

  let month = new Month({
    title: req.body.title,
    description: req.body.description,
  });

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: req.body.title,
      description: req.body.description,
      errors: errors.array(),
    });
    return;
  } else {
    // Data from form is valid. Update the record.
    Month.findByIdAndUpdate(req.params.id, month, {}, (err, updatedMonth) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to month detail page.
      res.redirect(updatedMonth.url);
    });
  }
};

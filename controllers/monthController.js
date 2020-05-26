const Month = require('../models/Month');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require('async');

// Display list of all Months.
exports.month_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Month list');
};

// Display detail page for a specific Month.
exports.month_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Month detail: ' + req.params.id);
};

// Handle Month create on POST.
exports.month_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Month create POST');
};

// Display Month delete form on GET.
exports.month_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Month delete GET');
};

// Handle Month delete on POST.
exports.month_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Month delete POST');
};

// Display Month update form on GET.
exports.month_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Month update GET');
};

// Handle Month update on POST.
exports.month_update_put = (req, res) => {
  res.send('NOT IMPLEMENTED: Month update POST');
};

const Record = require('../models/Record');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require('async');

// Display list of all Records.
exports.record_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Record list');
};

// Display detail page for a specific Record.
exports.record_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Record detail: ' + req.params.id);
};

// Handle Record create on POST.
exports.record_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Record create POST');
};

// Handle Record delete on POST.
exports.record_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Record delete POST');
};

// Handle Record update on POST.
exports.record_update_put = (req, res) => {
  res.send('NOT IMPLEMENTED: Record update POST');
};

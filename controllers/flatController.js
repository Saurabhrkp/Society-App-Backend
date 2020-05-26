const Flat = require('../models/Flat');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require('async');

// Display list of all Flats.
exports.flat_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat list');
};

// Display detail page for a specific Flat.
exports.flat_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat detail: ' + req.params.id);
};

// Handle Flat create on POST.
exports.flat_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat create POST');
};

// Handle Flat delete on POST.
exports.flat_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat delete POST');
};

// Handle Flat update on POST.
exports.flat_update_put = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat update POST');
};

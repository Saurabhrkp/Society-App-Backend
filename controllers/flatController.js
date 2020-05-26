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

// Display Flat delete form on GET.
exports.flat_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat delete GET');
};

// Handle Flat delete on POST.
exports.flat_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat delete POST');
};

// Display Flat update form on GET.
exports.flat_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat update GET');
};

// Handle Flat update on POST.
exports.flat_update_put = (req, res) => {
  res.send('NOT IMPLEMENTED: Flat update POST');
};

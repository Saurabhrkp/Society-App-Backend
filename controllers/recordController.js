const Month = require('../models/Month');
const Flat = require('../models/Flat');
const Record = require('../models/Record');
const { body, validationResult } = require('express-validator');

const calculateTotalBy = (record) => {
  return (
    parseInt(record.maintenance.amount) +
    parseInt(record.maintenance.penality) +
    parseInt(record.shedMoney.amount) +
    parseInt(record.shedMoney.penality) +
    parseInt(record.liftFund.amount) +
    parseInt(record.liftFund.penality) +
    parseInt(record.convenance) +
    parseInt(record.sinkRepair)
  );
};

// Display list of all Records.
exports.record_list = async (req, res, next) => {
  try {
    const list_record = await Record.find();
    res.json({ title: 'Record List', list_record });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Record.
exports.record_detail = async (req, res, next) => {
  try {
    const record = await Record.findById(req.searchID);
    res.json({ title: record.title, record });
  } catch (error) {
    return next(error);
  }
};

// Handle Record create on POST.
exports.record_create_post = async (req, res, next) => {
  // Validate fields.
  await body('maintenance_amount').trim().isNumeric().run(req);
  await body('maintenance_penality').trim().isNumeric().run(req);
  await body('shedMoney_amount').trim().isNumeric().run(req);
  await body('shedMoney_penality').trim().isNumeric().run(req);
  await body('liftFund_amount').trim().isNumeric().run(req);
  await body('liftFund_penality').trim().isNumeric().run(req);
  await body('convenance').trim().isNumeric().run(req);
  await body('sinkRepair').trim().isNumeric().run(req);
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Flat object with escaped and trimmed data.
  let record = new Record({
    recordOfMonth: req.body.monthID,
    idOfFlat: req.body.flatID,
    maintenance: {
      amount: req.body.maintenance_amount,
      penality: req.body.maintenance_penality,
    },
    shedMoney: {
      amount: req.body.shedMoney_amount,
      penality: req.body.shedMoney_penality,
    },
    liftFund: {
      amount: req.body.liftFund_amount,
      penality: req.body.liftFund_penality,
    },
    convenance: req.body.convenance,
    sinkRepair: req.body.sinkRepair,
  });

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: 'Create Record',
      record: record,
      errors: errors.array(),
    });
    return;
  } else {
    try {
      // Data from form is valid. Save record.
      record.finalAmount = calculateTotalBy(record);
      await record.save();
      await Flat.findOneAndUpdate(
        { _id: record.idOfFlat },
        { $push: { records: record.id } }
      );
      await Month.findOneAndUpdate(
        { _id: record.recordOfMonth },
        { $push: { records: record.id } }
      );
      // Successful - redirect to new record record.
      res.redirect(record.url);
    } catch (error) {
      next(error);
    }
  }
};

// Handle Record delete on POST.
exports.record_delete = async (req, res, next) => {
  // Assume the post has valid id (ie no validation/sanitization).
  try {
    const record = await Record.findByIdAndRemove(req.searchID);
    await Month.findOneAndUpdate(
      { _id: record.recordOfMonth._id },
      { $pull: { records: record.id } }
    );
    await Flat.findOneAndUpdate(
      { _id: record.recordOfMonth._id },
      { $pull: { records: record.id } }
    );
    res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

// Handle Record update on POST.
exports.record_update_put = async (req, res, next) => {
  // Validate fields.
  await body('maintenance_amount').trim().isNumeric().run(req);
  await body('maintenance_penality').trim().isNumeric().run(req);
  await body('shedMoney_amount').trim().isNumeric().run(req);
  await body('shedMoney_penality').trim().isNumeric().run(req);
  await body('liftFund_amount').trim().isNumeric().run(req);
  await body('liftFund_penality').trim().isNumeric().run(req);
  await body('convenance').trim().isNumeric().run(req);
  await body('sinkRepair').trim().isNumeric().run(req);
  // Process request after validation and sanitization.
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Flat object with escaped and trimmed data.
  let record = {
    maintenance: {
      amount: req.body.maintenance_amount,
      penality: req.body.maintenance_penality,
    },
    shedMoney: {
      amount: req.body.shedMoney_amount,
      penality: req.body.shedMoney_penality,
    },
    liftFund: {
      amount: req.body.liftFund_amount,
      penality: req.body.liftFund_penality,
    },
    convenance: req.body.convenance,
    sinkRepair: req.body.sinkRepair,
  };

  if (!errors.isEmpty()) {
    // There are errors. Send form again with sanitized values/error messages.
    res.json({
      title: 'Updating Record',
      record: record,
      errors: errors.array(),
    });
    return;
  } else {
    // Data from form is valid. Update the record.
    record.finalAmount = calculateTotalBy(record);
    Record.findByIdAndUpdate(
      req.searchID,
      record,
      {},
      (error, updatedRecord) => {
        if (error) {
          return next(error);
        }
        // Successful - redirect to Record detail page.
        res.redirect(updatedRecord.url);
      }
    );
  }
};

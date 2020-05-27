const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  recordOfMonth: { type: Schema.ObjectId, ref: 'Month', required: true },
  idOfFlat: { type: Schema.ObjectId, ref: 'Flat', required: true },
  maintenance: {
    amount: { type: Number, required: true, default: 0 },
    penality: { type: Number, required: true, default: 0 },
  },
  shedMoney: {
    amount: { type: Number, required: true, default: 0 },
    penality: { type: Number, required: true, default: 0 },
  },
  liftFund: {
    amount: { type: Number, required: true, default: 0 },
    penality: { type: Number, required: true, default: 0 },
  },
  convenance: { type: Number, required: true, default: 0 },
  sinkRepair: { type: Number, required: true, default: 0 },
  finalAmount: { type: Number, required: true, default: 0 },
});

// Virtual for this RecordSchema object's URL.
RecordSchema.virtual('url').get(function () {
  return '/record/' + this._id;
});

const calculateTotalBy = function (next) {
  this.finalAmount =
    this.maintenance.amount +
    this.maintenance.penality +
    this.shedMoney.amount +
    this.shedMoney.penality +
    this.liftFund.amount +
    this.liftFund.penality +
    this.convenance +
    this.sinkRepair;
  next();
};

RecordSchema.pre('save', calculateTotalBy);

const autoPopulateRecordBy = function (next) {
  this.populate('idOfFlat');
  this.populate('recordOfMonth');
  next();
};

RecordSchema.pre('findOne', autoPopulateRecordBy)
  .pre('find', autoPopulateRecordBy)
  .pre('findOneAndUpdate', autoPopulateRecordBy);

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
RecordSchema.plugin(mongodbErrorHandler);

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;

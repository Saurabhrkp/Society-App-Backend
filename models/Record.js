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
  convenance: {
    amount: { type: Number, required: true, default: 0 },
  },
  sinkRepair: {
    amount: { type: Number, required: true, default: 0 },
  },
  finalAmount: {
    amount: { type: Number, required: true, default: 0 },
  },
});

const calculateTotalBy = function (next) {
  this.finalAmount =
    +this.maintenance.amount +
    this.maintenance.penality +
    this.shedMoney.amount +
    this.shedMoney.penality +
    this.liftFund.amount +
    this.liftFund.penality +
    this.convenance.amount +
    this.sinkRepair.amount;
  next();
};

RecordSchema.pre('save', calculateTotalBy);

const autoPopulateUserBy = function (next) {
  this.populate('idOfFlat, recordOfMonth');
  next();
};

RecordSchema.pre('findOne', autoPopulateUserBy).pre('find', autoPopulateUserBy);

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
RecordSchema.plugin(mongodbErrorHandler);

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;

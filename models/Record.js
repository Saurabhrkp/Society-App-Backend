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

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
RecordSchema.plugin(mongodbErrorHandler);

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;

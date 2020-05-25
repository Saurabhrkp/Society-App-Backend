const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
  flatno: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  ofRecord: { type: Schema.ObjectId, ref: 'Record', required: false },
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

FlatSchema.pre('save', calculateTotalBy);

/* Create index on keys for more performant querying/Flat sorting */
FlatSchema.index({ publishedDate: 1 });

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
FlatSchema.plugin(mongodbErrorHandler);

/* The mongoosePaginate plugin adds paginate method to the Model for Pagination*/
FlatSchema.plugin(mongoosePaginate);

const Flat = mongoose.model('Flat', FlatSchema);

module.exports = Flat;

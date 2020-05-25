const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
  flatno: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  reciept: [{ type: Schema.ObjectId, ref: 'File' }],
  maintenance: {
    amount: { type: Number, required: true },
    penality: { type: Number, required: true, default: 0 },
  },
  shedMoney: {
    amount: { type: Number, required: true },
    penality: { type: Number, required: true, default: 0 },
  },
  liftFund: {
    amount: { type: Number, required: true },
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

/* Create index on keys for more performant querying/Flat sorting */
FlatSchema.index({ publishedDate: 1 });

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
FlatSchema.plugin(mongodbErrorHandler);

/* The mongoosePaginate plugin adds paginate method to the Model for Pagination*/
FlatSchema.plugin(mongoosePaginate);

const Flat = mongoose.model('Flat', FlatSchema);

module.exports = Flat;

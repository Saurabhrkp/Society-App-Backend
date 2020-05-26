const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const MonthSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  records: [{ type: Schema.ObjectId, ref: 'Record', required: false }],
});

// Virtual for this MonthSchema object's URL.
MonthSchema.virtual('url').get(function () {
  return '/month/' + this._id;
});

const autoPopulateUserBy = function (next) {
  this.populate('records');
  next();
};

MonthSchema.pre('findOne', autoPopulateUserBy).pre('find', autoPopulateUserBy);

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
MonthSchema.plugin(mongodbErrorHandler);

/* The mongoosePaginate plugin adds paginate method to the Model for Pagination*/
MonthSchema.plugin(mongoosePaginate);

const Month = mongoose.model('Month', MonthSchema);

module.exports = Month;

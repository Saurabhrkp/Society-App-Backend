const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
  flatno: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, lowercase: true, required: false },
  phone: { type: Number, required: true },
  rental: { type: Boolean, required: true, default: false },
  bhk: { type: Number, required: true, enum: [1, 2, 3], default: 2 },
  records: [{ type: Schema.ObjectId, ref: 'Record', required: false }],
});

// Virtual for this FlatSchema object's URL.
FlatSchema.virtual('url').get(function () {
  return '/flat/' + this._id;
});

const autoPopulateUserBy = function (next) {
  this.populate('records');
  next();
};

FlatSchema.pre('findOne', autoPopulateUserBy).pre('find', autoPopulateUserBy);

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
FlatSchema.plugin(mongodbErrorHandler);

/* The mongoosePaginate plugin adds paginate method to the Model for Pagination*/
FlatSchema.plugin(mongoosePaginate);

const Flat = mongoose.model('Flat', FlatSchema);

module.exports = Flat;

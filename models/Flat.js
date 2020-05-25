const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
  flatno: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  records: [{ type: Schema.ObjectId, ref: 'Record', required: false }],
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

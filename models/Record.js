const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  year: { type: String, required: true },
  month: { type: String, required: true, unique: true },
  flats: [{ type: Schema.ObjectId, ref: 'Flat', required: false }],
});

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
RecordSchema.plugin(mongodbErrorHandler);

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;

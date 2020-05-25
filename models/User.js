const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true, lowercase: true },
  phone: { type: Number, required: false },
  password: { type: String },
  email: { type: String, lowercase: true },
});

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
UserSchema.plugin(mongodbErrorHandler);

const User = mongoose.model('User', UserSchema);

module.exports = User;

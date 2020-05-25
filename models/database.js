const mongoose = require('mongoose');

// DB Config
const mongoURI = 'mongodb://localhost:27017/society-database';

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.info(`MongoDB is Connected on ${mongoURI}`))
  .catch((err) => console.error(`Unable to MongoDB due to ${err.message}`));

// Promise of mongoose
mongoose.Promise = global.Promise;

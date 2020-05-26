/* Error handler for async / await functions */
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

const setSearchID = (req, res, next, ID) => {
  req.searchID = ID;
  next();
};

module.exports = { catchErrors, setSearchID };

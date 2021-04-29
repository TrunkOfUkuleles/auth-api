'use strict';


module.exports = (err, req, res, next) => {

    const error = err.message ? err.message : err;

    const errorObject = {
      status: 500,
      test: "me",
      message: error
    }

  console.log(req.body)
    res.status(500).json(errorObject);
}
 
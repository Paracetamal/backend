const fs = require('fs');

function handleErrors(error, req, res) {
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  if (error.type === 'CustomError') {
    return res.status(error.code).send({ error: error.message });
  }

  console.log(`internal Error: ${error}`);
  return res.status(500).send({ error: 'Internal Server Error' });
}

function CustomError(message, code = 400, type = 'CustomError') {
  const error = new Error(message);
  error.code = code;
  error.type = type;
  return error;
}

module.exports = { handleErrors, CustomError }
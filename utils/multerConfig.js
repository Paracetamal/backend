const multer = require('multer');
const { extname, resolve } = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb('formato de arquivo invalido, somente aceito png e jpeg', false);
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${random()}${extname(file.originalname)}`);
    },
  }),
  onError: (err, req, res, next) => {
    res.status(400).json({ error: err.message });
    next(err);
  },
};

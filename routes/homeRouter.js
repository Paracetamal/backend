const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.send('hello, world!')
});

module.exports = router;

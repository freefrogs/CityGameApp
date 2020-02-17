const express = require('express');
const router = express.Router();

//Game view 
router.get('/', (req, res) => {
  res.render('game');
});

module.exports = router;
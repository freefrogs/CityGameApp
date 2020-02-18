const express = require('express');
const router = express.Router();

//Game view 
router.get('/:id', (req, res) => {
  res.render('game');
});

//Add points
router.post('/:id', (req, res) => {
  const codes = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
  console.log(req.body.code);
  res.redirect('/game');
})

module.exports = router;
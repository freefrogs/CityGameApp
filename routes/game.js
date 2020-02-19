const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../middleware/auth');
//Game view 
router.get('/:id', checkAuthentication, (req, res) => {
  if (res.locals.team._id) {
    if (res.locals.team._id === req.params.id) {
      return res.render('game');
    }
    return res.render('badpath');
  } 
  return res.render('main');
});

//Add points
router.post('/:id', checkAuthentication, (req, res) => {
  const codes = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
  console.log(req.body.code);
  res.redirect('/game');
})

module.exports = router;

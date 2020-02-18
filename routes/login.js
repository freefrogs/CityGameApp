const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const { Team } = require('../models/team');

// Login view
router.get('/', (req, res) => {
  res.render('login');
});

// Login procedure
router.post('/', async (req, res) => {
  const team = await Team
    .findOne()
    .or([{ email: req.body.name }, { name: req.body.name }])

  if (!team) {
    return res.render('login', {
      errorText: 'E-mail lub nazwa drużyny są nieprawidłowe'
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, team.password);
  if (!validPassword) return res.render('login', {
    errorText: 'Nieprawidłowe hasło'
  });

  const token = team.generateAuthToken();

  res.cookie('token', token);
  res.redirect('/');
});

module.exports = router;

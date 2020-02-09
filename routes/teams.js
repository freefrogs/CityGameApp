const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { Team, validateTeamRegister } = require('../models/team');

//Register view
router.get('/', (req, res) => {
  res.render('register');
});

//Add new team
router.post('/', async (req, res) => {
  //Basic validation
  const { error } = validateTeamRegister(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  //Checking whether team is already registered
  let team = await Team.findOne({ email: req.body.email });
  if (team) return res.status(400).send('Ten email jest już zarejestrowny w grze');

  team = await Team.findOne({ name: req.body.name });
  if (team) return res.status(400).send('Instnieje już drużyna o takiej nazwie');

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Add team to DB
  team = new Team({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  await team.save();

  return res.redirect('/');
});

module.exports = router;


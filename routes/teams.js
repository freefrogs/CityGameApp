require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const router = express.Router();
const { Team, validateTeamRegister } = require('../models/team');

//Register view
router.get('/', async (req, res) => {
  const team = await Team.find();
  res.render('register', { quantity: team.length });
});

//Add new team
router.post('/', async (req, res) => {
  //Basic validation
  const { error } = validateTeamRegister(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  //Checking whether team is already registered
  let team = await Team.findOne({ email: req.body.email });
  if (team) {
    //return res.status(400).send('Ten email jest już zarejestrowny w grze');
    return res.render('register', {
      errorText: 'Ten email jest już zarejestrowany w grze'
    });
  }

  team = await Team.findOne({ name: req.body.name });
  if (team) {
    //return res.status(400).send('Istnieje już drużyna o takiej nazwie');
    return res.render('register', {
      errorText: 'Istnieje już drużyna o takiej nazwie'
    });
  }

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

  //Registration confirmation email
  const outputText = `
    Cześć 🙂,
    To jest potwierdzenie Twojej rejestracji do udziału w grze ReStore City Game.
    Nazwa Twojej dużyny to ${req.body.name}.
    Zapamietaj ją oraz hasło które użyłeś w czasie rejestracji,
    na pewno jeszcze Ci się przydadzą.
    Dalsze instrukcje otrzymasz dzień przed rozpoczęciem gry (20.03.2020r.).
    Miłego dnia!
    Zespół Habitat for Humanity Poland
    http://habitat.pl/restore/
  `;
  const outputHTML = `
    <div style='font-family:Calibri,sans-serif;color:rgb(255,255,255);text-align:center;background-color:rgb(0,175,216);font-size:16px;padding:10px;'>
      <h2 style='text-decoration:underline;margin-top:20px;'>Cześć 🙂</h2>
      <p>To jest potwierdzenie Twojej rejestracji do udziału w grze ReStore City Game.</p>
      <p>
        Nazwa Twojej dużyny to <span style='font-weight:bold'>${req.body.name}</span>.<br>
        Zapamietaj ją oraz hasło które użyłeś w czasie rejestracji, na pewno jeszcze Ci się przydadzą ;).
      </p>
      <p style='text-decoration:underline;'>Dalsze instrukcje otrzymasz dzień przed rozpoczęciem gry (20.03.2020r.).</p>
      <p>
        <img style='height:100px;width:auto;margin-right:20px;' src='https://raw.githubusercontent.com/freefrogs/CityGameApp/master/public/ReStore_logo.png' alt='logo ReStore'>
        <p>
          Miłego dnia!<br>
          Zespół Habitat for Humanity Poland<br>
          <a href='http://habitat.pl/restore/' style='color:rgb(255,255,255);'>http://habitat.pl/restore/</a>
        </p>
      </p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.emaillabs.net.pl',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const message = {
    from: 'ReStore City Game',
    to: req.body.email,
    subject: 'Rejestracja - ReStore City Game ♕',
    text: outputText,
    html: outputHTML,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      //return res.status(400).send(error);
      return res.render('register', {
        errorText: 'Coś poszło nie tak :-(, spróbuj ponownie za kilka minut'
      });
    }

    return res.redirect('/');
  });
});

module.exports = router;

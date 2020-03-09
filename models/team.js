require('dotenv').config();
const mongoose = require('mongoose');
const Joi =require('@hapi/joi');
const jwt = require('jsonwebtoken');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nazwa drużyny jest wymaganym polem'],
    minlength: [2, 'Wybrana nazwa jest za krótka'],
    maxlength: [20, 'Wybrana nazwa jest za długa'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email jest wymaganym polem'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Błędny adres e-mail',
    ],
    minlength: 6,
    maxlength: 60,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Nr telefonu jest wymaganym polem'],
    minlength: 9,
    maxlength: 22,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Hasło jest wymaganym polem'],
    minlength: 6,
    maxlength: 500,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  powers: {
    type: Array
  },
  endTime: {
    type: String,
    default: ''
  }
});

teamSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      points: this.points,
      isAdmin: this.isAdmin
    },
    process.env.JWT_PRIVATEKEY,
    {
      expiresIn: '4h',
    }
  );
  return token;
};

const Team = mongoose.model('Team', teamSchema);

function validateTeamRegister(team) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(20)
      .required(),
    email: Joi.string()
      .min(6)
      .max(60)
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    phone: Joi.string()
      .min(9)
      .max(22)
      .required(),
    password: Joi.string()
      .min(6)
      .max(500)
      .required(),
    password2: Joi.ref('password'),
    points: Joi.number()
      .min(0)
      .max(100),
  }).with('password', 'password2');

  return schema.validate(team, { abortEarly: false });
};

exports.Team = Team;
exports.validateTeamRegister = validateTeamRegister;



const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../middleware/auth');

const { Team } = require('../models/team');

router.get('/', checkAuthentication, async(req, res) => {
  const { team } = res.locals;

  if (!team.isAdmin) {
    return res.status(401).redirect('/');
  } else {
    const teams = await Team.find({ isAdmin: false }).sort('-points');

    let emails = '';
    for (let team of teams) {
      emails += team.email + '; ';
    }

    return res.render('teams', {
      teams: teams,
      emails: emails,
    });
  }
})

module.exports = router;

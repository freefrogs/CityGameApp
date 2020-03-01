const express = require('express');
const router = express.Router()
const { Team } = require('../models/team');
const { checkAuthentication } = require('../middleware/auth');

const getTeamData = team => {
  return result = {
    power1: team.powers.includes('power1'),
    power2: team.powers.includes('power2'),
    power3: team.powers.includes('power3'),
    power4: team.powers.includes('power4'),
    power5: team.powers.includes('power5'),
    power6: team.powers.includes('power6'),
    power7: team.powers.includes('power7'),
    power8: team.powers.includes('power8'),
    transform: team.points
  }
}

//Game view 
router.get('/:id', checkAuthentication, async (req, res) => {
  if (res.locals.team._id) {
    if (res.locals.team._id === req.params.id) {
      const user_id = res.locals.team._id;
      const team = await Team.findById(user_id);
      
      getTeamData(team);

      return res.render('game', {
        power1: result.power1,
        power2: result.power2,
        power3: result.power3,
        power4: result.power4,
        power5: result.power5,
        power6: result.power6,
        power7: result.power7,
        power8: result.power8,
        transform: result.transform
      });
    }
    return res.render('badpath');
  } 
  return res.render('main');
});

//Add points
router.post('/:id', checkAuthentication, async (req, res) => {
  const user_id = res.locals.team._id;
  let { code, power } = req.body;
  code = code.toLowerCase();

  let gameCode = process.env.CODE;
  const taskTime = new Date().toLocaleTimeString();

  const team = await Team.findById(user_id);
  let pkt = team.points;

  if (power === 'power7' || power === 'power8') {
    gameCode = gameCode.slice(0, 3);
  }
  
  if (gameCode.includes(code[0])) {
    switch(code[0]) {
      case gameCode[0]:
        pkt += 1;
        break;
      case gameCode[1]:
        pkt += 2;
        break;
      case gameCode[2]:
        pkt += 3;
        break;
      case gameCode[3]:
        pkt += 4;
        break;
      case gameCode[4]:
        pkt += 5;
        break;
      case gameCode[5]:
        pkt += 6;
        break;
      default:
        break
    }

    team.set ({
      points: pkt,
      endTime: taskTime
    });
    team.powers.push(power);

    await team.save();
  } else {
    return res.render('game', {
      power1: result.power1,
      power2: result.power2,
      power3: result.power3,
      power4: result.power4,
      power5: result.power5,
      power6: result.power6,
      power7: result.power7,
      power8: result.power8,
      transform: result.transform,
      errorText: 'Niepoprawny kod dla tego zadania'
    });
  }

  res.redirect(`/game/${user_id}`);
});

module.exports = router;

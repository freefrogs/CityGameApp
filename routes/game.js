const express = require('express');
const router = express.Router()
const { Team } = require('../models/team');
const { checkAuthentication } = require('../middleware/auth');

//Game view 
router.get('/:id', checkAuthentication, async (req, res) => {
  if (res.locals.team._id) {
    if (res.locals.team._id === req.params.id) {
      const user_id = res.locals.team._id;
      const team = await Team.findById(user_id);
      const power1 = team.powers.includes('power1');
      const power2 = team.powers.includes('power2');
      const power3 = team.powers.includes('power3');
      const power4 = team.powers.includes('power4');
      const power5 = team.powers.includes('power5');
      const transform = team.points * 1.5;

      return res.render('game', {
        power1: power1,
        power2: power2,
        power3: power3,
        power4: power4,
        power5: power5,
        transform: transform
      });
    }
    return res.render('badpath');
  } 
  return res.render('main');
});

//Add points
router.post('/:id', checkAuthentication, async (req, res) => {
  const user_id = res.locals.team._id;
  const { code, power } = req.body;

  const team = await Team.findById(user_id);
  const pkt = team.points + 5

  if (code === 'aaa' && power ==='task1') {
    team.set ({
      points: pkt,
    });
    team.powers.push('power1')
    await team.save();
  } else if (code === 'bbb' && power ==='task2') {
    team.set ({
      points: pkt,
    });
    team.powers.push('power2')
    await team.save();
  } else if (code === 'ccc' && power ==='task3') {
    team.set ({
      points: pkt,
    });
    team.powers.push('power3')
    await team.save();
  } else if (code === 'ddd' && power ==='task4') {
    team.set ({
      points: pkt,
    });
    team.powers.push('power4')
    await team.save();
  } else if (code === 'eee' && power ==='task5') {
    team.set ({
      points: pkt,
    });
    team.powers.push('power5')
    await team.save();
  } else {
    return res.render('game', {
      errorText: 'Niepoprawny kod dla tego zadania'
    });
  }

  res.redirect(`/game/${user_id}`);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Team } = require('../models/team');
const { checkAuthentication } = require('../middleware/auth');

//Game view 
router.get('/:id', checkAuthentication, async (req, res) => {
  res.render('game');
});

//Add points
router.post('/:id', checkAuthentication, async (req, res) => {
  const user_id = res.locals.team._id;
  const { code, power } = req.body;

  const team = await Team.findById(user_id);
  const ptk = team.points + 5

  if (code === 'aaa' && power ==='task1') {
    team.set ({
      points: ptk,
    });
    team.powers.push('power1')
    await team.save();
  } else if (code === 'bbb' && power ==='task2') {
    team.set ({
      points: ptk,
    });
    team.powers.push('power2')
    await team.save();
  } else if (code === 'ccc' && power ==='task3') {
    team.set ({
      points: ptk,
    });
    team.powers.push('power3')
    await team.save();
  } else if (code === 'ddd' && power ==='task4') {
    team.set ({
      points: ptk,
    });
    team.powers.push('power4')
    await team.save();
  } else if (code === 'eee' && power ==='task5') {
    team.set ({
      points: ptk,
    });
    team.powers.push('power5')
    await team.save();
  } else {
    return res.render('game', {
      errorText: 'Niepoprawny kod dla tego zadania'
    });
  }

  res.redirect(`/game/${user_id}`);
})

module.exports = router;
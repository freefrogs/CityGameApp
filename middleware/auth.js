const jwt = require('jsonwebtoken');
/* const config = require('config') */;

const checkAuthentication = async(req, res, next) => {
  const token = req.cookies.token || null;

  try {
    if (!token) {
      res.locals.team = '';
      return next();
    } else {
      const decrypt = await jwt.verify(token, process.env.JWT_PRIVATEKEY);
      res.locals.team = decrypt;
      return next();
    }
  } catch(err) {
    return res.status(500).json(err.toString());
  }
}

module.exports = { checkAuthentication };
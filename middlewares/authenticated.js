'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mi_pito_en_tu_cara';

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({mensaje:'La petición no tiene la cabezera de Autenticación'});
  }
  var token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var ita =  jwt.decode(token, secret);
    if (ita.vig <= moment().unix()){
      return res.status(401).send({mensaje:'El token ah expirado'});
    }
  } catch (ex) {
    // console.log(ex);
      return res.status(404).send({mensaje:'El token no es valido'});
  }

  req.user = ita;
  next();
};

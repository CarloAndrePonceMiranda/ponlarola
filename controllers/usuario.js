'use strict'

// Importar bcrypt
var bcrypt = require('bcrypt-nodejs');

// Importar modelo
var User = require('../models/usuario');

// Importar Servicio
var jwt = require('../services/jwt');


//Prueba
function pruebas(req, res){
  res.status(200).send({
    mensaje: 'Probando una acción del controlador de usuario '
  });
}
//Crear usuario
function SaveUser(req, res) {
  var user = new User();
  var params = req.body

  console.log(params);

  user.nombre = params.nombre;
  user.apellido = params.apellido;
  user.email = params.email;
  user.role = 'ROLE_ADMIN';
  user.imagen = 'null';

  if (params.password) {
    // Encriptar Contraseña
    bcrypt.hash(params.password, null, null, function(err,hash){
      user.password = hash;
      if (user.nombre != null && user.apellido != null && user.email != null) {
        //Guardar Usuario
        user.save((err,userStored) => {
          if (err) {
            // enviar error
            res.status(500).send({mensaje:'Error al registrarse'});
          } else {
            if (!userStored) {
              // enviar error
              res.status(404).send({mensaje:'Usuario no Registrado'});
            } else {
              // enviar error
              res.status(200).send({user: userStored});
            }
          }
        });
      }else {
        // enviar error
        res.status(200).send({mensaje:'Introduce Todos los Campos'});
      }
    });
  }else {
    // enviar error
    res.status(200).send({mensaje:'Introduce la contraseña...'});
  }
}
// Actualizar usuario
function updateUser(req, res) {
   var userId = req.params.id;
   var update = req.body;

   User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
     if (err) {
       res.status(500).send({mensaje:'Error al Actualizar el usuario'});
     } else {
       if (!userUpdated) {
         res.status(404).send({mensaje:'No se ah podido Actualizar el Usuario'});
       }else {
         res.status(200).send({user: userUpdated, mensaje:'Usuario Actualizado Correctamente'});
       }
     }
   });
}

// Login
function loginUser(req,res) {
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({email: email}, (err, user) =>  {
    if (err) {
      res.status(500).send({ mensaje : 'Error en la petición'});
    } else {
      if (!user) {
        res.status(404).send({ mensaje : 'Usuario no registrado'});
      } else {
        // Comprobar Contraseña
        bcrypt.compare(password, user.password, function(err,check) {
          if (check) {
            // Devolver los datos del Usuario Loggeado
            if (params.gethash) {
              // Devolver token jwt
              res.status(200).send({
                token: jwt.CreateToken(user)
              });
            }else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ mensaje : 'Correo Electrónico o Contraseña incorrectos'});
          }
        });
      }
    }
  });
}

// Exportar función
module.exports = {
  pruebas,
  SaveUser,
  updateUser,
  loginUser
};

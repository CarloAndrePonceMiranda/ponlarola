'use strict'

// Módulo de paginación
var mongoosePaginate = require('mongoose-pagination');

// Importar modelos
var Artista = require('../models/artista');
var Album = require('../models/album');
var Cancion = require('../models/cancion');

// Sistema de archivos y rutas
var fs = require('fs');
var path = require('path');

/* Métodos */
function getArtist(req,res) {
  var artistId = req.params.id;

  Artista.findById(artistId,(err,artist) => {
    if (err) {
      res.status(500).send({mensaje: 'Error al buscar al artista ❗️❗️'});
    } else {
      if (!artist) {
        res.status(404).send({mensaje: 'Artista no encontrado ❓❓'});
      } else {
        res.status(200).send({artist, mensaje: 'Success ✅'});
      }
    }
  });
}

function getArtists(req,res) {
  if (!req.params.page) {
    var page = 1;
  } else {
    var page = req.params.page;
  }
  var itemsPerPage = 3;

  Artista.find().sort('nombre').paginate(page, itemsPerPage, function(err,artists,total) {
    if (err) {
      res.status(500).send({mensaje: 'Error en la petición ❗️❗️'});
    } else {
      if (!artists) {
        res.status(404).send({mensaje: 'No Hay artistas ❓❓'});
      } else {
        return res.status(200).send({
          elementos: total,
          artistas: artists
        });
      }
    }
  });
}

function SaveArtist(req,res) {
  var artist = new Artista();
  var params = req.body;

  artist.nombre = params.nombre;
  artist.descripcion = params.descripcion;
  artist.imagen = 'null';

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({mensaje: 'Error al guardar el Artista ⚠️'});
    } else {
      if (!artistStored) {
        res.status(404).send({mensaje: 'El artista no fué guardado... ❌'});
      } else {
        res.status(200).send({ artist: artistStored, mensaje: 'Artista guardado exitosamente ✅'});
      }
    }
  });
}

function updateArtist(req, res) {
   var artistId = req.params.id;
   var update = req.body;

   Artista.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
     if (err) {
       res.status(500).send({mensaje:'Error al Actualizar el Artista ❌♻️'});
     } else {
       if (!artistUpdated) {
         res.status(404).send({mensaje:'No se ah podido Actualizar el Artista ❎'});
       }else {
         res.status(200).send({Artista: artistUpdated, mensaje:'Artista Actualizado Correctamente ✅'});
       }
     }
   });
}
function deleteArtist(req, res) {
  var artistId = req.params.id;
  Artista.findByIdAndRemove(artistId, (err, artistRemoved) => {
    if (err) {
      res.status(500).send({mensaje:'Error al Eliminar el Artista ❌'});
    } else {
      if (!artistRemoved) {
        res.status(404).send({mensaje:'No se ah podido Eliminar el Artista ❎'});
      } else {
        Album.find({artista:artistRemoved._id}).remove((err,albumRemoved) => {
          if (err) {
            res.status(500).send({mensaje:'Error al Eliminar el Album ❌'});
          } else {
            if (!albumRemoved) {
              res.status(404).send({mensaje:'No se ah podido Eliminar el album ❎'});
            } else {
              Cancion.find({album:albumRemoved._id}).remove((err, cancionRemoved) => {
                if (err) {
                  res.status(500).send({mensaje:'Error al Eliminar el Cancion(es) ❌'});
                } else {
                  if (!cancionRemoved) {
                    res.status(404).send({mensaje:'No se ah podido Eliminar el Cancion(es) ❎'});
                  } else {
                    res.status(200).send({Artista: artistRemoved, mensaje:'Artista Eliminado Correctamente ✅'});
                  }
                }
              });
            }
          }
        });
      }
    }
  });
}


// Cargar imagen
function uploadImage(req,res) {
  var artistId = req.params.id;
  var file_name = 'No subido';
  if (req.files) {
    var file_path = req.files.imagen.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      Artista.findByIdAndUpdate(artistId, {imagen: file_name}, (err, artistUpdated) => {
        if (err) {
          res.status(500).send({mensaje:'Error al Actualizar el usuario ❌♻️'});
        } else {
          if (!artistUpdated) {
            res.status(404).send({mensaje:'No se ah podido Actualizar el Usuario ❎'});
          }else {
            res.status(200).send({user: artistUpdated, mensaje:'Usuario Actualizado Correctamente ✅'});
          }
        }
      });
    } else {
      res.status(200).send({ mensaje:'Por favor selecciona una imagen... ⚠️' });
    }
    console.log(ext_split);
  }else {
    res.status(200).send({ mensaje:'La imagen no se ah subido ❌' });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './archivos/artistas/'+imageFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ mensaje:'La imagen no existe ❓' });
    }
  });
}
// Exportar métodos
module.exports = {
  getArtist,
  SaveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
};

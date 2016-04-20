'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  siso = mongoose.model('siso');
  

/**
 * Create siso
 */
exports.create = function (req, res, next) {
  console.log('in create');
  var sisos = new siso(req.body);
  console.log('new siso: ' + siso);
  sisos.save(function (err) {
    if (err) {
      console.log('error');      
    } else {
      res.json(sisos);
    }
  });
};

/**
 * Show the current Siso
 */
exports.read = function (req, res) {
  res.json(req.siso);
};

/**
 * Delete a Siso
 * (probably don't really ever want to delete these)
 */
exports.delete = function (req, res) {
  console.log('**** delete() ****');
  var sisos = req.siso;
  console.log('**** delete() ****' + sisos);
  sisos.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(siso);
    }
  });

};

/*/**
 * List of sisos
 */
exports.list = function (req, res) {
  console.log('in list');
  siso.find().exec(function (err, sisoweb) {
    if(!err){ 
      /*console.log('returning profiles' + sisoweb);*/            
      res.json(sisoweb);			 
    } else {
      console.log('error');
    }     
  });
};

/**
 * List of sisos By Name
 */
exports.listByName = function (req, res) {
  console.log('in sisoweb.server.controller');

  var name = '{}';
  if (req.query.mfname && req.query.mlname) {
    //console.log('req.query.mfname : '+req.query.mfname+', req.query.mlname :'+req.query.mlname);
    name = { mfname: req.query.mfname , mlname:req.query.mlname };
  }
  if (req.query.fname && req.query.lname) {
    //console.log('req.query.fname : '+req.query.fname+', req.query.lname :'+req.query.lname);
    name = { fname: req.query.fname , lname:req.query.lname };
  }
  
  siso.find(name).exec(function (err, sisoweb) {
    if(!err){ 
      /*console.log('returning profiles' + sisoweb);*/            
      res.json(sisoweb);       
    } else {
      console.log('error');
    }     
  });
}; 

/**
 * Profile middleware (not sure how this is supposed to work)
 */
exports.sisowebByID = function (req, res, next, id) {
  console.log('sisowebByID >>>> '+id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sisoweb is invalid'
    });
  }

  siso.findById(id).exec(function (err, siso) {
    if (err) {
      return next(err);
    } else if (!siso) {
      return res.status(404).send({
        message: 'No siso with that identifier has been found'
      });
    }
    req.siso = siso;
    console.log('sisowebByID >>>>>>>>>> : '+req.siso);
    next();
  });
};   
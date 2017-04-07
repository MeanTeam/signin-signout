'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  siso = mongoose.model('siso');
  

/**
 * Create siso
 */
exports.create = function (req, res, next) {
  console.log('in create');
  var query = { fname: req.body.fname , lname:req.body.lname, mname: req.body.mname };
  console.log('removing: ' + JSON.stringify(query));
  siso.remove( query, function (err) {
    if (err) {
      console.log('error');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
	} else {
	  var sisos = new siso(req.body);
	  console.log('new siso: ' + siso);
	  sisos.save(function (err) {
		if (err) {
		  console.log('error');      
		} else {
		  res.json(sisos);
		}
	  });
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
      res.json(sisos);
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
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
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
	  if (req.query.mname) {
		console.log('req.query.fname : '+req.query.fname+', req.query.lname :'+req.query.lname+', req.query.mname :'+req.query.mname);
		name = { fname: req.query.fname , lname:req.query.lname, mname: req.query.mname };
	  } else {
		name = { fname: req.query.fname , lname:req.query.lname };
	  }
  }

  
  siso.find(name).exec(function (err, sisoweb) {
    if(!err){ 
      /*console.log('returning profiles' + sisoweb);*/            
      res.json(sisoweb);       
    } else {
      console.log('error');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }     
  });
}; 

/**
 * Profile middleware
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
	  if (req.method === 'DELETE') {
		  return res.status(200).send({
			message: 'Siso not found on DELETE, ignoring'
		  });
	  }
      return res.status(404).send({
        message: 'No siso with that identifier has been found'
      });
    }
    req.siso = siso;
    console.log('sisowebByID >>>>>>>>>> : '+req.siso);
    next();
  });
};   

exports.purgeSigninSignouts = function() {
	console.log("Nightly Purge");
	siso.remove({}, function() {
		var dt = new Date(_.now());
		console.log("All Sign-Ins/Sign-Outs removed, time: " + dt.toTimeString());
	});
};
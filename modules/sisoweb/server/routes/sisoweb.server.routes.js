'use strict';

/**Module dependencies*/
var sisoweb = require('../controllers/sisoweb.server.controller');

module.exports = function (app) {  
  console.log('request end point received');	   
  
  // Routing logic   
  // sisoweb collection routes
  app.route('/api/sisoweb').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(sisoweb.list)
    // .get(sisoweb.listByName)
    .post(sisoweb.create);

  // Single sisoweb routes
  app.route('/api/sisoweb/:sisowebId').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(sisoweb.read)  
    .delete(sisoweb.delete);

  app.route('/api/loc/:id').all().
    get(sisoweb.usersByLoc);

  // Finish by binding the profile middleware
  app.param('sisowebId', sisoweb.sisowebByID);


};

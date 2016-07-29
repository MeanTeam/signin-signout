'use strict';

/**
 * Module dependencies
 */
/* var profilesPolicy = require('../policies/profiles.server.policy'), */
var profiles = require('../controllers/profiles.server.controller');

module.exports = function(app) {
  // Profiles Routes
  app.route('/api/profiles').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(profiles.list)
    .post(profiles.create);

  app.route('/api/profiles/:profileId').all(/*profilePolicy.isAllowed NO POLICY FOR NOW*/)
    .get(profiles.read)
    .put(profiles.update)
    .delete(profiles.delete);

  // Finish by binding the Profile middleware
  app.param('profileId', profiles.profileByID);
};

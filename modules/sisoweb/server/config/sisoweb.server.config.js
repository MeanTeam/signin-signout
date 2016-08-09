'use strict';

/**Module dependencies*/
var path = require('path'),
  config = require(path.resolve('./config/config'));

var sisoweb = require('../controllers/sisoweb.server.controller');

/**
  Sisoweb module init function.
*/
module.exports = function (app, db) {
	var CronJob = require('cron').CronJob;
		new CronJob('0 0 * * *', function() {
			sisoweb.purgeSigninSignouts();
		}, null, true, 'America/New_York');
};

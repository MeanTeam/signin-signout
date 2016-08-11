'use strict';

/**Module dependencies*/
var path = require('path'),
  config = require(path.resolve('./config/config'));

var sisoweb = require('../controllers/sisoweb.server.controller');

var cronSchedule = process.env.CRON_SCHEDULE || '0 0 * * *';

/**
  Sisoweb module init function.
*/
module.exports = function (app, db) {
	var CronJob = require('cron').CronJob;
		console.log("cron schedule: " + cronSchedule);
		new CronJob(cronSchedule, function() {
			sisoweb.purgeSigninSignouts();
		}, null, true, 'America/New_York');
};

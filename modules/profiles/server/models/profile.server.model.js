'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  fname: { type: String, trim: true, required: true },
  lname: { type: String, trim: true, required: true },
  role:  { type: String, trim: true, required: true } // manager, etc.
});

mongoose.model('Profile', ProfileSchema);

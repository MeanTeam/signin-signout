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
  mname: { type: String, trim: true },
  lname: { type: String, trim: true, required: true },
  mfname: { type: String, trim: true },
  mlname: { type: String, trim: true },
  contact: { type: String, trim: true },
  email: { type: String, trim: true,
        validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: '{VALUE} is not a valid email address!'
        }
  },
  /* contact: { type: String, trim: true,
        validate: {
          validator: function(v) {
            return /\(\d{3}\)[ ]\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'Contact phone number required']
  }, // TODO TEST THIS )*/
  role:  { type: String, trim: true, required: true }, // manager, etc.
  preferredLocation: { type: String, trim: true }
});

mongoose.model('Profile', ProfileSchema);

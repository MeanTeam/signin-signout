'use strict';

/**Module dependencies*/
var mongoose = require('mongoose'),  
  Schema = mongoose.Schema;

/**Siso Schema*/
var SisoSchema = new Schema({
  fname: { type: String, required: true },
  mname: { type: String, trim: true },
  lname: { type: String, trim: true },
  mfname: { type: String, trim: true },
  mlname: { type: String, trim: true },
  contact: { type: String, trim: true },  
  location: { type: String, trim: true },
  time: { type: String, trim: true } 
});

SisoSchema.set('collection', 'siso');

mongoose.model('siso', SisoSchema);

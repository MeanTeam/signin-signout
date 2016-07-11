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
  /* contact: { type: String, trim: true,
        validate: {
          validator: function(v) {
            return /\(\d{3}\)[ ]\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'Contact phone number required']
  }, // TODO TEST THIS )*/
  location: { type: String, trim: true },
  time: { type: String, trim: true } 
});

SisoSchema.set('collection', 'siso');

mongoose.model('siso', SisoSchema);

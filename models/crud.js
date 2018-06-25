const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const crudSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  city: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  price: { type: String },
  status: { type: String },
  color: { type: String }
});

crudSchema.plugin(uniqueValidator); // This prevents mongodb E1100 error due to unique property
module.exports = mongoose.model('Crud', crudSchema);

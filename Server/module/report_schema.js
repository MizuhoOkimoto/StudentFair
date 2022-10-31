const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  report_number: {
    type: String,
    require: true,
    unique: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
});

const report = mongoose.model('Report', reportSchema);
module.exports = report;
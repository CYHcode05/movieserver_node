const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
   userid: { type: String, required: true},
   userpassword: { type: String, required: true },
   name: { type: String, required: true },
   number: { type: String, required: true },
   email: { type: String, required: true },
   address: { type: String, required: true },
   register_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
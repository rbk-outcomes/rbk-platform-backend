const mongoose = require("mongoose");
require("../loaders/mongoose");
var bcrypt = require("bcrypt-nodejs");

const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String
  },
  LastName: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ["user", "Bootstrap Student", "Immersive Student", "Instructor", "Onboarder"]
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

/**
 * this @function pre invocation hashes the password of every record being saved to the database
 * @note the second parameter MUST BE a normal ES5 function, in order to set the scope for (this) to points to the respective record
 */
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userValidator = require('../validators/user.validator');


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    //match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    validate:  {
      validator: function (input){
        console.log(input);
        return userValidator.isGoodPassword(input) && userValidator.isLongEnough(input);
      },
      message: 'Please enter a password at least 8 characters and contains At least one uppercase, one lower case and one special character.'

    },
    required: true
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    //enum: ["Enseignant", "Étudiant"],
    required: true
},
})


/**
 * Hash password with blowfish algorithm (bcrypt) before saving it in to the database
 */
// userSchema.pre('save', function(next) {
//   var user = this;
//   // only hash the password if it has been modified
//   if (!user.isModified('password'))
//       return next();
//   // password will be hashed only if it has changed
//   // user.password = bcrypt.hash(user.password, bcrypt.genSalt(10));
//   // console.log(user.password);

//   //next();
// });

// userSchema.path('password').validate(
//   function (input){
//       console.log(input);
//       return userValidator.isGoodPassword(input) && userValidator.isLongEnough(input);
//   },'Please enter a password at least 8 characters and contains At least one uppercase, one lower case and one special character.'
// );

userSchema.path('firstName').validate(function (input){
  return userValidator.isSafe(input);
},"You Cannot use the '$' Character");

userSchema.path('lastName').validate(function (input){
  return userValidator.isSafe(input);
},"You Cannot use the '$' Character");

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

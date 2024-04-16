const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.profilename = !isEmpty(data.profilename) ? data.profilename : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  if (!Validator.isLength(data.profilename, { min: 2})) {
    errors.profilename = 'profile name needs to be more than 2 char';
  }

  if (Validator.isEmpty(data.profilename)) {
    errors.profilename = 'profilename cant be empty';
  }


  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

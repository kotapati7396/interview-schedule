const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateoffresInput(data) {
  let errors = {};

  data.jobTitle = !isEmpty(data.jobTitle) ? data.jobTitle : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.Yexperience = !isEmpty(data.Yexperience) ? data.Yexperience : '';
  if (!Validator.isLength(data.jobTitle, { min: 2})) {
    errors.jobTitle = 'jobTitle name needs to be more than 2 char';
  }

  if (Validator.isEmpty(data.jobTitle)) {
    errors.jobTitle = 'jobTitle cant be empty';
  }


  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'company cant be empty';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'location cant be empty';
  }
  if (Validator.isEmpty(data.Yexperience)) {
    errors.Yexperience = 'Yexperience cant be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

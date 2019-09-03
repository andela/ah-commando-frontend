
import Joi from 'joi-browser';

class Validator {
static emailSchema = {
  email: Joi.string().required()
    .regex(/^[\w._]+@[\w]+[-.]?[\w]+\.[\w]+$/)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.regex.base':
            err.message = 'please provide a valid email';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};

static bioSchema = {
  bio: Joi.string().min(8).required()
    .regex(/[a-zA-Z0-9,#.-]+/)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.regex.base':
            err.message = 'Bio must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};

static usernameSchema = {
  username: Joi.string().min(8).required()
    .regex(/^[a-z0-9_-]+$/)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.regex.base':
            err.message = 'usernames can only be alphanumeric characters, underscores and hyphens';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
};

static validate(field, schema) {
  const { error } = Joi.validate(field, schema, { abortEarly: false });

  if (error) {
    return error.details.map((detail) => {
      const message = detail.message.replace(/"/gi, '');
      return message;
    });
  }
  return [];
}
}

export default Validator;

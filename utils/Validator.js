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

  static passwordSchema = {
    password: Joi.string().min(8).required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'string.regex.base':
              err.message = 'password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  static firstnameSchema = {
    firstname: Joi.string().lowercase().trim().required()
      .regex(/^[a-zA-Z]+$/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'string.regex.base':
              err.message = 'Firstname can only contain letters';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  static lastnameSchema = {
    lastname: Joi.string().lowercase().trim().required()
      .regex(/^[a-zA-Z]+$/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'string.regex.base':
              err.message = 'Lastname can only contain letters';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  static usernameSchema = {
    username: Joi.string().lowercase().required()
      .regex(/^[a-z0-9_-]+$/)
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'string.regex.base':
              err.message = 'Username can only contain Alphanumeric characters, underscores and hyphens';
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  static bioSchema = {
    bio: Joi.string().lowercase(),
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

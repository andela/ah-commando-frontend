import chai from 'chai';
import {
  validate,
  passwordSchema,
  emailSchema,
} from '@Utils/';

chai.should();

describe('Validator tests', () => {
  it('Should return no errror when email is valid', () => {
    const email = 'john.doe@gmail.com';
    validate({ email }, emailSchema).should.deep.equal([]);
  });

  it('Should return no errror when password is valid', () => {
    const password = 'P@ssword123';
    validate({ password }, passwordSchema).should.deep.equal([]);
  });

  it('Should return errors when email is not provided', () => {
    const email = '';
    validate({ email }, emailSchema).should.deep.equal([
      'email is not allowed to be empty',
      'please provide a valid email',
    ]);
  });

  it('Should return errors when password is not provided', () => {
    const password = '';
    validate({ password }, passwordSchema).should.deep.equal([
      'password is not allowed to be empty',
      'password length must be at least 8 characters long',
      'password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    ]);
  });
});

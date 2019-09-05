import chai from 'chai';
import {
  validate,
  passwordSchema,
  emailSchema,
  firstnameSchema,
  lastnameSchema,
  usernameSchema,
} from '@Utils/';

chai.should();

describe('Validator tests', () => {
  it('Should return error when firstname is invalid', () => {
    const firstname = '';
    validate({ firstname }, firstnameSchema).should.deep.equal([
      'firstname is not allowed to be empty',
      'Firstname can only contain letters',
    ]);
  });

  it('Should return no error when firstname is valid', () => {
    const firstname = 'John';
    validate({ firstname }, firstnameSchema).should.deep.equal([]);
  });

  it('Should return error when lastname is invalid', () => {
    const lastname = '';
    validate({ lastname }, lastnameSchema).should.deep.equal([
      'lastname is not allowed to be empty',
      'Lastname can only contain letters',
    ]);
  });

  it('Should return no error when lastname is valid', () => {
    const lastname = 'Doe';
    validate({ lastname }, lastnameSchema).should.deep.equal([]);
  });

  it('Should return an error when username invalid', () => {
    const username = '';
    validate({ username }, usernameSchema).should.deep.equal([
      'username is not allowed to be empty',
      'Username can only contain Alphanumeric characters, underscores and hyphens',
    ]);
  });

  it('Should return no error when username is valid', () => {
    const username = 'johndoe1_';
    validate({ username }, usernameSchema).should.deep.equal([]);
  });

  it('Should return errors when email is not provided', () => {
    const email = '';
    validate({ email }, emailSchema).should.deep.equal([
      'email is not allowed to be empty',
      'please provide a valid email',
    ]);
  });

  it('Should return no error when email is valid', () => {
    const email = 'john.doe@gmail.com';
    validate({ email }, emailSchema).should.deep.equal([]);
  });

  it('Should return no error when password is valid', () => {
    const password = 'P@ssword123';
    validate({ password }, passwordSchema).should.deep.equal([]);
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

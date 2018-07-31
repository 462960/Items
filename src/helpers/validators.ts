import { PATTERN_EMAIL, PATTERN_PASSWORD } from 'constants/index';

export const required = (value) => {
  if (!value) return { id: 'errors.field.required' };
};

export const validateEmail = (value = '') => {
  if (!PATTERN_EMAIL.test(value)) return { id: 'errors.email.invalid' };
};

export const validatePassword = (value = '') => {
  if (!PATTERN_PASSWORD.test(value)) return { id: 'errors.password.invalid' };
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
